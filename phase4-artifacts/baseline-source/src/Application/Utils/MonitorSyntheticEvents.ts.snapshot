export function dispatchSyntheticMonitorKey(key: string) {
    if (typeof key !== 'string' || !key.length || key.length > 64 || /[\u0000-\u001f\u007f]/.test(key)) return;
    const iframe = document.getElementById(
        'computer-screen'
    ) as HTMLIFrameElement | null;
    if (!iframe) return;

    const event = new CustomEvent('keydown', {
        bubbles: true,
        cancelable: false,
    });
    Object.assign(event, { inComputer: true, key });
    iframe.dispatchEvent(event);
}
