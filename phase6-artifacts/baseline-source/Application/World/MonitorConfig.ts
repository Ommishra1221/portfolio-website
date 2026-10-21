export interface MonitorRuntimeConfig {
    innerSiteUrl: string | null;
}

declare global {
    interface Window {
        portfolioRuntimeConfig?: MonitorRuntimeConfig;
    }
}

export const LOCAL_INNER_SITE_URL = 'http://localhost:3000/';

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
