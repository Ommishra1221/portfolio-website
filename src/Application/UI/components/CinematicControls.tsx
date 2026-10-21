import React, { useEffect, useState } from 'react';
import eventBus from '../EventBus';

export default function CinematicControls() {
    const [active, setActive] = useState(false);
    useEffect(() => eventBus.on('cinematicState', (state: {active: boolean}) => setActive(state.active)), []);
    if (!active) return null;
    return <div className="cinematic-controls" onMouseDown={event => event.stopPropagation()}>
        <span role="status">Room introduction</span>
        <button type="button" onClick={() => eventBus.dispatch('skipCinematic', {})}>Skip intro</button>
        <button type="button" onClick={() => eventBus.dispatch('enterPortfolio', {})}>Open portfolio</button>
    </div>;
}
