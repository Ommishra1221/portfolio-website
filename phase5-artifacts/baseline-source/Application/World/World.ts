import Application from '../Application';
import Resources from '../Utils/Resources';
import ComputerSetup from './Computer';
import MonitorScreen from './MonitorScreen';
import Environment from './Environment';
import Decor from './Decor';
import CoffeeSteam from './CoffeeSteam';
import Cursor from './Cursor';
import Hitboxes from './Hitboxes';
import AudioManager from '../Audio/AudioManager';
import CyberpunkRoom from './Cyberpunk/CyberpunkRoom';
import { usesLegacyRoom } from './Cyberpunk/RoomMode';
import HardwareState from './Cyberpunk/HardwareState';
import HardwareInteraction from './Cyberpunk/HardwareInteraction';
export default class World {
    application: Application;
    scene: THREE.Scene;
    resources: Resources;

    // Objects in the scene
    environment: Environment;
    decor: Decor;
    computerSetup: ComputerSetup;
    monitorScreen: MonitorScreen;
    coffeeSteam: CoffeeSteam;
    cursor: Cursor;
    audioManager: AudioManager;
    cyberpunkRoom: CyberpunkRoom;
    readonly hardware = new HardwareState();
    private hardwareInteraction?: HardwareInteraction;
    private reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        // Wait for resources
        this.resources.on('ready.world', () => {
            // Setup
            if (usesLegacyRoom(window.location.search)) {
                this.environment = new Environment();
                this.decor = new Decor();
                this.computerSetup = new ComputerSetup();
                this.coffeeSteam = new CoffeeSteam();
            } else {
                this.cyberpunkRoom = new CyberpunkRoom(this.hardware);
                this.scene.add(this.cyberpunkRoom);
                const surface = this.application.renderer.cssInstance?.domElement;
                if (surface) this.hardwareInteraction = new HardwareInteraction({
                    scene: this.scene, surface,
                    camera: () => this.application.camera.instance,
                    active: () => {
                        const camera = this.application.camera;
                        return !camera.freeCam && !camera.targetKeyframe &&
                            (camera.currentKeyframe === 'idle' || camera.currentKeyframe === 'desk');
                    },
                    reducedMotion: () => this.reducedMotion.matches,
                    hardware: this.hardware, targets: this.cyberpunkRoom.targets,
                });
            }
            this.monitorScreen = new MonitorScreen();
            this.audioManager = new AudioManager();
            // const hb = new Hitboxes();
            // this.cursor = new Cursor();
        });
    }

    update() {
        this.cyberpunkRoom?.update(this.application.time.delta, this.reducedMotion.matches);
        this.hardwareInteraction?.update(this.application.time.delta);
        if (this.monitorScreen) this.monitorScreen.update();
        if (this.environment) this.environment.update();
        if (this.coffeeSteam) this.coffeeSteam.update();
        if (this.audioManager) this.audioManager.update();
    }

    dispose() {
        this.resources.off('ready.world');
        this.hardwareInteraction?.dispose();
        this.cyberpunkRoom?.dispose();
        this.hardware.dispose();
        this.monitorScreen?.dispose();
    }
}
