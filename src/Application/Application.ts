import * as THREE from 'three';

import Debug from './Utils/Debug';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera/Camera';
import Renderer from './Renderer';
import Mouse from './Utils/Mouse';

//@ts-ignore
import World from './World/World';
import Resources from './Utils/Resources';

import sources from './sources';

import Stats from 'stats.js';
import Loading from './Utils/Loading';

import UI from './UI';
import GraphicsQuality from './Utils/GraphicsQuality';
import { disposeScene } from './Utils/Dispose';

let instance: Application | null = null;

export default class Application {
    quality: GraphicsQuality;
    private destroyed = false;
    private mediaMotion?: MediaQueryList;
    private updateMedia = () => {
        const pause = this.destroyed || this.time.paused || this.mediaMotion?.matches;
        document.querySelectorAll<HTMLVideoElement>('#monitor-videos video').forEach(video => {
            if (pause) video.pause(); else void video.play().catch(() => {});
        });
    };
    debug: Debug;
    sizes: Sizes;
    time: Time;
    scene: THREE.Scene;
    cssScene: THREE.Scene;
    overlayScene: THREE.Scene;
    resources: Resources;
    camera: Camera;
    renderer: Renderer;
    world: World;
    mouse: Mouse;
    loading: Loading;
    ui: UI;
    stats: Stats | undefined;

    constructor() {
        // Singleton
        if (instance) {
            return instance;
        }

        instance = this;

        // Global access
        //@ts-ignore
        // window.Application = this;

        // Setup
        this.quality = new GraphicsQuality();
        this.debug = new Debug();
        this.sizes = new Sizes();
        this.mouse = new Mouse();
        this.loading = new Loading();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.cssScene = new THREE.Scene();
        this.overlayScene = new THREE.Scene();
        this.resources = new Resources(sources);
        this.camera = new Camera();
        try { this.renderer = new Renderer(); }
        catch (error) { this.destroy(); throw error; }
        this.camera.createControls();
        this.world = new World();

        this.ui = new UI();
        this.resources.on('ready.rendererQuality', () => this.renderer.invalidateQuality());
        this.time.on('pause.application', () => { this.camera.resize(); this.updateMedia(); });
        this.time.on('resume.application', this.updateMedia);
        this.mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.mediaMotion.addEventListener('change', this.updateMedia);
        this.updateMedia();

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('debug')) {
            this.stats = new Stats();
            this.stats.showPanel(0);

            document.body.appendChild(this.stats.dom);
        }

        // Resize event
        this.sizes.on('resize', () => {
            this.resize();
        });

        // Time tick event
        this.time.on('tick', () => {
            this.update();
        });
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        if (this.stats) this.stats.begin();
        this.camera.update();
        this.world.update();
        this.renderer.update();
        if (this.stats) this.stats.end();
    }

    destroy() {
        if (this.destroyed) return;
        this.destroyed = true;
        this.mediaMotion?.removeEventListener('change', this.updateMedia);
        document.querySelectorAll<HTMLVideoElement>('#monitor-videos video').forEach(video => video.pause());
        this.time?.dispose();
        this.sizes?.dispose();
        this.ui?.dispose();
        this.camera?.dispose();
        this.world?.dispose();
        const disposed = new WeakSet<{dispose(): void}>();
        if (this.scene) disposeScene(this.scene, disposed);
        this.resources?.dispose(disposed);
        this.renderer?.dispose();
        this.cssScene?.clear(); this.overlayScene?.clear(); this.scene?.clear();
        this.quality?.dispose();
        this.stats?.dom.remove();
        if (this.debug?.active) this.debug.ui.destroy();
    }
}
