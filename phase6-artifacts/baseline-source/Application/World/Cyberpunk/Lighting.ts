import * as THREE from 'three';

export function createLighting() {
    const root = new THREE.Group();
    root.name = 'Lighting';
    const ambient = new THREE.HemisphereLight('#9cb1ce', '#080b14', 0.28);
    ambient.name = 'AmbientFill';
    root.add(ambient);
    const key = new THREE.DirectionalLight('#cbd6e7', 1.05);
    key.name = 'SoftRoomKey';
    key.position.set(-4000, 6500, 5000);
    key.target.position.set(0, -450, 300);
    root.add(key, key.target);
    const practical = new THREE.SpotLight('#ffb46b', 3.2, 7000, Math.PI / 3, 0.8, 1);
    practical.name = 'WarmPractical';
    practical.position.set(-2430, 620, 360);
    practical.target.position.set(-1700, -500, 1000);
    practical.castShadow = true;
    practical.shadow.mapSize.set(1024, 1024);
    practical.shadow.camera.near = 80;
    practical.shadow.camera.far = 7000;
    practical.shadow.bias = -0.00015;
    practical.shadow.normalBias = 4;
    root.add(practical, practical.target);
    const cyan = new THREE.PointLight('#00e5ff', 2.1, 4200, 2);
    cyan.name = 'ScreenGlow';
    cyan.position.set(1650, 1050, 650);
    const violet = new THREE.PointLight('#8b5cf6', 1.8, 4800, 2);
    violet.name = 'WallAccent';
    violet.position.set(-2200, 2000, -2400);
    root.add(cyan, violet);
    root.traverse(object => {
        if (object instanceof THREE.Light) object.color.convertSRGBToLinear();
        if (object instanceof THREE.HemisphereLight) object.groundColor.convertSRGBToLinear();
    });
    return root;
}
