import * as THREE from 'three';
import RoomKit from './RoomKit';
import { RoomMaterials } from './Materials';

export function createArchitecture(kit: RoomKit, materials: RoomMaterials) {
    const root = new THREE.Group();
    root.name = 'Architecture';
    // Open front/left: the established idle/orbit camera can see into the room.
    kit.box(root, materials.black, [14200, 180, 11000], [0, -2810, 2100], 'Foundation');
    for (let index = 0; index < 20; index++) {
        kit.box(root, materials.floor, [694, 40, 11000], [-6593 + index * 694, -2700, 2100]);
    }
    kit.box(root, materials.wall, [14200, 9400, 180], [0, 2000, -3490], 'BackWall');
    kit.box(root, materials.wall, [180, 9400, 7600], [7010, 2000, 200], 'RightWall');
    kit.box(root, materials.metal, [14000, 160, 50], [0, -2560, -3370], 'Skirting');
    kit.box(root, materials.metal, [50, 160, 7500], [6890, -2560, 200]);
    for (let x = -6000; x <= 6000; x += 2000) {
        kit.box(root, materials.black, [16, 9200, 10], [x, 2000, -3390], 'WallSeam');
    }
    for (let index = 0; index < 7; index++) {
        const x = -2250 + index * 750;
        kit.box(root, materials.black, [650, 2300, 150], [x, 1750, -3310], 'AcousticPanel');
        for (let rib = 0; rib < 6; rib++) {
            kit.box(root, materials.fabric, [55, 2180, 65], [x - 245 + rib * 98, 1750, -3200]);
        }
    }
    kit.box(root, materials.violet, [4700, 14, 20], [0, 3030, -3240], 'PanelEdgeLight');
    const shelf = kit.group(root, 'Shelving', [-4100, 1800, -2950]);
    for (const y of [0, 1200]) {
        kit.box(shelf, materials.desk, [2200, 90, 650], [0, y, 0], 'Shelf');
        for (const x of [-800, 800]) {
            kit.box(shelf, materials.metal, [60, 380, 60], [x, y - 200, -230]);
            kit.box(shelf, materials.metal, [60, 60, 440], [x, y - 70, -80]);
        }
    }
    for (let index = 0; index < 6; index++) {
        kit.box(shelf, index % 3 ? materials.graphite : materials.metal,
            [110 + index * 9, 450 + (index % 3) * 90, 340],
            [-700 + index * 180, 300, -20], 'UnlabelledBook');
    }
    kit.box(shelf, materials.graphite, [550, 300, 430], [550, 1410, 20], 'Storage');
    // A recessed service channel is architectural detail, not another neon strip.
    kit.box(root, materials.black, [5300, 70, 100], [-350, -700, -3320], 'CableChannel');
    kit.batchBoxes(root);
    return root;
}
