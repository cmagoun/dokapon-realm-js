import Scene from './Scene';
import {sharedSpace} from '../utils/constants';

const DIRTY = true;
const INIT = true;
const NO_OFFSET = -1;

const offsets = [
    {x: -12, y: 0},
    {x: 12, y: 0},
    {x: 36, y: 0},
    {x: -12,  y: 24},
    {x: 12, y: 24},
    {x: 36, y: 24},
    {x: -12, y: -24},
    {x: 12, y: -32},
    {x: 36, y: -24},
    {x: -12,  y: 48},
    {x: 12, y: 56},
    {x: 36, y: 48},
];

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
        const game = this.game;
        const cm = game.cm;

        //I would like to return to only checking dirty entities..
        //but for now, I need to dynamically check the shared space status
        //of non-moving players, so no DIRTY
        const entities = cm.entitiesWith(["sprite", "tag"])//, DIRTY && !init)
            .filter(e => e.tag.value === "player");

        entities.forEach(e => {
            const sharing = game.isSharingSpace(e);

            const shareIndex = sharing && !game.isCurrent(e)
                ? sharing === sharedSpace.SHARING_WITH_CURRENT
                    ? e.turntaker.index + 6
                    : e.turntaker.index
                :  NO_OFFSET;

            const circle = this.getCircle(e, shareIndex);
            const sprite = this.getSprite(e, shareIndex);
            
            if(e.isToBeDestroyed())  {
                this.removeChild(circle);
                this.removeChild(sprite);                
                return;
            }     

            this.addChild(circle);
            this.addChild(sprite);

            if(e.cameraon) this.camera.centerOn(sprite);
            
        });
    }

    getSprite(entity, shareIndex) {
        if(!entity.sprite) return undefined;

        const resultSprite = entity.sprite.ref || 
            this.spriteMap.get(entity.sprite.name);

        this.setSpriteProperties(resultSprite, entity.sprite, shareIndex);
        if(!entity.sprite.ref) entity.edit("sprite", {ref:resultSprite});

        return resultSprite;
    }

    getCircle(entity, shareIndex) {
        if(!entity.sprite) return undefined;

        const circleSprite = entity.sprite.circle || 
            this.spriteMap.get(`${entity.id}_circle`) || 
            this.spriteMap.copyTexture("circle", `${entity.id}_circle`);

        this.setCircleProperties(circleSprite, entity.sprite, shareIndex);
        if(!entity.sprite.circle) entity.edit("sprite", {circle:circleSprite});

        return circleSprite;
    }

    setSpriteProperties(rSprite, eSprite, shareIndex) {
        const scaleMult = shareIndex === NO_OFFSET
            ? 1
            : 0.5;

        const offset = shareIndex === NO_OFFSET
            ? {x:0, y:0}
            : offsets[shareIndex];

        rSprite.x = eSprite.x + offset.x;
        rSprite.y = eSprite.y + offset.y;
        rSprite.texture = this.spriteMap.getTexture(eSprite.name);
        rSprite.tint = eSprite.tint;
        rSprite.scale.x = eSprite.scale.x * scaleMult;
        rSprite.scale.y = eSprite.scale.y * scaleMult;
        rSprite.anchor.x = eSprite.anchor.x;
        rSprite.anchor.y = eSprite.anchor.y;
        //rSprite.rotation = eSprite.rotation;
    }

    setCircleProperties(circle, eSprite, shareIndex) {
        const scaleMult = shareIndex === NOT_SHARING
            ? 1
            : 0.5;

        const offset = shareIndex === NOT_SHARING
            ? {x:0, y:0}
            : offsets[shareIndex];

        circle.x = eSprite.x + offset.x;
        circle.y = eSprite.y + 8 + offset.y;
        circle.tint = eSprite.color;
        circle.scale.x = eSprite.scale.x * scaleMult;
        circle.scale.y = eSprite.scale.y * scaleMult;
        circle.anchor.x = eSprite.anchor.x;
        circle.anchor.y = eSprite.anchor.y;
    }
}