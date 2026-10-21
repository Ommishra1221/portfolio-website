import './style.css';

import { prefersPortfolioEntry, showPortfolioEntry } from './Application/UI/PortfolioEntry';

let starting = false;
async function startRoom() {
    if (starting) return;
    starting = true;
    try {
        const { default: Application } = await import('./Application/Application');
        document.getElementById('ui')?.replaceChildren();
        new Application();

    } catch {
        starting = false;
        showPortfolioEntry(undefined, true);
    }
}
if (prefersPortfolioEntry(window.innerWidth, window.matchMedia('(pointer: coarse)').matches)) {
    showPortfolioEntry(startRoom);
} else {
    startRoom();
}
