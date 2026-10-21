import * as THREE from 'three';

export type DisposedResources = Pick<WeakSet<{dispose(): void}>, 'add' | 'has'>;
export function disposeOnce(resource: {dispose(): void} | null | undefined, seen: DisposedResources) {
    if (!resource || seen.has(resource)) return;
    seen.add(resource); resource.dispose();
}
export function disposeScene(root: THREE.Object3D, seen: DisposedResources) {
    root.traverse(object => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) disposeOnce(mesh.geometry, seen);
        if (object instanceof THREE.InstancedMesh) disposeOnce(object, seen);
        const materials = mesh.material ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) : [];
        materials.forEach(material => {
            Object.values(material).forEach(value => { if (value instanceof THREE.Texture) disposeOnce(value, seen); });
            if (material instanceof THREE.ShaderMaterial) Object.values(material.uniforms).forEach(uniform => {
                if (uniform.value instanceof THREE.Texture) disposeOnce(uniform.value, seen);
            });
            disposeOnce(material, seen);
        });
        const shadow = (object as THREE.Light & {shadow?: THREE.LightShadow}).shadow;
        if (shadow) disposeOnce(shadow.map, seen);
    });
}
