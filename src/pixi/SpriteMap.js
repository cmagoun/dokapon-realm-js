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

    getTexture(key) {
        const result =  this.textureMap.get(key);
        const newTex = new Texture(result.texture, result.frame);
        return newTex;
    }

    get(key) {
        const newTex = this.getTexture(key);
        return new Sprite(newTex);
    }

    getSprite(entity, compMgr) {
        let resultSprite;

        if(!entity.sprite) return undefined;

        if(!entity.sprite.ref) {
            resultSprite = this.get(entity.sprite.name);        
            this.setSpriteProperties(resultSprite, entity.sprite);
            
            compMgr.editComponentOf(entity.id, "sprite", {initialized:true, ref:resultSprite});
        } else {
            resultSprite = entity.sprite.ref;
            this.setSpriteProperties(resultSprite, entity.sprite);

            if(!entity.sprite.initialized) {
                compMgr.editComponentOf(entity.id, "sprite", {initialized:true, ref:resultSprite});
            }
        } 

        return resultSprite;
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
}