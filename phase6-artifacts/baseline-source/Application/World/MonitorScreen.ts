import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import GUI from 'lil-gui';
import Application from '../Application';
import Debug from '../Utils/Debug';
import Resources from '../Utils/Resources';
import Sizes from '../Utils/Sizes';
import Camera from '../Camera/Camera';
import EventEmitter from '../Utils/EventEmitter';
import { resolveInnerSiteUrl } from './MonitorConfig';

const SCREEN_SIZE = { w: 1280, h: 1024 };
const IFRAME_PADDING = 32;
const IFRAME_SIZE = {
    w: SCREEN_SIZE.w - IFRAME_PADDING * 2,
    h: SCREEN_SIZE.h - IFRAME_PADDING * 2,
};

type MonitorMessage =
    | { type: 'mousemove'; clientX: number; clientY: number; viewportWidth: number; viewportHeight: number }
    | { type: 'ready' | 'mousedown' | 'mouseup' }
    | { type: 'keydown' | 'keyup'; key: string };

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, keys: string[]) {
    const actualKeys = Object.keys(value).sort();
    const expectedKeys = [...keys].sort();
    return (
        actualKeys.length === expectedKeys.length &&
        actualKeys.every((key, index) => key === expectedKeys[index])
    );
}

function isMonitorMessage(value: unknown): value is MonitorMessage {
    if (!isRecord(value) || typeof value.type !== 'string') return false;

    if (value.type === 'mousemove') {
        return (
            hasExactKeys(value, [
                'type',
                'clientX',
                'clientY',
                'viewportWidth',
                'viewportHeight',
            ]) &&
            typeof value.clientX === 'number' &&
            Number.isFinite(value.clientX) &&
            typeof value.clientY === 'number' &&
            Number.isFinite(value.clientY) &&
            typeof value.viewportWidth === 'number' &&
            Number.isFinite(value.viewportWidth) &&
            value.viewportWidth > 0 &&
            value.viewportWidth <= 16384 &&
            typeof value.viewportHeight === 'number' &&
            Number.isFinite(value.viewportHeight) &&
            value.viewportHeight > 0 &&
            value.viewportHeight <= 16384 &&
            value.clientX >= 0 &&
            value.clientX <= value.viewportWidth &&
            value.clientY >= 0 &&
            value.clientY <= value.viewportHeight
        );
    }

    if (value.type === 'ready' || value.type === 'mousedown' || value.type === 'mouseup') {
        return hasExactKeys(value, ['type']);
    }

    if (value.type === 'keydown' || value.type === 'keyup') {
        return (
            hasExactKeys(value, ['type', 'key']) &&
            typeof value.key === 'string' &&
            value.key.length > 0 &&
            value.key.length <= 64 &&
            !/[\u0000-\u001f\u007f]/.test(value.key)
        );
    }

    return false;
}

export default class MonitorScreen extends EventEmitter {
    application: Application;
    scene: THREE.Scene;
    cssScene: THREE.Scene;
    resources: Resources;
    debug: Debug;
    sizes: Sizes;
    debugFolder: GUI;
    screenSize: THREE.Vector2;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    camera: Camera;
    prevInComputer: boolean;
    shouldLeaveMonitor: boolean;
    inComputer: boolean;
    mouseClickInProgress: boolean;
    dimmingPlane: THREE.Mesh;
    videoTextures: { [key in string]: THREE.VideoTexture };
    iframe: HTMLIFrameElement | null;
    messageHandler: ((event: MessageEvent) => void) | null;

    screenListeners: Array<[string, EventListener]> = [];
    loadTimeout: number | null = null;

    constructor() {
        super();
        this.application = new Application();
        this.scene = this.application.scene;
        this.cssScene = this.application.cssScene;
        this.sizes = this.application.sizes;
        this.resources = this.application.resources;
        this.screenSize = new THREE.Vector2(SCREEN_SIZE.w, SCREEN_SIZE.h);
        this.camera = this.application.camera;
        this.position = new THREE.Vector3(0, 950, 255);
        this.rotation = new THREE.Euler(-3 * THREE.MathUtils.DEG2RAD, 0, 0);
        this.videoTextures = {};
        this.iframe = null;
        this.messageHandler = null;
        this.mouseClickInProgress = false;
        this.shouldLeaveMonitor = false;

        // Create screen
        this.initializeScreenEvents();
        this.createIframe();
        const maxOffset = this.createTextureLayers();
        this.createEnclosingPlanes(maxOffset);
        this.createPerspectiveDimmer(maxOffset);
    }

    addScreenListener(type: string, listener: EventListener, capture: boolean) {
        this.screenListeners.push([type, listener]);
        document.addEventListener(type, listener, capture);
    }

    initializeScreenEvents() {
        this.addScreenListener(
            'mousemove',
            (event) => {
                // @ts-ignore
                const id = (event.target as HTMLElement | null)?.id;
                if (id === 'computer-screen') {
                    // @ts-ignore
                    event.inComputer = true;
                }

                // @ts-ignore
                this.inComputer = event.inComputer;

                if (this.inComputer && !this.prevInComputer) {
                    this.camera.trigger('enterMonitor');
                }

                if (
                    !this.inComputer &&
                    this.prevInComputer &&
                    !this.mouseClickInProgress
                ) {
                    this.camera.trigger('leftMonitor');
                }

                if (
                    !this.inComputer &&
                    this.mouseClickInProgress &&
                    this.prevInComputer
                ) {
                    this.shouldLeaveMonitor = true;
                } else {
                    this.shouldLeaveMonitor = false;
                }

                this.application.mouse.trigger('mousemove', [event]);

                this.prevInComputer = this.inComputer;
            },
            false
        );
        this.addScreenListener(
            'mousedown',
            (event) => {
                // @ts-ignore
                this.inComputer = event.inComputer;
                this.application.mouse.trigger('mousedown', [event]);

                this.mouseClickInProgress = true;
                this.prevInComputer = this.inComputer;
            },
            false
        );
        this.addScreenListener(
            'mouseup',
            (event) => {
                // @ts-ignore
                this.inComputer = event.inComputer;
                this.application.mouse.trigger('mouseup', [event]);

                if (this.shouldLeaveMonitor) {
                    this.camera.trigger('leftMonitor');
                    this.shouldLeaveMonitor = false;
                }

                this.mouseClickInProgress = false;
                this.prevInComputer = this.inComputer;
            },
            false
        );
    }

    /**
     * Creates the iframe for the computer screen
     */
    createIframe() {
        // Create container
        const container = document.createElement('div');
        container.style.width = this.screenSize.width + 'px';
        container.style.height = this.screenSize.height + 'px';
        container.style.opacity = '1';
        container.style.background = '#1d2e2f';

        const iframeUrl = resolveInnerSiteUrl(window.location.search);
        if (!iframeUrl) {
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
            container.style.padding = '64px';
            container.style.boxSizing = 'border-box';
            container.style.color = '#d8e2f0';
            container.style.background = '#080b14';
            container.textContent =
                'Portfolio desktop is not configured. Set window.portfolioRuntimeConfig.innerSiteUrl to the deployed HTTPS inner-site URL.';
            this.createCssPlane(container);
            return;
        }

        const iframe = document.createElement('iframe');
        const expectedOrigin = new URL(iframeUrl).origin;
        iframe.style.width = this.screenSize.width + 'px';
        iframe.style.height = this.screenSize.height + 'px';
        iframe.style.padding = IFRAME_PADDING + 'px';
        iframe.style.boxSizing = 'border-box';
        iframe.style.opacity = '1';
        iframe.className = 'jitter';
        iframe.id = 'computer-screen';
        iframe.frameBorder = '0';
        iframe.title = 'Portfolio workstation desktop';
        this.iframe = iframe;

        container.style.position = 'relative';
        const status = document.createElement('div');
        Object.assign(status.style, {
            position: 'absolute', inset: '32px', padding: '48px',
            background: '#080b14', color: '#d8e2f0', boxSizing: 'border-box',
        });
        status.setAttribute('role', 'status');
        status.textContent = 'Connecting to portfolio desktop...';
        container.append(iframe, status);
        this.loadTimeout = window.setTimeout(() => {
            status.hidden = false;
            status.textContent = 'Portfolio desktop did not connect. Check the inner-site server, URL, and allowed parent origin, then reload.';
        }, 20000);

        this.messageHandler = (event: MessageEvent) => {
            if (!this.iframe?.contentWindow || event.source !== this.iframe.contentWindow) return;

            if (event.origin !== expectedOrigin || !isMonitorMessage(event.data)) return;

            const message = event.data;
            if (this.loadTimeout !== null) window.clearTimeout(this.loadTimeout);
            this.loadTimeout = null;
            status.hidden = true;
            if (message.type === 'ready') return;
            const bridgedEvent = new CustomEvent(message.type, {
                bubbles: true,
                cancelable: false,
            });
            Object.assign(bridgedEvent, { inComputer: true });

            if (message.type === 'mousemove') {
                const rect = this.iframe.getBoundingClientRect();
                const contentWidth = rect.width * (IFRAME_SIZE.w / SCREEN_SIZE.w);
                const contentHeight = rect.height * (IFRAME_SIZE.h / SCREEN_SIZE.h);
                Object.assign(bridgedEvent, {
                    clientX:
                        rect.left +
                        rect.width * (IFRAME_PADDING / SCREEN_SIZE.w) +
                        (message.clientX / message.viewportWidth) * contentWidth,
                    clientY:
                        rect.top +
                        rect.height * (IFRAME_PADDING / SCREEN_SIZE.h) +
                        (message.clientY / message.viewportHeight) * contentHeight,
                });
            } else if (message.type === 'keydown' || message.type === 'keyup') {
                Object.assign(bridgedEvent, { key: message.key });
            }

            this.iframe.dispatchEvent(bridgedEvent);
        };
        window.addEventListener('message', this.messageHandler);
        iframe.src = iframeUrl;

        // Create CSS plane
        this.createCssPlane(container);
    }

    dispose() {
        this.screenListeners.forEach(([type, listener]) => document.removeEventListener(type, listener, false));
        this.screenListeners = [];
        if (this.loadTimeout !== null) window.clearTimeout(this.loadTimeout);
        this.loadTimeout = null;
        if (this.messageHandler) {
            window.removeEventListener('message', this.messageHandler);
            this.messageHandler = null;
        }
        this.iframe = null;
    }

    /**
     * Creates a CSS plane and GL plane to properly occlude the CSS plane
     * @param element the element to create the css plane for
     */
    createCssPlane(element: HTMLElement) {
        // Create CSS3D object
        const object = new CSS3DObject(element);

        // copy monitor position and rotation
        object.position.copy(this.position);
        object.rotation.copy(this.rotation);

        // Add to CSS scene
        this.cssScene.add(object);

        // Create GL plane
        // Punch an RGBA(0, 0, 0, 0) hole in the WebGL canvas for CSS3D.
        // A lit white Lambert mask writes bright RGB at zero alpha with NoBlending.
        const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            side: THREE.DoubleSide,
            opacity: 0,
            transparent: true,
            blending: THREE.NoBlending,
            premultipliedAlpha: true,
            depthTest: true,
            depthWrite: true,
            toneMapped: false,
            fog: false,
        });

        // Create plane geometry
        const geometry = new THREE.PlaneGeometry(
            this.screenSize.width,
            this.screenSize.height
        );

        // Create the GL plane mesh
        const mesh = new THREE.Mesh(geometry, material);

        // Copy the position, rotation and scale of the CSS plane to the GL plane
        mesh.position.copy(object.position);
        mesh.rotation.copy(object.rotation);
        mesh.scale.copy(object.scale);

        // Add to gl scene
        this.scene.add(mesh);
    }

    /**
     * Creates the texture layers for the computer screen
     * @returns the maximum offset of the texture layers
     */
    createTextureLayers() {
        const textures = this.resources.items.texture;

        this.getVideoTextures('video-1');
        this.getVideoTextures('video-2');

        // Scale factor to multiply depth offset by
        const scaleFactor = 4;

        // Construct the texture layers
        const layers = {
            smudge: {
                texture: textures.monitorSmudgeTexture,
                blending: THREE.AdditiveBlending,
                opacity: 0.12,
                offset: 24,
            },
            innerShadow: {
                texture: textures.monitorShadowTexture,
                blending: THREE.NormalBlending,
                opacity: 1,
                offset: 5,
            },
            video: {
                texture: this.videoTextures['video-1'],
                blending: THREE.AdditiveBlending,
                opacity: 0.5,
                offset: 10,
            },
            video2: {
                texture: this.videoTextures['video-2'],
                blending: THREE.AdditiveBlending,
                opacity: 0.1,
                offset: 15,
            },
        };

        // Declare max offset
        let maxOffset = -1;

        // Add the texture layers to the screen
        for (const [_, layer] of Object.entries(layers)) {
            const offset = layer.offset * scaleFactor;
            this.addTextureLayer(
                layer.texture,
                layer.blending,
                layer.opacity,
                offset
            );
            // Calculate the max offset
            if (offset > maxOffset) maxOffset = offset;
        }

        // Return the max offset
        return maxOffset;
    }

    getVideoTextures(videoId: string) {
        const video = document.getElementById(videoId);
        if (!video) {
            setTimeout(() => {
                this.getVideoTextures(videoId);
            }, 100);
        } else {
            this.videoTextures[videoId] = new THREE.VideoTexture(
                video as HTMLVideoElement
            );
        }
    }

    /**
     * Adds a texture layer to the screen
     * @param texture the texture to add
     * @param blending the blending mode
     * @param opacity the opacity of the texture
     * @param offset the offset of the texture, higher values are further from the screen
     */
    addTextureLayer(
        texture: THREE.Texture,
        blendingMode: THREE.Blending,
        opacity: number,
        offset: number
    ) {
        // Create material
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            blending: blendingMode,
            side: THREE.DoubleSide,
            opacity,
            transparent: true,
        });

        // Create geometry
        const geometry = new THREE.PlaneGeometry(
            this.screenSize.width,
            this.screenSize.height
        );

        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);

        // Copy position and apply the depth offset
        mesh.position.copy(
            this.offsetPosition(this.position, new THREE.Vector3(0, 0, offset))
        );

        // Copy rotation
        mesh.rotation.copy(this.rotation);

        this.scene.add(mesh);
    }

    /**
     * Creates enclosing planes for the computer screen
     * @param maxOffset the maximum offset of the texture layers
     */
    createEnclosingPlanes(maxOffset: number) {
        // Create planes, lots of boiler plate code here because I'm lazy
        const planes = {
            left: {
                size: new THREE.Vector2(maxOffset, this.screenSize.height),
                position: this.offsetPosition(
                    this.position,
                    new THREE.Vector3(
                        -this.screenSize.width / 2,
                        0,
                        maxOffset / 2
                    )
                ),
                rotation: new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0),
            },
            right: {
                size: new THREE.Vector2(maxOffset, this.screenSize.height),
                position: this.offsetPosition(
                    this.position,
                    new THREE.Vector3(
                        this.screenSize.width / 2,
                        0,
                        maxOffset / 2
                    )
                ),
                rotation: new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0),
            },
            top: {
                size: new THREE.Vector2(this.screenSize.width, maxOffset),
                position: this.offsetPosition(
                    this.position,
                    new THREE.Vector3(
                        0,
                        this.screenSize.height / 2,
                        maxOffset / 2
                    )
                ),
                rotation: new THREE.Euler(90 * THREE.MathUtils.DEG2RAD, 0, 0),
            },
            bottom: {
                size: new THREE.Vector2(this.screenSize.width, maxOffset),
                position: this.offsetPosition(
                    this.position,
                    new THREE.Vector3(
                        0,
                        -this.screenSize.height / 2,
                        maxOffset / 2
                    )
                ),
                rotation: new THREE.Euler(90 * THREE.MathUtils.DEG2RAD, 0, 0),
            },
        };

        // Add each of the planes
        for (const [_, plane] of Object.entries(planes)) {
            this.createEnclosingPlane(plane);
        }
    }

    /**
     * Creates a plane for the enclosing planes
     * @param plane the plane to create
     */
    createEnclosingPlane(plane: EnclosingPlane) {
        const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: 0x48493f,
        });

        const geometry = new THREE.PlaneGeometry(plane.size.x, plane.size.y);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.copy(plane.position);
        mesh.rotation.copy(plane.rotation);

        this.scene.add(mesh);
    }

    createPerspectiveDimmer(maxOffset: number) {
        const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: 0x000000,
            transparent: true,
            blending: THREE.AdditiveBlending,
        });

        const plane = new THREE.PlaneGeometry(
            this.screenSize.width,
            this.screenSize.height
        );

        const mesh = new THREE.Mesh(plane, material);

        mesh.position.copy(
            this.offsetPosition(
                this.position,
                new THREE.Vector3(0, 0, maxOffset - 5)
            )
        );

        mesh.rotation.copy(this.rotation);

        this.dimmingPlane = mesh;

        this.scene.add(mesh);
    }

    /**
     * Offsets a position vector by another vector
     * @param position the position to offset
     * @param offset the offset to apply
     * @returns the new offset position
     */
    offsetPosition(position: THREE.Vector3, offset: THREE.Vector3) {
        const newPosition = new THREE.Vector3();
        newPosition.copy(position);
        newPosition.add(offset);
        return newPosition;
    }

    update() {
        if (this.dimmingPlane) {
            const planeNormal = new THREE.Vector3(0, 0, 1);
            const viewVector = new THREE.Vector3();
            viewVector.copy(this.camera.instance.position);
            viewVector.sub(this.position);
            viewVector.normalize();

            const dot = viewVector.dot(planeNormal);

            // calculate the distance from the camera vector to the plane vector
            const dimPos = this.dimmingPlane.position;
            const camPos = this.camera.instance.position;

            const distance = Math.sqrt(
                (camPos.x - dimPos.x) ** 2 +
                    (camPos.y - dimPos.y) ** 2 +
                    (camPos.z - dimPos.z) ** 2
            );

            const opacity = 1 / (distance / 10000);

            const DIM_FACTOR = 0.7;

            // @ts-ignore
            this.dimmingPlane.material.opacity =
                (1 - opacity) * DIM_FACTOR + (1 - dot) * DIM_FACTOR;
        }
    }
}
