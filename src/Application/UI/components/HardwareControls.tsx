import React, { useEffect, useState } from 'react';
import HardwareState from '../../World/Cyberpunk/HardwareState';

export default function HardwareControls({hardware}: {hardware: HardwareState}) {
    const [state, setState] = useState(hardware.getSnapshot);
    useEffect(() => {
        setState(hardware.getSnapshot());
        return hardware.subscribe(setState);
    }, [hardware]);
    if (!state.available) return null;
    return (
        <details className="room-controls" onMouseDown={event => event.stopPropagation()}>
            <summary tabIndex={0}>Room controls</summary>
            <div role="group" aria-label="Room hardware controls">
                <button type="button" aria-pressed={state.lampOn} onClick={() => hardware.toggle('lamp')}>
                    Desk lamp: {state.lampOn ? 'On' : 'Off'}
                </button>
                <button type="button" aria-pressed={state.pcLedsOn} onClick={() => hardware.toggle('pc')}>
                    PC accent LEDs: {state.pcLedsOn ? 'On' : 'Off'}
                </button>
                <p>The lamp base and PC front control also respond to clicks. PC LEDs are decorative.</p>
            </div>
        </details>
    );
}
