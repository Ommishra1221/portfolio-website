import * as THREE from 'three';
import HardwareState, { HardwareControlId } from './HardwareState';

export interface HardwareTarget {
    id: HardwareControlId;
    objects: THREE.Object3D[];
    highlight: THREE.MeshStandardMaterial;
}
interface InteractionOptions {
    scene: THREE.Scene;
    surface: HTMLElement;
    camera: () => THREE.Camera;
    active: () => boolean;
    reducedMotion: () => boolean;
    hardware: HardwareState;
    targets: HardwareTarget[];
}

/** Explicit hardware registry, independent of the disabled legacy hitbox system. */
export default class HardwareInteraction {
    private raycaster = new THREE.Raycaster();
    private pointer: THREE.Vector2 | null = null;
    private hover: HardwareTarget | null = null;
    private elapsed = 0;
    private lastRay = -Infinity;
    private disposed = false;
    private cursor: string;
    private idleIntensities = new Map<HardwareTarget, number>();

    constructor(private options: InteractionOptions) {
        this.cursor = options.surface.style.cursor;
        options.surface.style.cursor = 'default';
        options.targets.forEach(target => this.idleIntensities.set(target, target.highlight.emissiveIntensity));
        document.addEventListener('pointermove', this.onMove, {passive: true});
        document.addEventListener('pointerout', this.onLeave, {passive: true});
        document.addEventListener('mousedown', this.onDown, true);
        document.addEventListener('keydown', this.onValidatedKey);
    }

    private blocked(target: EventTarget | null) {
        return target instanceof Element && !!target.closest(
            'iframe, button, a, input, textarea, select, summary, [role="button"], [contenteditable="true"], .room-controls, .experience-settings, .cinematic-controls, .scene-load-error'
        );
    }
    private onMove = (event: PointerEvent) => {
        if (this.blocked(event.target)) { this.pointer = null; this.setHover(null); return; }
        this.pointer = new THREE.Vector2(event.clientX, event.clientY);
    };
    private onLeave = (event: PointerEvent) => {
        if (!event.relatedTarget || this.blocked(event.relatedTarget)) {
            this.pointer = null;
            this.setHover(null);
        }
    };
    private onValidatedKey = (event: Event) => {
        const bridged = event as Event & {inComputer?: boolean; key?: string};
        // Observe the existing normalized relay only; never intercept native/child typing.
        if (!(event instanceof CustomEvent) || !bridged.inComputer || typeof bridged.key !== 'string') return;
        if (bridged.key.startsWith('_AUTO_') || this.options.reducedMotion()) return;
        this.options.hardware.pulseTyping();
    };
    private onDown = (event: MouseEvent) => {
        if (!(event instanceof MouseEvent) || event.button !== 0 || this.blocked(event.target)) return;
        if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
        if (!this.options.active() || !this.options.hardware.getSnapshot().available) return;
        const hit = this.pick(event.clientX, event.clientY);
        if (!hit) return;
        // Only a confirmed hardware hit consumes this camera-toggle mousedown.
        event.preventDefault();
        event.stopPropagation();
        this.setHover(hit);
        this.options.hardware.toggle(hit.id);
    };

    private pick(clientX: number, clientY: number) {
        const rect = this.options.surface.getBoundingClientRect();
        if (!Number.isFinite(clientX) || !Number.isFinite(clientY) || rect.width <= 0 || rect.height <= 0) return null;
        const x = (clientX - rect.left) / rect.width;
        const y = (clientY - rect.top) / rect.height;
        if (x < 0 || x > 1 || y < 0 || y > 1) return null;
        const camera = this.options.camera();
        camera.updateMatrixWorld();
        this.options.targets.forEach(target => target.objects.forEach(object => object.updateWorldMatrix(true, false)));
        this.raycaster.setFromCamera(new THREE.Vector2(x * 2 - 1, 1 - y * 2), camera);
        const visible = (object: THREE.Object3D) => {
            for (let parent: THREE.Object3D | null = object; parent; parent = parent.parent) if (!parent.visible) return false;
            return true;
        };
        const candidates = this.options.targets.flatMap(target => target.objects).filter(visible);
        const hit = this.raycaster.intersectObjects(candidates, false)[0];
        if (!hit) return null; // Most moves avoid the full-scene occlusion query.
        const control = this.options.targets.find(target => target.objects.includes(hit.object));
        if (!control) return null;
        this.options.scene.updateMatrixWorld(true);
        const blocker = this.raycaster.intersectObjects(this.options.scene.children, true).find(intersection => {
            const object = intersection.object as THREE.Mesh;
            if (!visible(object) || !object.material) return false;
            const material = Array.isArray(object.material) ? object.material : [object.material];
            // Transparent glass permits visibility; the CSS3D alpha cutout remains a depth barrier.
            return material.some(m => m.visible && (!m.transparent || (m.depthWrite && m.blending === THREE.NoBlending)));
        });
        if (blocker && blocker.distance < hit.distance - 0.5 && !control.objects.includes(blocker.object)) return null;
        return control;
    }

    private setHover(target: HardwareTarget | null) {
        if (target === this.hover) return;
        if (this.hover) this.hover.highlight.emissiveIntensity = this.idleIntensities.get(this.hover) || 0;
        this.hover = target;
        if (target) target.highlight.emissiveIntensity = 0.16;
        this.options.surface.style.cursor = target ? 'pointer' : 'default';
    }

    update(delta: number) {
        if (this.disposed) return;
        if (!this.options.active() || !this.options.hardware.getSnapshot().available) { this.setHover(null); return; }
        this.elapsed += Number.isFinite(delta) ? Math.min(Math.max(delta, 0), 50) : 0;
        if (!this.pointer || this.elapsed - this.lastRay < 33) return;
        this.lastRay = this.elapsed;
        this.setHover(this.pick(this.pointer.x, this.pointer.y));
    }

    dispose() {
        if (this.disposed) return;
        this.setHover(null);
        document.removeEventListener('pointermove', this.onMove);
        document.removeEventListener('pointerout', this.onLeave);
        document.removeEventListener('mousedown', this.onDown, true);
        document.removeEventListener('keydown', this.onValidatedKey);
        this.options.surface.style.cursor = this.cursor;
        this.pointer = null;
        this.disposed = true;
    }
}
