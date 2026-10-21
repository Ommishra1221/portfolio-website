import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

export type Triple = [number, number, number];

/** Resource owner for the original procedural room. No loaders or renderer required. */
export default class RoomKit {
    geometries = new Set<THREE.BufferGeometry>();
    materials = new Set<THREE.Material>();
    textures = new Set<THREE.Texture>();
    cube = this.geometry(new THREE.BoxGeometry(1, 1, 1));
    rounded = this.geometry(new RoundedBoxGeometry(1, 1, 1, 2, 0.06));
    private transform = new THREE.Object3D();
    private shared = new Map<string, THREE.BufferGeometry>();

    sharedGeometry(name: string, create: () => THREE.BufferGeometry) {
        let geometry = this.shared.get(name);
        if (!geometry) {
            geometry = this.geometry(create());
            this.shared.set(name, geometry);
        }
        return geometry;
    }

    cloneMaterial(material: THREE.MeshStandardMaterial, name: string) {
        const clone = material.clone(); // Colors are already linear; do not convert twice.
        clone.name = name;
        this.materials.add(clone);
        return clone;
    }

    material(parameters: THREE.MeshStandardMaterialParameters) {
        const material = new THREE.MeshStandardMaterial(parameters);
        // Palette literals are authored in sRGB; Three r137 material colors are linear.
        material.color.convertSRGBToLinear();
        material.emissive.convertSRGBToLinear();
        this.materials.add(material);
        return material;
    }

    geometry<T extends THREE.BufferGeometry>(geometry: T): T {
        this.geometries.add(geometry);
        return geometry;
    }

    texture<T extends THREE.Texture>(texture: T): T {
        this.textures.add(texture);
        return texture;
    }

    group(parent: THREE.Object3D, name: string, position: Triple = [0, 0, 0]) {
        const group = new THREE.Group();
        group.name = name;
        group.position.set(...position);
        parent.add(group);
        return group;
    }

    box(parent: THREE.Object3D, material: THREE.Material, size: Triple, position: Triple,
        name = '', rounded = false) {
        const mesh = new THREE.Mesh(rounded ? this.rounded : this.cube, material);
        mesh.scale.set(...size);
        mesh.position.set(...position);
        mesh.name = name;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
    }

    mesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material,
        position: Triple = [0, 0, 0], rotation: Triple = [0, 0, 0], name = '') {
        const mesh = new THREE.Mesh(this.geometry(geometry), material);
        mesh.position.set(...position);
        mesh.rotation.set(...rotation);
        mesh.name = name;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
    }

    cable(parent: THREE.Object3D, material: THREE.Material, points: Triple[], radius = 10) {
        const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
        return this.mesh(parent, new THREE.TubeGeometry(curve, 24, radius, 6, false), material);
    }

    instances(parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material,
        transforms: Array<{ position: Triple; scale: Triple; rotation?: Triple }>, name: string) {
        const mesh = new THREE.InstancedMesh(this.geometry(geometry), material, transforms.length);
        mesh.name = name;
        transforms.forEach(({ position, scale, rotation = [0, 0, 0] }, index) => {
            this.transform.position.set(...position);
            this.transform.scale.set(...scale);
            this.transform.rotation.set(...rotation);
            this.transform.updateMatrix();
            mesh.setMatrixAt(index, this.transform.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
    }

    /** Batch static box primitives within a module, preserving the named module hierarchy. */
    batchBoxes(root: THREE.Group) {
        root.updateWorldMatrix(true, true);
        const inverse = new THREE.Matrix4().copy(root.matrixWorld).invert();
        const buckets = new Map<string, THREE.Mesh[]>();
        root.traverse(object => {
            if (!(object instanceof THREE.Mesh) || object instanceof THREE.InstancedMesh) return;
            if (object.userData.hardwareControl) return;
            if (object.geometry !== this.cube && object.geometry !== this.rounded) return;
            if (Array.isArray(object.material) || object.material.transparent) return;
            const key = object.geometry.uuid + object.material.uuid;
            const bucket = buckets.get(key) || [];
            bucket.push(object);
            buckets.set(key, bucket);
        });
        buckets.forEach(meshes => {
            const first = meshes[0];
            const material = first.material as THREE.Material;
            const batch = new THREE.InstancedMesh(first.geometry, material, meshes.length);
            batch.name = `Static/${material.name || material.type}`;
            meshes.forEach((mesh, index) => {
                batch.setMatrixAt(index, new THREE.Matrix4().multiplyMatrices(inverse, mesh.matrixWorld));
                mesh.removeFromParent();
            });
            batch.instanceMatrix.needsUpdate = true;
            batch.castShadow = true;
            batch.receiveShadow = true;
            root.add(batch);
        });
    }

    dispose() {
        this.geometries.forEach(geometry => geometry.dispose());
        this.materials.forEach(material => material.dispose());
        this.textures.forEach(texture => texture.dispose());
        this.geometries.clear();
        this.materials.clear();
        this.textures.clear();
        this.shared.clear();
    }
}
