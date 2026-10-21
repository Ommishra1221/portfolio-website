import React, { useEffect, useState } from 'react';
import GraphicsQuality, { QUALITY_PRESETS, QualityMode } from '../../Utils/GraphicsQuality';
import { resolveInnerSiteUrl } from '../../World/MonitorConfig';
import eventBus from '../EventBus';

export default function ExperienceSettings({quality, started}: {quality: GraphicsQuality; started: boolean}) {
    const [mode, setMode] = useState(quality.getSnapshot);
    const [status, setStatus] = useState('ready');
    useEffect(() => quality.subscribe(() => setMode(quality.getSnapshot())), [quality]);
    useEffect(() => eventBus.on('graphicsStatus', (state: {status: string}) => setStatus(state.status)), []);
    const url = resolveInnerSiteUrl(window.location.search);
    return <div className="experience-settings" onMouseDown={event => event.stopPropagation()}>
        {url && <a className="direct-portfolio" href={url}>Open portfolio directly</a>}
        <details>
            <summary tabIndex={0}>Experience options</summary>
            <label htmlFor="graphics-quality">Rendering quality</label>
            <select id="graphics-quality" aria-describedby="quality-description" value={mode}
                onChange={event => quality.setMode(event.target.value as QualityMode)}>
                {Object.entries(QUALITY_PRESETS).map(([value, preset]) => <option key={value} value={value}>{preset.label}</option>)}
            </select>
            <p id="quality-description">{QUALITY_PRESETS[mode].description}</p>
            <p>Quality changes apply to this visit. Portfolio screen resolution is unchanged.</p>
            {started && <div className="experience-actions">
                <button type="button" onClick={() => eventBus.dispatch('enterPortfolio', {})}>Focus portfolio monitor</button>
                <button type="button" onClick={() => eventBus.dispatch('returnToRoom', {})}>Return to room</button>
            </div>}
        </details>
        {status !== 'ready' && <div role="alert" className="graphics-recovery">
            <p>The 3D view is paused while graphics recover. You can still open the portfolio directly.</p>
            <button type="button" onClick={() => window.location.reload()}>Reload room</button>
        </div>}
    </div>;
}
