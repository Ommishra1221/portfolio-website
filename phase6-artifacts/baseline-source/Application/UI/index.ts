import { createUI, createVolumeUI } from './App';
import Application from '../Application';

export default class UI {
    constructor() {
        createUI(new Application().world.hardware);
        createVolumeUI();
    }
}
