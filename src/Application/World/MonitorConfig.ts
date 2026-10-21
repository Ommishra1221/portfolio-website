export interface MonitorRuntimeConfig {
    innerSiteUrl: string | null;
}

declare global {
    interface Window {
        portfolioRuntimeConfig?: MonitorRuntimeConfig;
    }
}

export const LOCAL_INNER_SITE_URL = 'http://localhost:3000/';

// Shared by the physical housing, CSS3D surface, compositor and focus framing.
export const CENTER_SCREEN = {
    width: 1920, height: 1080,
    position: [0, 950, 255] as [number, number, number],
    tilt: -3 * Math.PI / 180,
    padding: 32,
    compositorDepth: 96,
};

export const SIDE_SCREEN = { width: 1040, height: 650, offset: 1600, toeIn: 0.18 };

export function resolveInnerSiteUrl(search: string): string | null {
    if (new URLSearchParams(search).has('dev')) return LOCAL_INNER_SITE_URL;

    const configuredUrl = window.portfolioRuntimeConfig?.innerSiteUrl;
    if (!configuredUrl) return null;

    try {
        const url = new URL(configuredUrl);
        return url.protocol === 'https:' && !url.username && !url.password ? url.toString() : null;
    } catch {
        return null;
    }
}
