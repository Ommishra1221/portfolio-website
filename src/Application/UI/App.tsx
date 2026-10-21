import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { MotionConfig } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import HelpPrompt from './components/HelpPrompt';
import InterfaceUI from './components/InterfaceUI';
import eventBus from './EventBus';
import './style.css';
import CinematicControls from './components/CinematicControls';
import HardwareControls from './components/HardwareControls';
import GraphicsQuality from '../Utils/GraphicsQuality';
import ExperienceSettings from './components/ExperienceSettings';
import HardwareState from '../World/Cyberpunk/HardwareState';

const App = ({hardware, quality}: {hardware: HardwareState; quality: GraphicsQuality}) => {
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
            <ExperienceSettings quality={quality} started={!loading} />
            <CinematicControls />
            <LoadingScreen />
        </div>
    );
};

const createUI = (hardware: HardwareState, quality: GraphicsQuality) => {
    ReactDOM.render(<MotionConfig reducedMotion="user"><App hardware={hardware} quality={quality} /></MotionConfig>, document.getElementById('ui'));
};

const createVolumeUI = () => {
    ReactDOM.render(<MotionConfig reducedMotion="user"><InterfaceUI /></MotionConfig>, document.getElementById('ui-interactive'));
};

const disposeUI = () => {
    ['ui', 'ui-interactive'].forEach(id => {
        const root = document.getElementById(id);
        if (root) ReactDOM.unmountComponentAtNode(root);
    });
};
export { createUI, createVolumeUI, disposeUI };
