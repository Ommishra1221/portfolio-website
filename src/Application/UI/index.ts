import { createUI, createVolumeUI, disposeUI } from './App';
import Application from '../Application';

export default class UI {
    constructor() {
        createUI(new Application().world.hardware, new Application().quality);
        createVolumeUI();
    }
    dispose() { disposeUI(); }
}
