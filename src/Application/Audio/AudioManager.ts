import * as THREE from 'three';
import Application from '../Application';
import { AmbienceAudio, ComputerAudio } from './AudioSources';
import UIEventBus from '../UI/EventBus';

const POS_DEBUG = false;
const DEFAULT_REF_DISTANCE = 10000;
export default class Audio {
    private disposed = false;
    private subscriptions: Array<() => void> = [];
    private nextAudio = 0;
    application: Application;
    listener: THREE.AudioListener;
    context: AudioContext;
    loadedAudio: { [key in string]: LoadedAudio };
    audioPool: { [key in string]: THREE.PositionalAudio | THREE.Audio };
    audioSources: {
        computer: ComputerAudio;
        ambience: AmbienceAudio;
    };
    scene: THREE.Scene;

    constructor() {
        this.application = new Application();
        this.listener = new THREE.AudioListener();
        this.application.camera.instance.add(this.listener);
        this.loadedAudio = this.application.resources.items.audio;
        this.scene = this.application.scene;
        this.audioPool = {};

        this.audioSources = {
            computer: new ComputerAudio(this),
            ambience: new AmbienceAudio(this),
        };

        this.context = this.listener.context;
        this.subscriptions.push(UIEventBus.on('loadingScreenDone', () => {
            if (!this.disposed) void this.context.resume().catch(() => {});
        }));
        this.subscriptions.push(UIEventBus.on('muteToggle', (mute: boolean) => {
            this.listener.setMasterVolume(mute ? 0 : 1);
        }));
    }

    playAudio(
        sourceName: string,
        options: {
            volume?: number;
            randDetuneScale?: number;
            loop?: boolean;
            filter?: {
                type: BiquadFilterType;
                frequency: number;
            };
            position?: THREE.Vector3;
            refDistance?: number;
            pitch?: number;
        } = {}
    ) {
        if (this.disposed) return '';
        // Resume context if it's suspended
        if (this.context) void this.context.resume().catch(() => {});

        // Get the audio source
        sourceName = this.getRandomVariant(sourceName);

        // Setup
        const buffer = this.loadedAudio[sourceName];
        if (!buffer) return '';
        const poolKey = sourceName + '_' + this.nextAudio++;

        let audio: THREE.Audio<any> | THREE.PositionalAudio = new THREE.Audio(
            this.listener
        );

        if (options.position) {
            audio = new THREE.PositionalAudio(this.listener);

            // @ts-ignore
            audio.setRefDistance(options.refDistance || DEFAULT_REF_DISTANCE);
            // @ts-ignore
            // audio.setDistanceModel('linear');

            const extraMaterialOptions = !POS_DEBUG
                ? {
                      transparent: true,
                      opacity: 0,
                  }
                : {};

            const sphere = POS_DEBUG ? new THREE.SphereGeometry(100, 8, 8) : undefined;
            const material = POS_DEBUG ? new THREE.MeshBasicMaterial({
                color: 0xff0000,
                ...extraMaterialOptions,
            }) : undefined;
            const mesh = POS_DEBUG ? new THREE.Mesh(sphere, material) : new THREE.Object3D();

            mesh.position.copy(options.position);
            mesh.name = poolKey;
            this.scene.add(mesh);
        }
        audio.setBuffer(buffer);

        if (options.filter) {
            const ac = audio.context;
            const filter = ac.createBiquadFilter();
            filter.type = options.filter.type; // Low pass filter
            filter.frequency.setValueAtTime(
                options.filter.frequency,
                ac.currentTime
            );
            // filter.frequency.linearRampToValueAtTime(2400, ac.currentTime + 2);

            audio.setFilter(filter);
        }

        // Set options
        audio.setLoop(options.loop ? true : false);
        audio.setVolume(options.volume || 1);

        audio.play();

        // add a filter to the audio

        // Calculate detune
        const detuneAmount =
            (Math.random() * 200 - 100) *
            (options.randDetuneScale ? options.randDetuneScale : 0);

        // Set detune after .play is called
        audio.setDetune(detuneAmount);

        if (options.pitch) {
            audio.setDetune(options.pitch * 100);
        }

        // Add to pool
        if (audio.source) {
            audio.source.onended = () => {
                audio.isPlaying = false;
                audio.disconnect();
                delete this.audioPool[poolKey];
                if (options.position) {
                    const positionalObject =
                        this.scene.getObjectByName(poolKey);
                    if (positionalObject) {
                        this.scene.remove(positionalObject);
                    }
                }
            };
            this.audioPool[poolKey] = audio;
        }
        return poolKey;
    }

    setAudioFilterFrequency(audio: string, frequency: number) {
        const a = this.audioPool[audio];

        if (a) {
            const ac = a.context;
            const filter = a.getFilter() as BiquadFilterNode;
            // clamp the frequency between 0 and 22500
            const f = Math.max(0, Math.min(22050, frequency));

            filter.frequency.setValueAtTime(f, ac.currentTime);
        }
    }

    setAudioVolume(audio: string, volume: number) {
        const a = this.audioPool[audio];
        if (a) {
            a.setVolume(volume);
        }
    }

    getRandomVariant(sourceName: string) {
        const variants = [];
        for (const key in this.loadedAudio) {
            if (key.includes(sourceName)) {
                variants.push(key);
            }
        }
        return variants[Math.floor(Math.random() * variants.length)];
    }

    update() {
        if (this.disposed) return;
        for (const key in this.audioSources) {
            const _key = key as keyof typeof this.audioSources;
            this.audioSources[_key].update();
        }
    }
    dispose() {
        if (this.disposed) return;
        this.disposed = true;
        this.subscriptions.forEach(unsubscribe => unsubscribe()); this.subscriptions = [];
        Object.values(this.audioSources).forEach(source => source.dispose());
        Object.entries(this.audioPool).forEach(([key, audio]) => {
            if (audio.source) audio.source.onended = null;
            if (audio.isPlaying) audio.stop();
            audio.disconnect();
            this.scene.getObjectByName(key)?.removeFromParent();
        });
        this.audioPool = {};
        this.loadedAudio = {};
        this.listener.removeFromParent();
        this.listener.gain.disconnect();
    }
}
