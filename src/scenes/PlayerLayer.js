import Scene from './Scene';

const DIRTY = true;
const INIT = true;

export default class PlayerLayer extends Scene {
    constructor(key, game) {
        super(key, game);
        this.affectedByCamera = true;
        this.camera = game.service("camera");
    } 

    init() {
        this.drawPlayers(INIT);
    }

    draw() {
        this.drawPlayers();
    }

    drawPlayers(init) {
        const cm = this.game.cm;
        const entities = cm.entitiesWith(["sprite", "tag"], DIRTY && !init)
            .filter(e => e.tag.value === "player");

        entities.forEach(e => {
            const circle = this.getCircle(e);
            const sprite = this.getSprite(e);
            
            if(e.isToBeDestroyed())  {
                this.removeChild(circle);
                this.removeChild(sprite);                
                return;
            }     

            this.addChild(circle);
            this.addChild(sprite);

<<<<<<< HEAD
            if(e.cameraon) this.camera.centerOn(sprite);
            
=======
            if(e.cameraon) {
                const camera = this.game.service("camera");
                camera.centerOn(sprite);
            }
>>>>>>> e2b1b66490ad834b7af9fc20eba3ae058cd9b086
        });
    }

    getSprite(entity) {
        if(!entity.sprite) return undefined;

        const resultSprite = entity.sprite.ref || 
            this.spriteMap.get(entity.sprite.name);

        this.setSpriteProperties(resultSprite, entity.sprite);
        if(!entity.sprite.ref) entity.edit("sprite", {ref:resultSprite});

        return resultSprite;
    }

    getCircle(entity) {
        if(!entity.sprite) return undefined;

        const circleSprite = entity.sprite.circle || 
            this.spriteMap.get(`${entity.id}_circle`) || 
            this.spriteMap.copyTexture("circle", `${entity.id}_circle`);

        this.setCircleProperties(circleSprite, entity.sprite);
        if(!entity.sprite.circle) entity.edit("sprite", {circle:circleSprite});

        return circleSprite;
    }

    setSpriteProperties(rSprite, eSprite) {
        rSprite.x = eSprite.x;
        rSprite.y = eSprite.y;
        rSprite.texture = this.spriteMap.getTexture(eSprite.name);
        rSprite.tint = eSprite.tint;
        rSprite.scale.x = eSprite.scale.x;
        rSprite.scale.y = eSprite.scale.y;
        rSprite.anchor.x = eSprite.anchor.x;
        rSprite.anchor.y = eSprite.anchor.y;
        //rSprite.rotation = eSprite.rotation;
    }

    setCircleProperties(circle, eSprite) {
        circle.x = eSprite.x;
        circle.y = eSprite.y + 8;
        circle.tint = eSprite.color;
        circle.scale.x = eSprite.scale.x;
        circle.scale.y = eSprite.scale.y;
        circle.anchor.x = eSprite.anchor.x;
        circle.anchor.y = eSprite.anchor.y;
    }
}