import Frames from "./Frames";
import Slide from "./Slide";

export default class Walk {
    constructor(frames, from, to, speed, spriteMap) {
        this.spriteMap = spriteMap;
        this.frames = frames; //array of textures ?? or names?
        this.initialized = false;

        this.frames = new Frames(spriteMap, frames, 150, true);
        this.slide = new Slide(from, to, speed);

        this.spriteDir = this.slide.direction.x > 0
            ? "right"
            : this.slide.direction.x < 0
                ? "left"
                : "?";
    }

    init(entity, cm, time) {
        this.frames.init(entity, cm, time);
        this.slide.init(entity, cm, time);

        if(this.spriteDir === "right") {
            entity.sprite.ref.scale.x = -1;
            entity.sprite.ref.anchor.x = 1;
        }
        
        if(this.spriteDir === "left") {
            entity.sprite.ref.scale.x = 1;
            entity.sprite.ref.anchor.x = 0;
        }
    }

    update(entity, cm, time) {
        this.frames.update(entity, cm, time);
        this.slide.update(entity, cm, time);
    }

    done(entity, cm, time) {
        return this.slide.done(entity, cm, time);
    }

    complete(entity, cm) {
        this.frames.complete(entity, cm);
        this.slide.complete(entity, cm);
    }
}

