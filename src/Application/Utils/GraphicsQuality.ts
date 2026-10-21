export type QualityMode = 'high' | 'balanced' | 'performance';
export const QUALITY_PRESETS = {
    high: {label: 'High', dpr: 2, shadow: 1024, overlay: true, description: 'Full room lighting and surface effects; up to 2× resolution.'},
    balanced: {label: 'Balanced', dpr: 1.5, shadow: 512, overlay: false, description: 'Lower resolution and shadow detail; no decorative overlay.'},
    performance: {label: 'Performance', dpr: 1, shadow: 0, overlay: false, description: 'Up to 1× CSS-pixel resolution, no real-time shadows or decorative overlay. Portfolio input stays available.'},
} as const;

/** Session-only, explicit user preference. No device ranking or automatic switching. */
export default class GraphicsQuality {
    private mode: QualityMode = 'high';
    private listeners = new Set<() => void>();
    getSnapshot = () => this.mode;
    subscribe = (listener: () => void) => {
        this.listeners.add(listener);
        return () => { this.listeners.delete(listener); };
    };
    setMode = (mode: string) => {
        if (!Object.prototype.hasOwnProperty.call(QUALITY_PRESETS, mode) || mode === this.mode) return;
        this.mode = mode as QualityMode;
        this.listeners.forEach(listener => listener());
    };
    dispose() { this.listeners.clear(); }
}
