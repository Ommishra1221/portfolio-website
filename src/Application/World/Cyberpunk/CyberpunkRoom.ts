import * as THREE from 'three';
import RoomKit from './RoomKit';
import { createMaterials } from './Materials';
import { createArchitecture } from './Architecture';
import { createWorkstation } from './Workstation';
import { createMonitorArray } from './MonitorArray';
import { createPCTower } from './PCTower';
import { createLighting } from './Lighting';
import HardwareState from './HardwareState';
import { HardwareTarget } from './HardwareInteraction';

/** Original room; all animation is driven by World through the existing frame loop. */
export default class CyberpunkRoom extends THREE.Group {
    readonly kit = new RoomKit();
    readonly rotors: THREE.Group[];
    readonly hardware: HardwareState;
    readonly targets: HardwareTarget[];
    private ownsHardware: boolean;
    private lampLevel = 1;
    private pcLevel = 1;
    private practical: THREE.SpotLight;
    private practicalIntensity: number;
    private diffuser: THREE.MeshStandardMaterial;
    private diffuserIntensity: number;
    private pcAccents: Array<{material: THREE.MeshStandardMaterial; intensity: number}>;
    private keyboardStatus: THREE.MeshStandardMaterial;
    private disposed = false;
    private fanSpeed = 0;

    constructor(hardware?: HardwareState) {
        super();
        this.hardware = hardware || new HardwareState();
        this.ownsHardware = !hardware;
        this.name = 'CyberpunkRoom';
        const materials = createMaterials(this.kit);
        this.add(createArchitecture(this.kit, materials));
        this.add(createWorkstation(this.kit, materials));
        this.add(createMonitorArray(this.kit, materials));
        const pc = createPCTower(this.kit, materials);
        this.rotors = pc.rotors;
        this.add(pc.root, createLighting());
        const byMaterial = (name: string) => [...this.kit.materials].find(material => material.name === name) as THREE.MeshStandardMaterial;
        this.practical = this.getObjectByName('WarmPractical') as THREE.SpotLight;
        this.practicalIntensity = this.practical.intensity;
        this.diffuser = byMaterial('warm');
        this.diffuserIntensity = this.diffuser.emissiveIntensity;
        this.pcAccents = ['PCCyan', 'PCViolet', 'PCMagenta'].map(name => {
            const material = byMaterial(name);
            return {material, intensity: material.emissiveIntensity};
        });
        this.keyboardStatus = byMaterial('KeyboardStatus');
        this.targets = [
            {id: 'lamp', objects: ['LampBaseControl', 'LampSwitch'].map(name => this.getObjectByName(name)!), highlight: byMaterial('LampControl')},
            {id: 'pc', objects: ['PCAccentControl', 'PCPowerButton'].map(name => this.getObjectByName(name)!), highlight: byMaterial('PCControl')},
        ];
        this.hardware.setAvailable(true);
        this.userData.provenance = 'Original procedural geometry and locally generated textures; inherited center compositor is separate.';
        // Only the three rotors animate transforms; retain root placement and skip
        // redundant local matrix composition for the remaining original hardware.
        this.updateMatrixWorld(true);
        const animated = new Set<THREE.Object3D>(this.rotors);
        this.traverse(object => {
            if (object !== this && !animated.has(object)) object.matrixAutoUpdate = false;
        });
    }

    update(deltaMilliseconds: number, reducedMotion = false) {
        if (this.disposed || !Number.isFinite(deltaMilliseconds)) return;
        const delta = Math.min(Math.max(deltaMilliseconds, 0), 50);
        const state = this.hardware.getSnapshot();
        const blend = reducedMotion ? 1 : 1 - Math.exp(-delta / 90);
        this.lampLevel += ((state.lampOn ? 1 : 0) - this.lampLevel) * blend;
        this.pcLevel += ((state.pcLedsOn ? 1 : 0) - this.pcLevel) * blend;
        this.practical.intensity = this.practicalIntensity * this.lampLevel;
        this.practical.visible = this.lampLevel > 0.001;
        this.diffuser.emissiveIntensity = this.diffuserIntensity * this.lampLevel;
        this.pcAccents.forEach(({material, intensity}) => { material.emissiveIntensity = intensity * this.pcLevel; });
        this.hardware.typingEnergy = reducedMotion ? 0 : Math.max(0, this.hardware.typingEnergy - delta / 180);
        this.keyboardStatus.emissiveIntensity = 0.12 + this.hardware.typingEnergy * 0.24;
        if (reducedMotion) this.fanSpeed = 0;
        if (!reducedMotion) {
            this.fanSpeed += (1 - this.fanSpeed) * (1 - Math.exp(-delta / 400));
            const angle = delta * 0.0012 * this.fanSpeed;
            this.rotors.forEach(rotor => { rotor.rotation.z = (rotor.rotation.z + angle) % (Math.PI * 2); });
        }
    }

    dispose() {
        if (this.disposed) return;
        this.disposed = true;
        this.traverse(object => {
            if (object instanceof THREE.InstancedMesh) object.dispose();
            if (object instanceof THREE.SpotLight) object.shadow.map?.dispose();
        });
        this.kit.dispose();
        this.hardware.setAvailable(false);
        if (this.ownsHardware) this.hardware.dispose();
        this.targets.length = 0;
        this.rotors.length = 0;
        this.removeFromParent();
        this.clear();
    }
}
