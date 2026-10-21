import * as THREE from 'three';
import RoomKit, { Triple } from './RoomKit';
import { RoomMaterials } from './Materials';
import { fasteners } from './HardwareDetails';

export function createPCTower(kit: RoomKit, materials: RoomMaterials) {
    // PC LEDs must be switchable without altering room/monitor accent materials.
    materials = {...materials,
        cyan: kit.cloneMaterial(materials.cyan, 'PCCyan'),
        violet: kit.cloneMaterial(materials.violet, 'PCViolet'),
        magenta: kit.cloneMaterial(materials.magenta, 'PCMagenta'),
    };
    const root = new THREE.Group();
    root.name = 'PCTower';
    root.position.set(2820, 400, 650);
    const rotors: THREE.Group[] = [];
    kit.box(root, materials.graphite, [920, 85, 1350], [0, -795, 0], 'BottomChassis', true);
    kit.box(root, materials.graphite, [920, 85, 1350], [0, 795, 0], 'TopChassis', true);
    kit.box(root, materials.black, [65, 1550, 1290], [430, 0, 0], 'SolidSide', true);
    kit.box(root, materials.graphite, [850, 1550, 65], [0, 0, -635], 'RearPanel');
    for (const x of [-420, 420]) {
        for (const z of [-625, 625]) {
            kit.box(root, materials.metal, [45, 1550, 45], [x, 0, z], 'ChassisRail');
        }
    }
    for (const x of [-340, 340]) {
        kit.box(root, materials.black, [120, 55, 850], [x, -832, 0], 'CaseFoot', true);
    }
    const glass = new THREE.MeshPhysicalMaterial({
        color: '#607d92', metalness: 0.05, roughness: 0.24,
        transparent: true, opacity: 0.1, depthWrite: false,
        clearcoat: 0.5, clearcoatRoughness: 0.24, side: THREE.DoubleSide,
    });
    glass.color.convertSRGBToLinear();
    glass.name = 'SingleTemperedGlassPanel';
    kit.materials.add(glass);
    const panel = kit.mesh(root, new THREE.PlaneGeometry(1240, 1480), glass,
        [-458, 0, 0], [0, -Math.PI / 2, 0], 'TemperedGlass');
    panel.castShadow = false;

    const internals = kit.group(root, 'InternalComponents');
    kit.box(internals, materials.black, [40, 1320, 1000], [290, 30, -70], 'Motherboard');
    for (let index = 0; index < 4; index++) {
        kit.box(internals, materials.metal, [60, 410, 28], [230, 370, 170 + index * 65], 'MemoryModule');
    }
    kit.instances(internals, new THREE.CylinderGeometry(1, 1, 1, 10), materials.metal,
        Array.from({length: 18}, (_, index) => ({
            position: [248, 50 + Math.floor(index / 6) * 145, -480 + index % 6 * 65] as Triple,
            scale: [18, 48, 18] as Triple, rotation: [0, 0, Math.PI / 2] as Triple,
        })), 'MotherboardCapacitors');
    kit.box(internals, materials.graphite, [660, 160, 960], [-40, -210, -30], 'GPU', true);
    for (let fin = 0; fin < 12; fin++) {
        kit.box(internals, materials.metal, [550, 6, 850], [-40, -265 + fin * 11, -30], 'GPUFin');
    }
    kit.box(internals, materials.violet, [8, 6, 680], [-375, -170, 0], 'GPUEdgeLight');
    kit.instances(internals, new THREE.TorusGeometry(92, 8, 6, 24), materials.black,
        [-260, 260].map(z => ({position: [-375, -210, z] as Triple,
            scale: [1, 1, 1] as Triple, rotation: [0, Math.PI / 2, 0] as Triple})), 'GPUShroudIntakes');
    kit.box(internals, materials.graphite, [790, 260, 600], [0, -615, -230], 'PowerSupplyShroud');
    kit.mesh(internals, new THREE.CylinderGeometry(135, 135, 100, 24), materials.metal,
        [140, 350, -160], [0, 0, Math.PI / 2], 'CPUCoolingBlock');
    kit.mesh(internals, new THREE.TorusGeometry(105, 7, 6, 32), materials.cyan,
        [85, 350, -160], [0, Math.PI / 2, 0], 'PumpRing');
    kit.box(internals, materials.black, [750, 100, 880], [0, 670, -50], 'Radiator');
    for (let index = 0; index < 16; index++) {
        kit.box(internals, materials.metal, [720, 5, 14], [0, 724, -440 + index * 50], 'RadiatorFin');
    }
    kit.cable(internals, materials.black, [[80, 420, -160], [-100, 540, -190], [-150, 570, -420], [0, 670, -460]], 28);
    kit.cable(internals, materials.black, [[80, 310, -180], [-80, 400, -340], [-170, 570, -510], [100, 670, -460]], 28);
    for (let index = 0; index < 4; index++) {
        kit.cable(internals, materials.black,
            [[-240 + index * 22, -170, 200], [-260 + index * 22, -380, 220], [-210 + index * 22, -500, -200]], 9);
    }
    for (let index = 0; index < 3; index++) {
        kit.box(internals, materials.graphite, [120, 12, 40], [-200, -300 - index * 70, 170 - index * 75], 'CableComb');
    }

    const cooling = kit.group(root, 'CoolingFans');
    const fanPositions: Array<{position: Triple; scale: Triple}> = [];
    const cyanRings: Array<{position: Triple; scale: Triple}> = [];
    const violetRings: Array<{position: Triple; scale: Triple}> = [];
    for (let index = 0; index < 3; index++) {
        const fan = kit.group(cooling, `Fan${index + 1}`, [0, -450 + index * 450, 655]);
        for (const side of [-1, 1]) {
            kit.box(fan, materials.black, [410, 32, 65], [0, side * 205, 0]);
            kit.box(fan, materials.black, [32, 410, 65], [side * 205, 0, 0]);
        }
        fanPositions.push({position: [0, -450 + index * 450, 655], scale: [1, 1, 1]});
        (index === 1 ? violetRings : cyanRings).push({position: [0, -450 + index * 450, 675], scale: [1, 1, 1]});
        const rotor = kit.group(fan, 'Rotor');
        const blades = Array.from({length: 7}, (_, blade) => {
            const angle = blade * Math.PI * 2 / 7;
            return {
                position: [Math.sin(angle) * 100, Math.cos(angle) * 100, -10] as Triple,
                scale: [68, 157, 16] as Triple,
                rotation: [0, 0, -angle + 0.35] as Triple,
            };
        });
        kit.instances(rotor, kit.rounded, materials.black, blades, 'InstancedFanBlades');
        rotors.push(rotor);
        // Fixed protective grille stays outside the rotating blade group.
        for (const angle of [0, Math.PI / 2]) {
            const grille = kit.box(fan, materials.metal, [9, 380, 8], [0, 0, 42]);
            grille.rotation.z = angle;
        }
        for (let bar = -4; bar <= 4; bar++) {
            const x = bar * 35;
            const length = Math.sqrt(175 * 175 - x * x) * 2;
            kit.box(fan, materials.metal, [4, length, 5], [x, 0, 48], 'GrilleWire');
        }
    }
    kit.instances(cooling, kit.sharedGeometry('FanHousing', () => new THREE.TorusGeometry(194, 15, 6, 40)),
        materials.graphite, fanPositions, 'InstancedFanHousings');
    const ring = kit.sharedGeometry('FanRing', () => new THREE.TorusGeometry(184, 7, 6, 40));
    kit.instances(cooling, ring, materials.cyan, cyanRings, 'CyanFanRings');
    kit.instances(cooling, ring, materials.violet, violetRings, 'VioletFanRing');
    kit.instances(cooling, new THREE.CylinderGeometry(45, 45, 30, 16), materials.metal,
        fanPositions.map(({position}) => ({position: [position[0], position[1], position[2] + 12] as Triple,
            scale: [1, 1, 1] as Triple, rotation: [Math.PI / 2, 0, 0] as Triple})), 'StaticFanHubs');
    const controlMaterial = kit.cloneMaterial(materials.graphite, 'PCControl');
    controlMaterial.emissive.copy(materials.violet.emissive);
    controlMaterial.emissiveIntensity = 0.02;
    const control = kit.box(root, controlMaterial, [500, 110, 35], [0, 700, 690], 'PCAccentControl', true);
    control.userData.hardwareControl = 'pc';
    kit.mesh(root, new THREE.CylinderGeometry(28, 28, 8, 16), materials.metal,
        [0, 700, 712], [Math.PI / 2, 0, 0], 'PCPowerButton');
    for (const x of [-140, 140]) kit.box(root, materials.black, [65, 18, 4], [x, 700, 710], 'FrontPort');
    fasteners(kit, root, materials, [-1, 1].flatMap(side =>
        [-740, -250, 250, 740].map(y => [side * 415, y, 652] as Triple)));
    for (let index = 0; index < 18; index++) {
        kit.box(root, materials.black, [630, 13, 8], [0, -650 + index * 70, -672], 'RearVent');
    }
    kit.box(root, materials.magenta, [28, 7, 8], [320, 700, 680], 'PowerLED');
    // Rotor blades are already InstancedMeshes and are deliberately excluded by batchBoxes.
    kit.batchBoxes(internals);
    kit.batchBoxes(root);
    return { root, rotors };
}
