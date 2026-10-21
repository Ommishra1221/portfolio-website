const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {root, THREE, createLoader, metrics} = require('../phase4-artifacts/load-module.cjs');
let checks = 0, rays = 0;
const check = (value, label) => { assert.ok(value, label); checks++; };
const load = createLoader();
const config = load(path.join(root, 'src/Application/World/MonitorConfig.ts'));
const {CENTER_SCREEN: screen} = config;
const {SIDE_SCREEN: side} = load(path.join(root, 'src/Application/World/Cyberpunk/MonitorArray.ts'));
const Room = load(path.join(root, 'src/Application/World/Cyberpunk/CyberpunkRoom.ts')).default;
const room = new Room(); room.updateMatrixWorld(true);
const center = room.getObjectByName('CenterMonitor');
check(screen.width === 1920 && screen.height === 1080, 'enlarged interactive dimensions');
check(screen.width / side.width >= 1.7 && screen.width / side.width <= 2, 'dominant center width');
check(center.position.toArray().join() === screen.position.join() && center.rotation.x === screen.tilt, 'physical transform matches shared contract');
check(room.getObjectByName('InteractiveAperture').userData.padding === screen.padding, 'housing padding contract');
for (const [name, sign] of [['LeftMonitor', -1], ['RightMonitor', 1]]) {
    const monitor = room.getObjectByName(name);
    check(monitor.rotation.y === -sign * side.toeIn, name + ' inward angle');
    const face = monitor.getObjectByName('WorkspaceDisplay');
    check(face.geometry.parameters.width === side.width && face.geometry.parameters.height === side.height, name + ' screen size');
    const bounds = new THREE.Box3().setFromObject(monitor);
    check(bounds.min.x > -3300 && bounds.max.x < 3300 && bounds.min.z > -700 && bounds.max.z < 2000, name + ' fits existing desk');
}
const raycaster = new THREE.Raycaster();
for (const origin of [[0, 950, 2800], [0, 1800, 5500], [-20000, 12000, 20000]]) {
    const camera = new THREE.Vector3(...origin);
    for (let ix = 0; ix <= 10; ix++) for (let iy = 0; iy <= 8; iy++) {
        const local = new THREE.Vector3((ix / 10 - .5) * (screen.width - 2), (iy / 8 - .5) * (screen.height - 2), 0);
        const target = local.clone().applyMatrix4(center.matrixWorld);
        raycaster.set(camera, target.clone().sub(camera).normalize());
        raycaster.far = camera.distanceTo(target) - .5;
        const hits = raycaster.intersectObject(room, true).filter(hit => !hit.object.material?.transparent);
        check(hits.length === 0, `clear enlarged aperture ${origin} / ${local.toArray()}: ${hits.map(hit => hit.object.name)}`);
        rays++;
    }
}
// Execute real CSS3D/cutout and overlay/enclosure methods with a minimal DOM fixture.
class CSSObject extends THREE.Object3D { constructor(element) { super(); this.element = element; } }
function events() {
    const listeners = new Map();
    return {listeners, addEventListener(type, fn) {listeners.set(type, fn);}, removeEventListener(type) {listeners.delete(type);}};
}
const window = {...events(), location: {search: '?dev'}, setTimeout() {return 1;}, clearTimeout() {}};
const document = {createElement() {return {...events(), style: {}, children: [], contentWindow: {}, events: [],
    append(...children) {this.children.push(...children);}, setAttribute() {},
    dispatchEvent(event) {this.events.push(event);},
    getBoundingClientRect() {return {left: 10, top: 20, width: 960, height: 540};}};}};
const monitorLoad = createLoader({window, document, URL, CustomEvent: class {constructor(type) {this.type = type;}}}, {
    'three/examples/jsm/renderers/CSS3DRenderer.js': {CSS3DObject: CSSObject},
    '../Application': {__esModule: true, default: class {}},
});
const Monitor = monitorLoad(path.join(root, 'src/Application/World/MonitorScreen.ts')).default;
const monitor = Object.create(Monitor.prototype);
Object.assign(monitor, {screenSize: new THREE.Vector2(screen.width, screen.height), position: new THREE.Vector3(...screen.position),
    rotation: new THREE.Euler(screen.tilt, 0, 0), scene: new THREE.Scene(), cssScene: new THREE.Scene()});
monitor.createIframe();
monitor.scene.updateMatrixWorld(true); monitor.cssScene.updateMatrixWorld(true);
const cutout = monitor.scene.children[0], css = monitor.cssScene.children[0];
check(cutout.matrixWorld.equals(css.matrixWorld) && cutout.matrixWorld.equals(center.matrixWorld), 'CSS3D / cutout / housing matrices identical');
check(cutout.geometry.parameters.width === screen.width && cutout.geometry.parameters.height === screen.height, 'cutout covers full enlarged CSS rectangle');
check(monitor.iframe.style.width === '1920px' && monitor.iframe.style.height === '1080px' && monitor.iframe.style.padding === '32px', 'iframe dimensions and padding');
const material = cutout.material;
check(material.isMeshBasicMaterial && material.color.getHex() === 0 && material.opacity === 0 && material.transparent, 'unlit transparent-black mask');
check(material.blending === THREE.NoBlending && material.premultipliedAlpha && material.depthTest && material.depthWrite && material.colorWrite && !material.toneMapped && !material.fog, 'correct alpha/depth compositor semantics');
monitor.resources = {items: {texture: {monitorSmudgeTexture: new THREE.Texture(), monitorShadowTexture: new THREE.Texture()}}};
monitor.videoTextures = {};
monitor.getVideoTextures = id => {monitor.videoTextures[id] = new THREE.Texture();};
const depth = monitor.createTextureLayers();
check(depth === screen.compositorDepth, 'shared depth matches actual overlay stack');
for (const layer of monitor.scene.children.slice(1)) {
    check(layer.geometry.parameters.width === screen.width && layer.geometry.parameters.height === screen.height && layer.rotation.x === screen.tilt, 'actual overlay stack matches enlarged screen');
}
monitor.createEnclosingPlanes(screen.compositorDepth);
monitor.createPerspectiveDimmer(screen.compositorDepth);
check(monitor.dimmingPlane.geometry.parameters.width === screen.width && monitor.dimmingPlane.geometry.parameters.height === screen.height, 'dimmer follows full screen');
for (const [x, y] of [[0, 0], [.5, .5], [1, 1], [0, 1], [1, 0]]) {
    window.listeners.get('message')({source: monitor.iframe.contentWindow, origin: 'http://localhost:3000', data: {
        type: 'mousemove', clientX: x * (screen.width - 64), clientY: y * (screen.height - 64),
        viewportWidth: screen.width - 64, viewportHeight: screen.height - 64,
    }});
    const event = monitor.iframe.events.at(-1);
    check(Math.abs(event.clientX - (26 + x * 928)) < 1e-9 && Math.abs(event.clientY - (36 + y * 508)) < 1e-9, 'pointer mapping at ' + [x, y]);
}
// Project all four corners, including forward layers, using the actual responsive keyframe.
const app = {sizes: {width: 1440, height: 1000}, mouse: {x: 720, y: 500}, camera: {instance: new THREE.PerspectiveCamera(35, 1.44, 10, 900000)}};
const keyLoad = createLoader({}, {'../Application': {__esModule: true, default: class {constructor() {return app;}}}});
const Focus = keyLoad(path.join(root, 'src/Application/Camera/CameraKeyframes.ts')).MonitorKeyframe;
const focus = new Focus();
for (const [width, height] of [[390, 844], [768, 1024], [1024, 768], [1440, 1000], [1920, 1080], [2560, 1080]]) {
    Object.assign(app.sizes, {width, height}); focus.update();
    const camera = app.camera.instance; camera.aspect = width / height; camera.updateProjectionMatrix();
    camera.position.copy(focus.position); camera.lookAt(focus.focalPoint); camera.updateMatrixWorld(true);
    for (const x of [-screen.width / 2, screen.width / 2]) for (const y of [-screen.height / 2, screen.height / 2]) {
        for (const z of [0, screen.compositorDepth]) {
            const point = new THREE.Vector3(x, y, 0).applyMatrix4(center.matrixWorld); point.z += z;
            point.project(camera);
            check(Math.abs(point.x) < .96 && Math.abs(point.y) < .96 && Math.abs(point.z) < 1, 'focus fits full screen and forward layers at ' + [width, height]);
        }
    }
}
const Desk = keyLoad(path.join(root, 'src/Application/Camera/CameraKeyframes.ts')).DeskKeyframe;
for (const [width, height] of [[1024, 768], [1440, 1000], [1920, 1080]]) {
    Object.assign(app.sizes, {width, height});
    for (const [x, y] of [[0, 0], [width, height], [width / 2, height / 2]]) {
        Object.assign(app.mouse, {x, y}); const desk = new Desk();
        for (let step = 0; step < 250; step++) desk.update();
        const camera = app.camera.instance; camera.aspect = width / height; camera.updateProjectionMatrix();
        camera.position.copy(desk.position); camera.lookAt(desk.focalPoint); camera.updateMatrixWorld(true);
        for (const name of ['CenterMonitor', 'LeftMonitor', 'RightMonitor']) {
            const bounds = new THREE.Box3().setFromObject(room.getObjectByName(name));
            for (const px of [bounds.min.x, bounds.max.x]) for (const py of [bounds.min.y, bounds.max.y]) for (const pz of [bounds.min.z, bounds.max.z]) {
                const point = new THREE.Vector3(px, py, pz).project(camera);
                check(Math.abs(point.x) < .98 && Math.abs(point.y) < .98 && Math.abs(point.z) < 1, `desk contains ${name} at viewport ${width},${height} pointer ${x},${y}`);
            }
        }
    }
}
// Record actual canvas text to check provenance and illustrative labelling.
let drawText = [], context = {fillRect() {}, fillText(text) {drawText.push(text);}};
const canvasLoad = createLoader({document: {createElement() {return {width: 0, height: 0, getContext() {return context;}};}}});
const displays = canvasLoad(path.join(root, 'src/Application/World/Cyberpunk/Displays.ts'));
const Kit = load(path.join(root, 'src/Application/World/Cyberpunk/RoomKit.ts')).default, kit = new Kit();
const github = displays.displayTexture(kit, 'github');
check(github.image.width === 960 && github.image.height === 600 && github.encoding === THREE.sRGBEncoding, 'side canvas resolution, aspect and encoding');
const content = load(path.resolve(root, '../portfolio-inner-site/src/constants/portfolioContent.ts')).default;
check(drawText.includes(content.name) && drawText.includes(content.github.replace('https://', '')), 'verified identity and profile');
for (const project of content.projects) {
    check(drawText.includes(project.title) && drawText.includes(project.repo.replace('https://', '')), 'verified repository ' + project.title);
    check(drawText.includes(project.technologies.join(' / ')), 'verified technologies ' + project.title);
    check(drawText.join(' ').includes(project.description), 'verified summary ' + project.title);
}
drawText = []; displays.displayTexture(kit, 'terminal');
for (const term of ['ILLUSTRATIVE', 'NOT A LIVE SESSION', 'Spring Boot', 'REST API', 'mvn test', 'SQL', 'NO COMMANDS EXECUTED']) {
    check(drawText.some(text => text.includes(term)), 'terminal content: ' + term);
}
context = null; check(displays.displayTexture(kit, 'terminal').isDataTexture, 'canvas failure is non-blocking');
const counts = metrics(room);
check(counts.meshSubmissions < 125 && counts.lights === 5 && counts.shadowLights === 1 && counts.transparentMeshes === 1, 'existing render budget retained');
const controlLoad = createLoader({document: events()});
const Controller = controlLoad(path.join(root, 'src/Application/World/Cyberpunk/HardwareInteraction.ts')).default;
const hardwareCamera = new THREE.PerspectiveCamera(35, 1.44, 10, 900000);
hardwareCamera.position.set(-20000, 12000, 20000); hardwareCamera.lookAt(0, -1000, 0); hardwareCamera.updateMatrixWorld(true);
const controller = new Controller({scene: room, surface: {style: {cursor: ''}, getBoundingClientRect() {return {left: 0, top: 0, width: 1440, height: 1000};}},
    camera: () => hardwareCamera, active: () => true, reducedMotion: () => false, hardware: room.hardware, targets: room.targets});
for (const [id, name] of [['lamp', 'LampBaseControl'], ['pc', 'PCAccentControl']]) {
    const point = room.getObjectByName(name).getWorldPosition(new THREE.Vector3()).project(hardwareCamera);
    check(controller.pick((point.x + 1) * 720, (1 - point.y) * 500)?.id === id, 'full-room hardware ray target remains reachable: ' + id);
}
controller.dispose();
const state = room.hardware.getSnapshot(); room.hardware.toggle('lamp'); room.hardware.toggle('pc'); room.update(16, true);
check(room.hardware.getSnapshot().lampOn !== state.lampOn && room.hardware.getSnapshot().pcLedsOn !== state.pcLedsOn, 'hardware state and room update retained');
const angles = room.rotors.map(rotor => rotor.rotation.z); room.update(16, true);
check(room.rotors.every((rotor, index) => rotor.rotation.z === angles[index]), 'reduced motion preserved');
kit.dispose(); room.dispose();
console.log(JSON.stringify({status: 'PASS', checks, apertureRays: rays, counts, note: 'CPU geometry/compositor/projection and DOM/canvas fixtures; browser checks are separate.'}, null, 2));
