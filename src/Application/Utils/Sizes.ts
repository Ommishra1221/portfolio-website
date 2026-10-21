import EventEmitter from './EventEmitter';

export default class Sizes extends EventEmitter {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = window.devicePixelRatio || 1;
    private media?: MediaQueryList;
    private disposed = false;
    private changed = () => {
        if (this.disposed) return;
        this.width = window.innerWidth; this.height = window.innerHeight;
        this.pixelRatio = window.devicePixelRatio || 1;
        this.watchScale();
        this.trigger('resize');
    };
    constructor() {
        super();
        window.addEventListener('resize', this.changed);
        this.watchScale();
    }
    private watchScale() {
        this.media?.removeEventListener?.('change', this.changed);
        this.media = window.matchMedia('(resolution: ' + this.pixelRatio + 'dppx)');
        this.media.addEventListener?.('change', this.changed);
    }
    dispose() {
        if (this.disposed) return;
        this.disposed = true;
        window.removeEventListener('resize', this.changed);
        this.media?.removeEventListener?.('change', this.changed);
        this.off('resize');
    }
}
