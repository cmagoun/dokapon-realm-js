import Scene from './Scene';
import { centerCameraOn } from '../utils/utils';

export default class ControlLayer extends Scene {
    constructor(key, game) {
        super(key, game);
        this.diag = false;
        this.affectedByCamera = false;

        this.mousex = 0;
        this.mousey = 0;

        this.shift = {};
        this.gpos = {};

        this.click = this.handleRightClick.bind(this);
        this.mousemove = this.handleMouseMove.bind(this);
    } 

    init() {
        document.addEventListener("mousemove", this.mousemove);
        document.addEventListener("contextmenu", this.click);

        if(this.diag) {
            this.posLabel = this.spriteMap.text("TEST", {x:5, y:5}, {fill:0xffffff});
            this.addChild(this.posLabel);
        }
    }

    draw() {
        if(this.diag) {
            this.posLabel.text = `MOUSE:  x ${this.mousex}, y ${this.mousey}\n` + 
                                 `CAMERA: x ${this.mgr.cameraOrigin.x} y ${this.mgr.cameraOrigin.y}\n` +
                                 `SHIFT:  x ${this.shift.x}, y ${this.shift.y}\n` + 
                                 `GAME:   x ${this.gpos.x}, y ${this.gpos.y}`;
        }

    }


    teardown() {
        document.removeEventListener("contextmenu", this.click);
        document.removeEventListener("mousemove", this.mousemove);
    }

    handleMouseMove(evt) {
        this.mousex = evt.clientX;
        this.mousey = evt.clientY;

        this.shift = this.mgr.shiftedPosition(this.mousex, this.mousey);
        this.gpos = this.mgr.gamePosition(this.mousex, this.mousey);
    }

    handleRightClick(evt) {
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
