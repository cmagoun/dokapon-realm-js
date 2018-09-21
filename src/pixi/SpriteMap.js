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

}