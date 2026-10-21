import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import Application from './Application';
import Sizes from './Utils/Sizes';
import Camera from './Camera/Camera';
import UIEventBus from './UI/EventBus';
// @ts-ignore
import screenVert from './Shaders/screen/vertex.glsl';
// @ts-ignore
import screenFrag from './Shaders/screen/fragment.glsl';
import Time from './Utils/Time';
import { QUALITY_PRESETS } from './Utils/GraphicsQuality';
import { usesLegacyRoom } from './World/Cyberpunk/RoomMode';

export default class Renderer {
    application: Application;
    sizes: Sizes;
    scene: THREE.Scene;
    cssScene: THREE.Scene;
    time: Time;
    overlay: THREE.Mesh;
    overlayScene: THREE.Scene;
    camera: Camera;
    overlayInstance: THREE.WebGLRenderer;
    instance: THREE.WebGLRenderer;
    cssInstance: CSS3DRenderer;
    raiseExposure: boolean;
    uniforms: {
        [uniform: string]: THREE.IUniform<any>;
    };

    private qualityDirty = true;
    private disposed = false;
    private lost = new Set<EventTarget>();
    private unsubscribe?: () => void;
    private contextLost = (event: Event) => {
        event.preventDefault();
        if (event.currentTarget) this.lost.add(event.currentTarget);
        this.application.time.setPaused('context', true);
        UIEventBus.dispatch('graphicsStatus', {status: 'lost'});
    };
    private contextRestored = (event: Event) => {
        if (event.currentTarget) this.lost.delete(event.currentTarget);
        if (this.lost.size) return;
        this.qualityDirty = true;
        this.resize();
        this.application.time.setPaused('context', false);
        UIEventBus.dispatch('graphicsStatus', {status: 'ready'});
    };
    invalidateQuality = () => { this.qualityDirty = true; };

    constructor() {
        this.application = new Application();
        this.time = this.application.time;
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.cssScene = this.application.cssScene;
        this.overlayScene = this.application.overlayScene;
        this.camera = this.application.camera;

        try { this.setInstance(); }
        catch (error) { this.dispose(); throw error; }
        this.unsubscribe = this.application.quality.subscribe(this.invalidateQuality);
        [this.instance, this.overlayInstance].forEach(renderer => {
            renderer.domElement.setAttribute('aria-hidden', 'true');
            renderer.domElement.addEventListener('webglcontextlost', this.contextLost);
            renderer.domElement.addEventListener('webglcontextrestored', this.contextRestored);
        });
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        });
        // Settings
        // this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        // One bounded practical-light shadow map; no new renderer or postprocessing pass.
        this.instance.shadowMap.enabled = !usesLegacyRoom(window.location.search);
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        // this.instance.toneMapping = THREE.ACESFilmicToneMapping;
        // this.instance.toneMappingExposure = 0.9;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
        this.instance.setClearColor(0x000000, 0.0);

        // Style
        this.instance.domElement.style.position = 'absolute';
        this.instance.domElement.style.zIndex = '1px';
        this.instance.domElement.style.top = '0px';

        document.querySelector('#webgl')?.appendChild(this.instance.domElement);

        this.overlayInstance = new THREE.WebGLRenderer();
        this.overlayInstance.setSize(this.sizes.width, this.sizes.height);
        this.overlayInstance.domElement.style.position = 'absolute';
        this.overlayInstance.domElement.style.top = '0px';
        this.overlayInstance.domElement.style.mixBlendMode = 'soft-light';
        this.overlayInstance.domElement.style.opacity = '0.12';
        // this.overlayInstance.domElement.style.mixBlendMode = 'luminosity';
        // this.overlayInstance.domElement.style.opacity = '1';
        this.overlayInstance.domElement.style.pointerEvents = 'none';

        document
            .querySelector('#overlay')
            ?.appendChild(this.overlayInstance.domElement);

        this.cssInstance = new CSS3DRenderer();
        this.cssInstance.setSize(this.sizes.width, this.sizes.height);
        this.cssInstance.domElement.style.position = 'absolute';
        this.cssInstance.domElement.style.top = '0px';

        document
            .querySelector('#css')
            ?.appendChild(this.cssInstance.domElement);

        this.uniforms = {
            u_time: { value: 1 },
        };

        this.overlay = new THREE.Mesh(
            new THREE.PlaneGeometry(10000, 10000),
            new THREE.ShaderMaterial({
                vertexShader: screenVert,
                fragmentShader: screenFrag,
                uniforms: this.uniforms,
                depthTest: false,
                depthWrite: false,
            })
        );

        this.overlayScene.add(this.overlay);
    }

    resize() {
        if (this.disposed) return;
        this.qualityDirty = true;
        this.applyQuality();
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.cssInstance.setSize(this.sizes.width, this.sizes.height);
        this.overlayInstance.setSize(this.sizes.width, this.sizes.height);
    }

    private applyQuality() {
        const preset = QUALITY_PRESETS[this.application.quality.getSnapshot()];
        const deviceRatio = Number.isFinite(this.sizes.pixelRatio) && this.sizes.pixelRatio > 0 ? this.sizes.pixelRatio : 1;
        const ratio = Math.min(deviceRatio, preset.dpr);
        this.instance.setPixelRatio(ratio);
        this.overlayInstance.setPixelRatio(Math.min(ratio, 1));
        this.overlayInstance.domElement.style.display = preset.overlay ? '' : 'none';
        const shadowsEnabled = preset.shadow > 0 && !usesLegacyRoom(window.location.search);
        const shadowModeChanged = this.instance.shadowMap.enabled !== shadowsEnabled;
        this.instance.shadowMap.enabled = shadowsEnabled;
        const updatedMaterials = new Set<THREE.Material>();
        this.scene.traverse(object => {
            // r137 does not invalidate a lit program just because shadowMap.enabled changes.
            if (shadowModeChanged && object instanceof THREE.Mesh) {
                const materials = Array.isArray(object.material) ? object.material : [object.material];
                materials.forEach(material => {
                    if (material instanceof THREE.MeshStandardMaterial && !updatedMaterials.has(material)) {
                        material.needsUpdate = true;
                        updatedMaterials.add(material);
                    }
                });
            }
            const shadow = (object as THREE.Light & {shadow?: THREE.LightShadow}).shadow;
            if (!shadow) return;
            const size = preset.shadow || 512;
            if (shadow.mapSize.x !== size || shadow.mapSize.y !== size || !preset.shadow) {
                shadow.map?.dispose();
                // r137 initializes this to null; its installed declaration omits nullability.
                (shadow as unknown as {map: THREE.WebGLRenderTarget | null}).map = null;
                shadow.mapSize.set(size, size);
                shadow.needsUpdate = true;
            }
        });
        this.qualityDirty = false;
    }

    update() {
        if (this.disposed || this.lost.size) return;
        if (this.qualityDirty) this.applyQuality();
        if (this.uniforms) this.uniforms.u_time.value = this.camera.reducedMotion.matches ? 0 : Math.sin(this.time.current * 0.01);
        this.instance.render(this.scene, this.camera.instance);
        this.cssInstance.render(this.cssScene, this.camera.instance);
        if (QUALITY_PRESETS[this.application.quality.getSnapshot()].overlay) {
            this.overlay.position.copy(this.camera.instance.position);
            this.overlayInstance.render(this.overlayScene, this.camera.instance);
        }
    }

    dispose() {
        if (this.disposed) return;
        this.disposed = true;
        this.unsubscribe?.();
        [this.instance, this.overlayInstance].forEach(renderer => {
            if (!renderer) return;
            renderer.domElement.removeEventListener('webglcontextlost', this.contextLost);
            renderer.domElement.removeEventListener('webglcontextrestored', this.contextRestored);
            renderer.dispose();
            renderer.forceContextLoss();
            renderer.domElement.remove();
        });
        this.cssInstance?.domElement.remove();
        if (this.overlay) {
            this.overlay.geometry.dispose();
            (this.overlay.material as THREE.Material).dispose();
            this.overlay.removeFromParent();
        }
        this.lost.clear();
    }
}
