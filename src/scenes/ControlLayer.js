import Scene from './Scene';
import { centerCameraOn } from '../utils/utils';

export default class ControlLayer extends Scene {
    constructor(key, game) {
        super(key, game);
        this.affectedByCamera = false;

        this.click = this.handleClick.bind(this);
    } 

    init() {
        document.addEventListener("contextmenu", this.click);
    }

    teardown() {
        document.removeEventListener("contextmenu", this.click);
    }

    handleClick(evt) {
        evt.preventDefault();
        const sceneMgr = this.game.sceneMgr;

        if(this.game.modal) return false;

        const gameCoords = {
            x: evt.screenX + sceneMgr.cameraOrigin.x,
            y: evt.screenY + sceneMgr.cameraOrigin.y
        }

        const newOrigin = centerCameraOn(gameCoords);
        sceneMgr.moveCamera(newOrigin.x, newOrigin.y);

        return false;
    }
}
