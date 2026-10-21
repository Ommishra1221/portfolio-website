import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LoadingScreen from './components/LoadingScreen';
import HelpPrompt from './components/HelpPrompt';
import InterfaceUI from './components/InterfaceUI';
import eventBus from './EventBus';
import './style.css';
import HardwareControls from './components/HardwareControls';
import HardwareState from '../World/Cyberpunk/HardwareState';

const App = ({hardware}: {hardware: HardwareState}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        eventBus.on('loadingScreenDone', () => {
            setLoading(false);
        });
    }, []);

    return (
        <div id="ui-app">
            {!loading && <HelpPrompt />}
            {!loading && <HardwareControls hardware={hardware} />}
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
