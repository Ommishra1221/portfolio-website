import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LoadingScreen from './components/LoadingScreen';
import HelpPrompt from './components/HelpPrompt';
import InterfaceUI from './components/InterfaceUI';
import eventBus from './EventBus';
import './style.css';
import CinematicControls from './components/CinematicControls';
import HardwareControls from './components/HardwareControls';
import HardwareState from '../World/Cyberpunk/HardwareState';

const App = ({hardware}: {hardware: HardwareState}) => {
    const [loading, setLoading] = useState(true);
    const [intro, setIntro] = useState(false);
    const [inMonitor, setInMonitor] = useState(false);
    useEffect(() => {
        const enter = eventBus.on('enterMonitor', () => setInMonitor(true));
        const leave = eventBus.on('leftMonitor', () => setInMonitor(false));
        return () => { enter(); leave(); };
    }, []);
    useEffect(() => eventBus.on('cinematicState', (state: {active: boolean}) => setIntro(state.active)), []);

    useEffect(() => {
        return eventBus.on('loadingScreenDone', () => {
            setLoading(false);
        });
    }, []);

    return (
        <div id="ui-app">
            {!loading && !intro && !inMonitor && <HelpPrompt />}
            {!loading && <HardwareControls hardware={hardware} />}
            <CinematicControls />
            <LoadingScreen />
        </div>
    );
};

const createUI = (hardware: HardwareState) => {
    ReactDOM.render(<App hardware={hardware} />, document.getElementById('ui'));
};

const createVolumeUI = () => {
    ReactDOM.render(<InterfaceUI />, document.getElementById('ui-interactive'));
};

export { createUI, createVolumeUI };
