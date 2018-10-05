import * as Vector from "./vector";

export const RCLICK = "right_click";
//export const MOUSEMOVE = "mouse_moved";

//for now just tracks the mouse position
export default class MouseService {
    constructor(camera, tilesize) {
        this.mousemove = this.handleMouseMove.bind(this);
        this.rclick = this.handleRightClick.bind(this);
        this.x = 0;
        this.y = 0;

        this.camera = camera;
        this.tilesize = tilesize || 48;

        this.RCLICK = "rclick";
    }

    init() {
        document.addEventListener("mousemove", this.mousemove);
        document.addEventListener("contextmenu", this.rclick);
    }

    teardown() {
        document.removeEventListener("mousemove", this.mousemove);
        document.removeEventListener("contextmenu", this.rclick);
    }

    pos() {
        return {x:this.x, y:this.y};
    }

    floorPos() {
        return Vector.subtract(Vector.multiply(this.gamePos(), this.tilesize))(this.camera.origin);
    }

    gamePos() {
        const origin = this.camera.origin;
        return {x: Math.floor((this.x+origin.x)/this.tilesize), y: Math.floor((this.y+origin.y)/this.tilesize)};
    }

    shiftPos() {
        const origin = this.camera.origin;
        return {x:this.x+origin.x, y:this.y+origin.y};
    }

    handleMouseMove(evt) {
        this.x = evt.clientX;
        this.y = evt.clientY;

        //do we need this event? or should we just get the mouse pos as needed?
        // document.dispatchEvent(new CustomEvent(
        //     MOUSEMOVE,
        //     {"detail": {
        //         pos: this.pos(),
        //         gamePos: this.gamePos(),
        //         shiftPos: this.shiftPos()
        //     }}
        // ));
    }

    handleRightClick(evt) {
        evt.preventDefault();
        document.dispatchEvent(new CustomEvent(
            RCLICK, 
            {"detail": {
                pos: this.pos(),
                gamePos: this.gamePos(),
                shiftPos: this.shiftPos()
            }}
        ));
    }
}