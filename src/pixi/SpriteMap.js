import {TexCache, Texture, Sprite} from '../pixi/Aliases';
import { Rectangle } from 'pixi.js';

export default class SpriteMap {
    constructor() {
        this.textureMap = new Map();
    }

    loadTexture(key, sheet, x, y, w, h) {
        const tex = TexCache[sheet];
  
        const rec = new Rectangle(x, y, w, h);
        const newTex = new Texture(tex, rec);

        this.textureMap.set(key, {texture: newTex, frame:rec});
    }

    copyTexture(oldKey, newKey) {
        const tex = this.getTexture(oldKey);
        this.textureMap.set(newKey, {texture: tex.baseTexture, frame: tex.frame});
        return this.get(newKey);
    }


    getTexture(key) {
        const result =  this.textureMap.get(key);
        if(result === undefined) return undefined;

        const newTex = new Texture(result.texture, result.frame);
        return newTex;
    }

    get(key) {
        const newTex = this.getTexture(key);
        if(newTex === undefined) return undefined;

        return new Sprite(newTex);
    }

    getSprite(entity) {
        if(!entity.sprite) return undefined;

        const resultSprite = entity.sprite.ref || 
            this.get(entity.sprite.name);

        this.setSpriteProperties(resultSprite, entity.sprite);
        if(!entity.sprite.ref) entity.edit("sprite", {ref:resultSprite});

        return resultSprite;
    }

    getCircle(entity) {
        if(!entity.sprite) return undefined;

        const circleSprite = entity.sprite.circle || 
            this.get(`${entity.id}_circle`) || 
            this.copyTexture("circle", `${entity.id}_circle`);

        this.setCircleProperties(circleSprite, entity.sprite);
        if(!entity.sprite.circle) entity.edit("sprite", {circle:circleSprite});

        return circleSprite;
    }

    setSpriteProperties(rSprite, eSprite) {
        rSprite.x = eSprite.x;
        rSprite.y = eSprite.y;
        rSprite.texture = this.getTexture(eSprite.name);
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