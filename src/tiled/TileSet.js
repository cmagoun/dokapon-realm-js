import * as PIXI from 'pixi.js';
export default class TileSet {
    constructor(route, tileSet) {
        Object.assign(this, tileSet);

        this.baseTexture = PIXI.Texture.fromImage(route + '/' + tileSet.image.source, false, PIXI.SCALE_MODES.NEAREST);
        
        this.textures = [];

        for (let y = this.margin; y < this.image.height; y += this.tileHeight + this.spacing) {
            for (let x = this.margin; x < this.image.width; x += this.tileWidth + this.spacing) {
                if(x + this.tileWidth <= this.image.width &&
                    y + this.tileHeight <= this.image.height)
                    this.textures.push(new PIXI.Texture(this.baseTexture, new PIXI.Rectangle(x, y, this.tileWidth, this.tileHeight)));
            }
        }
    }
}