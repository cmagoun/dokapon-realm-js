import * as Vector from '../utils/vector';

class Slide {
    constructor(from, to, speed) {
        this.speed = speed;
        this.from = from;
        this.to = to;
        this.initialized = false;

        const vec = Vector.subtract(to)(from);
        this.direction = Vector.normalized(vec);
    }

    init(entity, cm, time) {
        entity.edit("sprite", {x:this.from.x, y:this.from.y});
    }

    update(entity, cm, time) {
        this.transform(entity, cm);
    }

    transform(entity, cm) {
        const x = entity.sprite.x += this.direction.x * this.speed;
        const y = entity.sprite.y += this.direction.y * this.speed;
        entity.edit("sprite", {x, y});
    }

    done(entity, cm, time) {
        const sprite = entity.sprite;
        const draw = {x:sprite.x, y:sprite.y};

        const dist = Vector.subtract(draw)(this.to);
        return Vector.magSqr(dist) < 2; //figure out whether we are using px or spaces
    }

    complete(entity, cm) {
        cm.editComponentOf(entity.id, "sprite", {x:this.to.x, y:this.to.y});
    }
}

export default Slide;