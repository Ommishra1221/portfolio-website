import * as THREE from 'three';
import RoomKit, { Triple } from './RoomKit';
import { RoomMaterials } from './Materials';
import { fasteners, sculptedKeycap } from './HardwareDetails';

function createKeyboard(kit: RoomKit, materials: RoomMaterials, parent: THREE.Group) {
    const keyboard = kit.group(parent, 'MechanicalKeyboard', [-260, -355, 1320]);
    kit.box(keyboard, materials.graphite, [1660, 110, 620], [0, 0, 0], 'KeyboardCase', true);
    kit.box(keyboard, materials.black, [1610, 20, 570], [0, 65, 0], 'SwitchPlate', true);
    kit.box(keyboard, materials.violet, [1580, 5, 8], [0, -22, 311], 'KeyboardUnderglow');
    const keys: Array<{ position: Triple; scale: Triple }> = [];
    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < 15; column++) {
            keys.push({ position: [-728 + column * 104, 103 - row * 2, -225 + row * 105], scale: [91, 48, 89] });
        }
    }
    for (const x of [-728, -614, -500, 500, 614, 728]) {
        keys.push({ position: [x, 97, 200], scale: [94, 48, 89] });
    }
    keys.push({ position: [0, 97, 200], scale: [740, 48, 89] });
    kit.instances(keyboard, kit.sharedGeometry('SculptedKeycap', sculptedKeycap), materials.keys, keys, 'Keycaps/67');
    for (const side of [-1, 1]) {
        kit.box(keyboard, materials.black, [1600, 3, 3], [0, 20, side * 308], 'CaseSeam');
    }
    kit.box(keyboard, materials.metal, [110, 35, 35], [-270, 0, -320], 'CableConnector', true);
    fasteners(kit, keyboard, materials, [[-800, 58, -280], [800, 58, -280], [-800, 58, 280], [800, 58, 280]], [0, 0, 0]);
    const status = kit.cloneMaterial(materials.cyan, 'KeyboardStatus');
    status.emissiveIntensity = 0.12;
    kit.box(keyboard, status, [22, 4, 8], [660, 78, 276], 'TypingStatusLED');
    kit.box(keyboard, materials.black, [22, 4, 8], [715, 78, 276], 'SecondaryStatusLED');
    // Recessed light gaps, not one material/light per key.
    for (let row = 0; row < 4; row++) {
        kit.box(keyboard, row % 2 ? materials.violet : materials.cyan, [1540, 3, 4], [0, 76, -175 + row * 105]);
    }
    kit.cable(parent, materials.black, [[-280, -340, 1000], [-260, -400, 760], [-520, -400, 300], [-700, -400, -550]], 10);
}

function createAccessories(kit: RoomKit, materials: RoomMaterials, parent: THREE.Group) {
    const mouse = kit.group(parent, 'Mouse', [1040, -365, 1330]);
    const body = kit.mesh(mouse, new THREE.SphereGeometry(1, 24, 16), materials.graphite);
    body.scale.set(155, 85, 245);
    kit.box(mouse, materials.black, [8, 10, 180], [0, 79, -65], 'ButtonSeparation');
    kit.mesh(mouse, new THREE.CylinderGeometry(27, 27, 30, 16), materials.metal, [0, 83, -95], [0, 0, Math.PI / 2], 'ScrollWheel');
    kit.instances(mouse, kit.cube, materials.black, Array.from({length: 12}, (_, index) => {
        const angle = index * Math.PI / 6;
        return {position: [0, 83 + Math.cos(angle) * 28, -95 + Math.sin(angle) * 28] as Triple,
            scale: [31, 3, 5] as Triple, rotation: [angle, 0, 0] as Triple};
    }), 'WheelTreads');
    kit.box(mouse, materials.cyan, [35, 3, 9], [0, 65, 166], 'MouseIndicator', true);
    kit.cable(parent, materials.black, [[1040, -370, 1090], [1030, -410, 900], [1200, -420, 700], [1380, -420, 420], [1500, -420, -600]], 8);

    const headphones = kit.group(parent, 'Headphones', [-2240, -310, 1180]);
    kit.mesh(headphones, new THREE.TorusGeometry(210, 25, 8, 28, Math.PI), materials.graphite);
    kit.mesh(headphones, new THREE.TorusGeometry(197, 14, 8, 28, Math.PI), materials.fabric, [0, 0, 0], [0, 0, 0], 'HeadbandPadding');
    for (const [name, material, radius, width, offset] of [
        ['EarCushions', materials.black, 85, 60, 205], ['EarCups', materials.metal, 91, 25, 245],
    ] as const) {
        kit.instances(headphones, new THREE.CylinderGeometry(radius, radius, width, 20), material,
            [-1, 1].map(side => ({position: [side * offset, -45, 0] as Triple, scale: [1, 1, 1] as Triple,
                rotation: [0, 0, Math.PI / 2] as Triple})), name);
    }

    const mug = kit.group(parent, 'CoffeeMug', [1840, -430, 1450]);
    kit.mesh(mug, new THREE.CylinderGeometry(138, 142, 18, 24), materials.black, [0, -10, 0], [0, 0, 0], 'Coaster');
    const profile = [[0, 0], [88, 0], [98, 25], [105, 240], [91, 240], [84, 20], [0, 20]];
    kit.mesh(mug, new THREE.LatheGeometry(profile.map(([x, y]) => new THREE.Vector2(x, y)), 32), materials.ceramic);
    kit.mesh(mug, new THREE.CircleGeometry(90, 32), materials.coffee, [0, 211, 0], [-Math.PI / 2, 0, 0], 'Coffee');
    kit.mesh(mug, new THREE.TorusGeometry(70, 18, 8, 24), materials.ceramic, [128, 135, 0], [0, 0, 0], 'MugHandle');

    const lamp = kit.group(parent, 'DeskLamp', [-2780, -430, 360]);
    const lampControl = kit.cloneMaterial(materials.graphite, 'LampControl');
    lampControl.emissive.copy(materials.cyan.emissive);
    lampControl.emissiveIntensity = 0.02;
    const base = kit.mesh(lamp, new THREE.CylinderGeometry(220, 240, 45, 28), lampControl, [0, 22, 0], [0, 0, 0], 'LampBaseControl');
    base.userData.hardwareControl = 'lamp';
    kit.mesh(lamp, new THREE.CylinderGeometry(38, 38, 12, 16), materials.black, [100, 51, 100], [0, 0, 0], 'LampSwitch');
    kit.box(lamp, materials.metal, [45, 1330, 45], [0, 690, 0], 'LampStem', true);
    kit.box(lamp, materials.metal, [390, 45, 45], [165, 1350, 0], 'LampArm', true);
    kit.mesh(lamp, new THREE.CylinderGeometry(130, 245, 300, 28, 1, true), materials.graphite, [350, 1220, 0]);
    kit.mesh(lamp, new THREE.CircleGeometry(220, 28), materials.warm, [350, 1073, 0], [Math.PI / 2, 0, 0], 'LampDiffuser');
}

function createChair(kit: RoomKit, materials: RoomMaterials, parent: THREE.Group) {
    const chair = kit.group(parent, 'TaskChair', [120, 0, 3080]);
    kit.box(chair, materials.fabric, [1140, 150, 950], [0, -1300, 0], 'Seat', true);
    const back = kit.box(chair, materials.fabric, [1080, 1470, 150], [0, -450, 430], 'Backrest', true);
    back.rotation.x = -0.12;
    for (const x of [-590, 590]) {
        kit.box(chair, materials.graphite, [70, 540, 100], [x, -1120, 120], 'ArmSupport', true);
        kit.box(chair, materials.black, [150, 75, 660], [x, -835, 0], 'ArmRest', true);
    }
    kit.mesh(chair, new THREE.CylinderGeometry(62, 80, 1170, 16), materials.metal,
        [0, -1970, 0], [0, 0, 0], 'GasLift');
    kit.mesh(chair, new THREE.CylinderGeometry(105, 105, 140, 16), materials.black, [0, -2440, 0], [0, 0, 0], 'LiftCollar');
    kit.box(chair, materials.metal, [360, 24, 28], [-460, -1410, 80], 'HeightLever', true);
    const casters: Array<{position: Triple; scale: Triple; rotation: Triple}> = [];
    for (let index = 0; index < 5; index++) {
        const angle = index * Math.PI * 2 / 5;
        const spoke = kit.box(chair, materials.graphite, [90, 70, 760],
            [Math.sin(angle) * 350, -2550, Math.cos(angle) * 350], 'BaseSpoke', true);
        spoke.rotation.y = angle;
        casters.push({position: [Math.sin(angle) * 680, -2615, Math.cos(angle) * 680],
            scale: [1, 1, 1], rotation: [0, 0, Math.PI / 2]});
    }
    kit.instances(chair, new THREE.CylinderGeometry(65, 65, 75, 12), materials.black, casters, 'InstancedCasters');
}

export function createWorkstation(kit: RoomKit, materials: RoomMaterials) {
    const root = new THREE.Group();
    root.name = 'Workstation';
    kit.box(root, materials.desk, [6600, 145, 2700], [0, -525, 650], 'Desktop', true);
    for (const x of [-2920, 2920]) {
        for (const z of [-450, 1700]) {
            kit.box(root, materials.graphite, [140, 2050, 140], [x, -1660, z], 'DeskLeg', true);
            kit.box(root, materials.black, [185, 60, 185], [x, -2665, z], 'LevellingFoot', true);
        }
        kit.box(root, materials.metal, [140, 110, 2300], [x, -650, 650], 'DeskFrame');
    }
    kit.box(root, materials.graphite, [5800, 160, 120], [0, -730, -450], 'CrossBrace');
    kit.box(root, materials.black, [2640, 18, 1110], [-50, -442, 1260], 'DeskMat', true);
    for (let index = 0; index < 40; index++) {
        kit.box(root, materials.keys, [30, 2, 3], [-1280 + index * 63, -431, 1815], 'MatStitch');
    }
    kit.box(root, materials.black, [4200, 170, 250], [0, -730, -380], 'CableTray');
    for (const x of [-1900, 1900]) {
        kit.mesh(root, new THREE.CylinderGeometry(75, 75, 8, 20), materials.black, [x, -448, -400], [0, 0, 0], 'CableGrommet');
    }
    kit.box(root, materials.cyan, [5100, 8, 16], [0, -580, -707], 'RearDeskLight');
    for (let index = 0; index < 8; index++) {
        kit.box(root, materials.metal, [55, 25, 130], [-1800 + index * 500, -650, -430], 'CableClip');
    }
    createKeyboard(kit, materials, root);
    createAccessories(kit, materials, root);
    createChair(kit, materials, root);
    kit.cable(root, materials.black, [[2450, -410, -450], [2500, -850, -570], [2600, -1600, -570], [2600, -2620, -580], [4100, -2670, -3100]], 18);
    kit.batchBoxes(root);
    return root;
}
