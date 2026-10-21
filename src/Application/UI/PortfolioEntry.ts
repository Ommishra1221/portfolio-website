import { resolveInnerSiteUrl } from '../World/MonitorConfig';
import identity from './portfolioIdentity';

export function prefersPortfolioEntry(width: number, coarsePointer: boolean) {
    return width < 768 || (width <= 1024 && coarsePointer);
}

/** Lightweight entry/recovery view, intentionally independent of React/Three.js. */
export function showPortfolioEntry(explore?: () => void, failed = false) {
    const root = document.getElementById('ui');
    if (!root) return;
    root.replaceChildren();
    root.style.pointerEvents = 'auto';
    const main = document.createElement('main');
    main.className = 'portfolio-entry';
    const title = document.createElement('h1'); title.textContent = identity.displayName;
    const role = document.createElement('p'); role.textContent = identity.roleTitle;
    const message = document.createElement('p');
    message.textContent = failed ? 'The 3D room could not start. You can open the portfolio directly or reload to try again.' : 'Open the portfolio directly, or explore the interactive 3D developer room.';
    if (failed) message.setAttribute('role', 'alert');
    main.append(title, role, message);
    const url = resolveInnerSiteUrl(window.location.search);
    if (url) {
        const link = document.createElement('a'); link.href = url; link.textContent = 'Open portfolio';
        main.append(link);
    } else {
        const notice = document.createElement('p'); notice.textContent = 'The portfolio address has not been configured. Please try again later.';
        main.append(notice);
    }
    const button = document.createElement('button'); button.type = 'button';
    button.textContent = explore ? 'Explore 3D room' : 'Reload';
    button.addEventListener('click', () => {
        if (explore) { button.disabled = true; explore(); }
        else window.location.reload();
    });
    main.append(button);
    root.append(main);
}
