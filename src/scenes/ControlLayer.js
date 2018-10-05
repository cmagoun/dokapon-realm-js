import Scene from './Scene';
import {RCLICK} from '../utils/MouseService';

export default class ControlLayer extends Scene {
    constructor(key, game) {
        super(key, game);
        this.diag = true;
        this.affectedByCamera = false;

        this.mouse = game.service("mouse");
        this.camera = game.service("camera");

        this.click = this.handleRightClick.bind(this);

        this.cursor = {};
    } 

    init() {
        document.addEventListener(RCLICK, this.click);

        this.cursor = this.spriteMap.get("yellowsquare");
        this.cursor.alpha = 0.4;
        this.addChild(this.cursor);

        if(this.diag) {
            this.posLabel = this.spriteMap.text("TEST", {x:5, y:5}, {fill:0xffffff});
            this.addChild(this.posLabel);
        }
    }

    draw() {
        const cursorPos = this.mouse.floorPos();
        this.cursor.x = cursorPos.x;
        this.cursor.y = cursorPos.y;

        if(this.diag) {
            const pos = this.mouse.pos();
            const gpos = this.mouse.gamePos();
            const origin = this.camera.origin;

            this.posLabel.text = `MOUSE:  x ${pos.x}, y ${pos.y}\n` + 
                                 `CURSR:  x ${cursorPos.x}, y ${cursorPos.y}\n` +
                                 `CAMERA: x ${origin.x} y ${origin.y}\n` +
                                 `GAME:   x ${gpos.x}, y ${gpos.y}`;
        }

    }


    teardown() {
        document.removeEventListener("contextmenu", this.click);
    }

    handleRightClick(evt) {
        if(this.game.modal) return false;
        this.camera.centerOn(evt.detail.shiftPos);
        return false;
    }
}
