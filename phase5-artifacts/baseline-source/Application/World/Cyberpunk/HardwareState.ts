export type HardwareControlId = 'lamp' | 'pc';
export interface HardwareSnapshot { available: boolean; lampOn: boolean; pcLedsOn: boolean; }

/** Shared boolean controls only. No keys, text, telemetry or frame-by-frame React state. */
export default class HardwareState {
    private snapshot: HardwareSnapshot = {available: false, lampOn: true, pcLedsOn: true};
    private listeners = new Set<(state: HardwareSnapshot) => void>();
    private disposed = false;
    typingEnergy = 0;

    getSnapshot = () => this.snapshot;
    subscribe = (listener: (state: HardwareSnapshot) => void) => {
        if (this.disposed) return () => {};
        this.listeners.add(listener);
        return () => { this.listeners.delete(listener); };
    };
    private publish(update: Partial<HardwareSnapshot>) {
        if (this.disposed) return;
        if (Object.entries(update).every(([key, value]) => this.snapshot[key as keyof HardwareSnapshot] === value)) return;
        this.snapshot = {...this.snapshot, ...update};
        this.listeners.forEach(listener => listener(this.snapshot));
    }
    setAvailable(available: boolean) { this.publish({available}); }
    toggle(id: HardwareControlId) {
        if (!this.snapshot.available || this.disposed) return;
        if (id === 'lamp') this.publish({lampOn: !this.snapshot.lampOn});
        if (id === 'pc') this.publish({pcLedsOn: !this.snapshot.pcLedsOn});
    }
    pulseTyping() { if (!this.disposed && this.snapshot.available) this.typingEnergy = 1; }
    dispose() {
        if (this.disposed) return;
        this.publish({available: false});
        this.listeners.clear();
        this.typingEnergy = 0;
        this.disposed = true;
    }
}
