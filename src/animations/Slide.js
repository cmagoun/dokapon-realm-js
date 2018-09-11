import * as Vector from '../utils/vector';
//import * as Animate from './Animate';

//because this moves a sprite, this checks followers
class Slide {
    constructor(from, to, speed) {
        this.speed = speed;
        this.from = from;
        this.to = to;
        this.initialized = false;

        //this.followerPos = new Map();

        const vec = Vector.subtract(to)(from);
        this.direction = Vector.normalized(vec);
    }

    init(entity, cm, time) {
        // const pixiSprite = entity.sprite.ref;
        // pixiSprite.x = entity.sprite.x;
        // pixiSprite.y = entity.sprite.y;
        entity.edit("sprite", {x:this.from.x, y:this.from.y});
    }

    update(entity, cm, time) {
        this.transform(entity, cm);
    }

    transform(entity, cm) {
        // const pixiSprite = entity.sprite.ref;
        // pixiSprite.x += this.direction.x * this.speed;
        // pixiSprite.y += this.direction.y * this.speed;
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
        // const pixiSprite = entity.sprite.ref;
        // pixiSprite.x = this.to.x;
        // pixiSprite.y = this.to.y;

        cm.editComponentOf(entity.id, "sprite", {x:this.to.x, y:this.to.y});
    }
}

export default Slide;