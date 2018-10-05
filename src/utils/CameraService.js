export const CAMERAMOVED = "cameramoved";

export default class CameraService {
    constructor() {
        this.origin = {x:0, y:0};
    }

    move(x, y) {
        this.origin = {x,y};
        document.dispatchEvent(new CustomEvent(
            CAMERAMOVED, 
            {"detail": {origin: this.origin}}
        ));
    }

    centerOn(obj) {
        const x = Math.floor(obj.x - (window.innerWidth/2));
        const y = Math.floor(obj.y - (window.innerHeight/2));
        this.move(x,y);
    }
}