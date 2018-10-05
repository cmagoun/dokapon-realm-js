import Scene from './Scene';
import {tileSize} from '../utils/constants';
import * as Entities from '../game/Entities';
import { LCLICK } from '../utils/MouseService';

const DIRTY = true;

export default class MovePathsLayer extends Scene {
    constructor(key, game) {
        super(key, game);
        this.affectedByCamera = true;
        this.click = this.handleClick.bind(this);
        this.ends = [];
    } 

    init() {
        document.addEventListener(LCLICK, this.click);
        this.createMoveArrows();
    }

    teardown() {
        document.removeEventListener(LCLICK, this.click);
    }

    draw() {
        this.drawMoveArrows();
    }

    drawMoveArrows() {
        const cm = this.game.cm;
        const entities = cm.entitiesWith(["sprite", "tag"], DIRTY)
            .filter(e => e.tag.value === "movearrow");

        entities.forEach(e => {
            const sprite = this.getSprite(e);
            
            if(e.isToBeDestroyed())  {
                this.removeChild(sprite);                
                return;
            }     

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

    createMoveArrows() {
        const player = this.game.currentPlayer();
        const paths = player.turntaker.movepaths;

        paths.forEach(p => {
            const end = p[p.length-1];
            this.ends.push(end);
            const e = Entities.moveArrow(end.x * tileSize, (end.y-1) * tileSize, this.game.cm).read();
            this.game.animate(e.id, e.animations.bob(this.game));
        });
    }

    handleClick(evt) {
        const player = this.game.currentPlayer();
        const paths = player.turntaker.movepaths;
        const clicked = evt.detail.gamePos;

        const path = paths.filter(p => {
            const end = p[p.length-1];
            return end.x === clicked.x && end.y === clicked.y;
        })[0];

        if(path) {
            this.game
                .entitiesWith("tag")
                .filter(e => e.tag.value === "movearrow")
                .forEach(td => td.destroy());
                
            this.game.moveSelected(path);
        }
    }
}