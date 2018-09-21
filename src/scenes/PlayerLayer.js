import Scene from './Scene';

const DIRTY = true;

export default class PlayerLayer extends Scene {
    constructor(key, game) {
        super(key, game);
        this.affectedByCamera = true;
    } 

    init() {
        document.addEventListener("click", this.onClick);
        this.drawPlayers();
    }

    draw() {
        this.drawPlayers();
    }

    drawPlayers() {
        const cm = this.game.cm;
        const entities = cm.entitiesWith("sprite", DIRTY);

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