import Scene from './Scene';
import TiledMap from '../tiled/TiledMap';

export default class MapLayer extends Scene {
    constructor(key, game) {
        super(key, game);
        this.affectedByCamera = true;
    } 

    init() {
        this.map = new TiledMap("dist/FourIslands.tmx", "fourislands");
        this.addChild(this.map);
    }
}