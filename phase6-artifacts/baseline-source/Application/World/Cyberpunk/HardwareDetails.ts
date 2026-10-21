import * as THREE from 'three';
import RoomKit, { Triple } from './RoomKit';
import { RoomMaterials } from './Materials';

/** Original low-poly keycap: tapered walls, bevel rim and a shallow dished top. */
export function sculptedKeycap() {
    const positions: number[] = [];
    const indices: number[] = [];
    const quad = (a: Triple, b: Triple, c: Triple, d: Triple) => {
        const start = positions.length / 3;
        positions.push(...a, ...b, ...c, ...d);
        indices.push(start, start + 1, start + 2, start, start + 2, start + 3);
    };
    const corners = [[-1, -1], [-1, 1], [1, 1], [1, -1]];
    for (let side = 0; side < 4; side++) {
        const [x, z] = corners[side];
        const [nx, nz] = corners[(side + 1) % 4];
        quad([x * 0.5, -0.5, z * 0.5], [nx * 0.5, -0.5, nz * 0.5],
            [nx * 0.46, 0.36, nz * 0.46], [x * 0.46, 0.36, z * 0.46]);
        quad([x * 0.46, 0.36, z * 0.46], [nx * 0.46, 0.36, nz * 0.46],
            [nx * 0.4, 0.5, nz * 0.4], [x * 0.4, 0.5, z * 0.4]);
    }
    const start = positions.length / 3;
    for (let z = 0; z <= 4; z++) for (let x = 0; x <= 4; x++) {
        const px = x / 4 * 0.8 - 0.4;
        const pz = z / 4 * 0.8 - 0.4;
        const y = 0.5 - 0.1 * (1 - (px / 0.4) ** 2) * (1 - (pz / 0.4) ** 2);
        positions.push(px, y, pz);
    }
    for (let z = 0; z < 4; z++) for (let x = 0; x < 4; x++) {
        const a = start + z * 5 + x;
        indices.push(a, a + 5, a + 1, a + 1, a + 5, a + 6);
    }
    quad([-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5]);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const uvs: number[] = [];
    for (let index = 0; index < positions.length; index += 3) uvs.push(positions[index] + 0.5, positions[index + 2] + 0.5);
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
}

export function fasteners(kit: RoomKit, parent: THREE.Object3D, materials: RoomMaterials,
    points: Triple[], rotation: Triple = [Math.PI / 2, 0, 0]) {
    return kit.instances(parent,
        kit.sharedGeometry('HexFastener', () => new THREE.CylinderGeometry(1, 1, 1, 6)),
        materials.metal, points.map(position => ({position, scale: [9, 5, 9] as Triple, rotation})), 'HexFasteners');
}

export function monitorDetails(kit: RoomKit, materials: RoomMaterials, monitor: THREE.Group,
    width: number, height: number) {
    const rear = kit.group(monitor, 'RearVentilation');
    kit.box(rear, materials.black, [width * 0.56, 290, 6], [0, 0, -124], 'VentRecess');
    for (let index = 0; index < 16; index++) {
        kit.box(rear, materials.graphite, [18, 265, 8], [-width * 0.25 + index * width / 30, 0, -130]);
    }
    kit.box(rear, materials.metal, [310, 280, 36], [0, -225, -150], 'VESAMount');
    fasteners(kit, rear, materials, [
        [-width / 2 + 24, height / 2 - 20, -126], [width / 2 - 24, height / 2 - 20, -126],
        [-width / 2 + 24, -height / 2 + 20, -126], [width / 2 - 24, -height / 2 + 20, -126],
    ]);
    kit.cable(rear, materials.black, [[60, -300, -166], [100, -500, -175], [130, -700, -180]], 9);
}
