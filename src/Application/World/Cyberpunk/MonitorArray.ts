import * as THREE from 'three';
import RoomKit from './RoomKit';
import { RoomMaterials } from './Materials';
import { displayTexture } from './Displays';
import { monitorDetails } from './HardwareDetails';
import { CENTER_SCREEN, SIDE_SCREEN } from '../MonitorConfig';

export { CENTER_SCREEN, SIDE_SCREEN } from '../MonitorConfig';

export function createMonitorArray(kit: RoomKit, materials: RoomMaterials) {
    const root = new THREE.Group();
    root.name = 'MonitorArray';
    const center = kit.group(root, 'CenterMonitor', CENTER_SCREEN.position);
    center.rotation.x = CENTER_SCREEN.tilt;
    // Keep the thin bezel outside the full CSS rectangle, including its padding.
    const width = CENTER_SCREEN.width;
    const height = CENTER_SCREEN.height;
    kit.box(center, materials.graphite, [width + 64, height + 64, 90], [0, 0, -65], 'BackPanel', true);
    for (const side of [-1, 1]) {
        kit.box(center, materials.black, [24, height + 60, 50], [side * (width / 2 + 20), 0, -25], 'SideBezel', true);
        kit.box(center, materials.black, [width + 16, 24, 50], [0, side * (height / 2 + 20), -25], 'HorizontalBezel', true);
    }
    kit.box(center, materials.cyan, [20, 4, 5], [width / 2 - 45, -height / 2 - 20, 76], 'PowerIndicator');
    const aperture = kit.group(center, 'InteractiveAperture');
    aperture.userData = { width, height, padding: CENTER_SCREEN.padding, compositorDepth: CENTER_SCREEN.compositorDepth };
    monitorDetails(kit, materials, center, width, height);
    kit.box(root, materials.metal, [150, 850, 130], [0, 5, 25], 'CenterStand', true);
    kit.box(root, materials.graphite, [820, 50, 540], [0, -420, 120], 'CenterFoot', true);

    for (const side of [-1, 1]) {
        const x = side * SIDE_SCREEN.offset;
        const monitor = kit.group(root, side < 0 ? 'LeftMonitor' : 'RightMonitor', [x, 950, 110]);
        monitor.rotation.y = side * -SIDE_SCREEN.toeIn;
        monitor.rotation.x = CENTER_SCREEN.tilt;
        kit.box(monitor, materials.graphite, [SIDE_SCREEN.width + 52, SIDE_SCREEN.height + 52, 90], [0, 0, -65], 'RearShell', true);
        kit.box(monitor, materials.black, [SIDE_SCREEN.width + 40, SIDE_SCREEN.height + 40, 50], [0, 0, 0], 'Bezel', true);
        const screen = new THREE.MeshBasicMaterial({ map: displayTexture(kit, side < 0 ? 'github' : 'terminal'), toneMapped: false });
        screen.name = side < 0 ? 'GitHubWorkspace' : 'IllustrativeTerminal';
        kit.materials.add(screen);
        const face = kit.mesh(monitor, new THREE.PlaneGeometry(SIDE_SCREEN.width, SIDE_SCREEN.height), screen, [0, 0, 30], [0, 0, 0], 'WorkspaceDisplay');
        face.castShadow = false;
        monitorDetails(kit, materials, monitor, SIDE_SCREEN.width, SIDE_SCREEN.height);
        kit.box(monitor, side < 0 ? materials.violet : materials.cyan, [18, 4, 5], [SIDE_SCREEN.width / 2 - 35, -SIDE_SCREEN.height / 2 - 10, 30], 'PowerIndicator');
        kit.box(root, materials.metal, [100, 1040, 120], [x, 100, -10], 'SideStand', true);
        kit.box(root, materials.graphite, [540, 45, 420], [x, -420, 20], 'SideFoot', true);
        kit.cable(root, materials.black, [[x, 700, -30], [x, 40, -140], [side * 1900, -370, -450]]);
    }
    kit.instances(root, kit.sharedGeometry('StandHinge', () => new THREE.CylinderGeometry(80, 80, 190, 16)),
        materials.metal, [-SIDE_SCREEN.offset, 0, SIDE_SCREEN.offset].map(x => ({
            position: [x, x === 0 ? 430 : 630, 0] as [number, number, number],
            scale: [1, 1, 1] as [number, number, number], rotation: [0, 0, Math.PI / 2] as [number, number, number],
        })), 'StandHinges');
    kit.batchBoxes(root);
    return root;
}
