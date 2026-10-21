import UIEventBus from '../UI/EventBus';
import EventEmitter from './EventEmitter';

export default class Time extends EventEmitter {
    start = Date.now();
    current = this.start;
    elapsed = 0;
    delta = 16;
    private frame: number | null = null;
    private reasons = new Set<string>();
    private pausedAt = 0;
    private disposed = false;
    private unsubscribe: () => void;
    private visibility = () => this.setPaused('visibility', document.hidden);
    constructor() {
        super();
        this.unsubscribe = UIEventBus.on('loadingScreenDone', () => {
            this.start = Date.now(); this.elapsed = 0;
            if (this.reasons.size) this.pausedAt = this.start;
        });
        document.addEventListener('visibilitychange', this.visibility);
        this.visibility();
        this.schedule();
    }
    get paused() { return this.reasons.size > 0; }
    private schedule() {
        if (!this.disposed && !this.reasons.size && this.frame === null) this.frame = window.requestAnimationFrame(() => this.tick());
    }
    setPaused(reason: string, paused: boolean) {
        if (this.disposed) return;
        const wasPaused = this.reasons.size > 0;
        if (paused) this.reasons.add(reason); else this.reasons.delete(reason);
        if (!wasPaused && this.reasons.size) {
            this.pausedAt = Date.now();
            if (this.frame !== null) window.cancelAnimationFrame(this.frame);
            this.frame = null;
            this.trigger('pause');
        } else if (wasPaused && !this.reasons.size) {
            const now = Date.now();
            this.start += now - this.pausedAt;
            this.current = now;
            this.delta = 16;
            this.trigger('resume');
            this.schedule();
        }
    }
    tick() {
        this.frame = null;
        if (this.disposed || this.reasons.size) return;
        const now = Date.now();
        this.delta = Math.min(Math.max(now - this.current, 0), 100);
        this.current = now;
        this.elapsed = now - this.start;
        this.trigger('tick');
        this.schedule();
    }
    dispose() {
        if (this.disposed) return;
        this.disposed = true;
        if (this.frame !== null) window.cancelAnimationFrame(this.frame);
        this.frame = null;
        document.removeEventListener('visibilitychange', this.visibility);
        this.unsubscribe();
        this.off('tick'); this.off('pause'); this.off('resume');
    }
}
