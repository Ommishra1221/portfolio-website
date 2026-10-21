import * as THREE from 'three';
import Application from '../Application';
import Sizes from '../Utils/Sizes';
import EventEmitter from '../Utils/EventEmitter';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
import Renderer from '../Renderer';
import Resources from '../Utils/Resources';
import UIEventBus from '../UI/EventBus';
import Time from '../Utils/Time';
import BezierEasing from 'bezier-easing';
import {
    CameraKeyframeInstance,
    MonitorKeyframe,
    IdleKeyframe,
    LoadingKeyframe,
    DeskKeyframe,
    OrbitControlsStart,
} from './CameraKeyframes';

export enum CameraKey {
    IDLE = 'idle',
    MONITOR = 'monitor',
    LOADING = 'loading',
    DESK = 'desk',
    ORBIT_CONTROLS_START = 'orbitControlsStart',
}
export default class Camera extends EventEmitter {
    application: Application;
    sizes: Sizes;
    scene: THREE.Scene;
    instance: THREE.PerspectiveCamera;
    renderer: Renderer;
    resources: Resources;
    time: Time;

    position: THREE.Vector3;
    focalPoint: THREE.Vector3;

    freeCam: boolean;
    orbitControls: OrbitControls;

    currentKeyframe: CameraKey | undefined;
    targetKeyframe: CameraKey | undefined;
    keyframes: { [key in CameraKey]: CameraKeyframeInstance };
    readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    introActive = false;
    private started = false;
    private disposed = false;
    private pendingStart = false;
    private ownedTweens: Array<{stop(): any; start(): any}> = [];
    private completion?: () => void;
    private subscriptions: Array<() => void> = [];
    private onMouseDown = (event: MouseEvent) => {
        if (this.freeCam || (event.target instanceof Element && event.target.closest('button, a, input, textarea, select, summary, [role="button"], .room-controls, .cinematic-controls'))) return;
        if (this.introActive) { this.skipIntro(); return; }
        if ((event.target as HTMLElement)?.id === 'prevent-click') return;
        if (this.currentKeyframe === CameraKey.IDLE || this.targetKeyframe === CameraKey.IDLE) this.transition(CameraKey.DESK);
        else if (this.currentKeyframe === CameraKey.DESK || this.targetKeyframe === CameraKey.DESK) this.transition(CameraKey.IDLE);
    };

    constructor() {
        super();
        this.application = new Application();
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.renderer = this.application.renderer;
        this.resources = this.application.resources;
        this.time = this.application.time;

        this.position = new THREE.Vector3(0, 0, 0);
        this.focalPoint = new THREE.Vector3(0, 0, 0);

        this.freeCam = false;

        this.keyframes = {
            idle: new IdleKeyframe(),
            monitor: new MonitorKeyframe(),
            loading: new LoadingKeyframe(),
            desk: new DeskKeyframe(),
            orbitControlsStart: new OrbitControlsStart(),
        };

        document.addEventListener('mousedown', this.onMouseDown);

        this.setPostLoadTransition();
        this.setInstance();
        this.setMonitorListeners();
        this.setFreeCamListeners();
    }

    transition(
        key: CameraKey,
        duration: number = 1000,
        easing?: any,
        callback?: () => void
    ) {
        if (this.disposed) return;
        if (this.introActive && !this.introStep) this.endIntro();
        if (this.targetKeyframe === key && !this.reducedMotion.matches) return;
        this.cancelTransition();
        const keyframe = this.keyframes[key];
        keyframe.update();
        if (this.reducedMotion.matches || duration <= 0 || this.currentKeyframe === key) {
            this.settle(key);
            callback?.();
            return;
        }
        this.currentKeyframe = undefined;
        this.targetKeyframe = key;
        this.completion = callback;
        const finish = () => {
            this.currentKeyframe = key;
            this.targetKeyframe = undefined;
            this.completion = undefined;
            this.ownedTweens = [];
            callback?.();
        };
        this.ownedTweens = [
            new TWEEN.Tween(this.position).to(keyframe.position, duration).easing(easing || TWEEN.Easing.Quintic.InOut),
            new TWEEN.Tween(this.focalPoint).to(keyframe.focalPoint, duration).easing(easing || TWEEN.Easing.Quintic.InOut).onComplete(finish),
        ];
        this.ownedTweens.forEach(tween => tween.start());
    }

    private introStep = false;
    private cancelTransition() {
        this.ownedTweens.forEach(tween => tween.stop());
        this.ownedTweens = [];
        this.completion = undefined;
        this.targetKeyframe = undefined;
    }

    private settle(key: CameraKey) {
        this.cancelTransition();
        this.keyframes[key].update();
        this.currentKeyframe = key;
        this.position.copy(this.keyframes[key].position);
        this.focalPoint.copy(this.keyframes[key].focalPoint);
        this.instance.position.copy(this.position);
        this.instance.lookAt(this.focalPoint);
    }

    private endIntro() {
        if (!this.introActive) return;
        this.introActive = false;
        UIEventBus.dispatch('cinematicState', {active: false});
    }

    skipIntro() {
        if (!this.introActive || this.disposed) return;
        this.endIntro();
        this.settle(CameraKey.IDLE);
    }

    private startExperience = () => {
        if (this.started || this.disposed) return;
        if (this.resources.loaded !== undefined && this.resources.loaded < this.resources.toLoad) {
            this.pendingStart = true;
            return;
        }
        this.started = true;
        this.pendingStart = false;
        if (this.reducedMotion.matches || this.sizes.width < 768) {
            this.settle(CameraKey.IDLE);
            return;
        }
        this.introActive = true;
        UIEventBus.dispatch('cinematicState', {active: true});
        try {
            this.introStep = true;
            this.transition(CameraKey.DESK, 3000, TWEEN.Easing.Quintic.InOut, () => {
                if (!this.introActive || this.disposed) return;
                try {
                    this.introStep = true;
                    this.transition(CameraKey.IDLE, 1800, TWEEN.Easing.Cubic.InOut, () => this.endIntro());
                } catch (error) {
                    console.error('Cinematic settle failed; returning to room.', error);
                    this.endIntro();
                    this.settle(CameraKey.IDLE);
                } finally { this.introStep = false; }
            });
        } catch (error) {
            console.error('Cinematic entrance failed; returning to room.', error);
            this.endIntro();
            this.settle(CameraKey.IDLE);
        } finally { this.introStep = false; }
    };

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            10,
            900000
        );
        this.currentKeyframe = CameraKey.LOADING;

        this.scene.add(this.instance);
    }

    setMonitorListeners() {
        this.on('enterMonitor', () => {
            // Orbit mode owns the camera until its explicit exit; ignore queued iframe hover.
            if (this.freeCam || this.targetKeyframe === CameraKey.ORBIT_CONTROLS_START) return;
            this.transition(
                CameraKey.MONITOR,
                2000,
                BezierEasing(0.13, 0.99, 0, 1)
            );
            UIEventBus.dispatch('enterMonitor', {});
        });
        this.on('leftMonitor', () => {
            if (this.freeCam || this.targetKeyframe === CameraKey.ORBIT_CONTROLS_START) return;
            this.transition(CameraKey.DESK);
            UIEventBus.dispatch('leftMonitor', {});
        });
    }

    setFreeCamListeners() {
        this.subscriptions.push(UIEventBus.on('freeCamToggle', (toggle: boolean) => {
            if (this.disposed) return;
            this.endIntro();
            if (toggle && this.freeCam) return;
            this.freeCam = false;
            if (toggle) {
                this.transition(
                    CameraKey.ORBIT_CONTROLS_START,
                    750,
                    BezierEasing(0.13, 0.99, 0, 1),
                    () => {
                        this.instance.position.copy(
                            this.keyframes.orbitControlsStart.position
                        );

                        this.orbitControls.update();
                        this.freeCam = true;
                    }
                );
                // @ts-ignore
                document.getElementById('webgl')!.style.pointerEvents = 'auto';
            } else {
                this.freeCam = false;
                this.transition(
                    CameraKey.IDLE,
                    4000,
                    TWEEN.Easing.Exponential.Out
                );
                // @ts-ignore
                document.getElementById('webgl').style.pointerEvents = 'none';
            }
        }));
    }

    setPostLoadTransition() {
        this.subscriptions.push(UIEventBus.on('loadingScreenDone', this.startExperience));
        this.subscriptions.push(UIEventBus.on('skipCinematic', () => this.skipIntro()));
        this.subscriptions.push(UIEventBus.on('enterPortfolio', () => {
            if (this.started && !this.disposed) this.trigger('enterMonitor');
        }));
        this.resources.on('ready.cinematic', () => { if (this.pendingStart) this.startExperience(); });
    }

    resize() {
        if (this.introActive) this.skipIntro();
        else if (this.targetKeyframe) {
            const key = this.targetKeyframe, callback = this.completion;
            this.settle(key);
            callback?.();
        }
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    createControls() {
        this.renderer = this.application.renderer;
        this.orbitControls = new OrbitControls(
            this.instance,
            this.renderer.instance.domElement
        );

        const { x, y, z } = this.keyframes.orbitControlsStart.focalPoint;
        this.orbitControls.target.set(x, y, z);

        this.orbitControls.enablePan = false;
        this.orbitControls.enableDamping = true;
        this.orbitControls.object.position.copy(
            this.keyframes.orbitControlsStart.position
        );
        this.orbitControls.dampingFactor = 0.05;
        this.orbitControls.maxPolarAngle = Math.PI / 2;
        this.orbitControls.minDistance = 4000;
        this.orbitControls.maxDistance = 29000;

        this.orbitControls.update();
    }

    update() {
        if (this.disposed) return;
        if (this.introActive && (this.reducedMotion.matches || this.sizes.width < 768)) this.skipIntro();
        if (this.reducedMotion.matches && this.targetKeyframe) {
            const key = this.targetKeyframe, callback = this.completion;
            this.settle(key);
            callback?.();
        }
        for (const key in this.keyframes) {
            // Keep the reveal stable, but follow the idle target during settling.
            // Updating before Tween.js prevents a moving-keyframe snap at completion.
            if (this.introActive && this.targetKeyframe !== CameraKey.IDLE) continue;
            const _key = key as CameraKey;
            if (this.reducedMotion.matches && (_key === CameraKey.IDLE || _key === CameraKey.DESK)) continue;
            this.keyframes[_key].update();
        }

        TWEEN.update();

        if (this.orbitControls) this.orbitControls.enableDamping = !this.reducedMotion.matches;

        if (this.freeCam && this.orbitControls) {
            this.position.copy(this.orbitControls.object.position);
            this.focalPoint.copy(this.orbitControls.target);
            this.orbitControls.update();
            return;
        }

        if (this.currentKeyframe) {
            const keyframe = this.keyframes[this.currentKeyframe];
            this.position.copy(keyframe.position);
            this.focalPoint.copy(keyframe.focalPoint);
        }

        this.instance.position.copy(this.position);
        this.instance.lookAt(this.focalPoint);
    }
    dispose() {
        if (this.disposed) return;
        this.disposed = true;
        this.endIntro();
        this.cancelTransition();
        document.removeEventListener('mousedown', this.onMouseDown);
        this.subscriptions.forEach(unsubscribe => unsubscribe());
        this.subscriptions = [];
        this.resources.off('ready.cinematic');
        this.off('enterMonitor');
        this.off('leftMonitor');
        this.orbitControls?.dispose();
    }
}
