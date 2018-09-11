import Scene from './Scene';
import TiledMap from '../tiled/TiledMap';

export default class MapLayer extends Scene {
    constructor(game) {
        super(game);
    } 

    init() {
        this.map = new TiledMap("dist/FourIslands.tmx", "fourislands");
        this.container.addChild(this.map);
    }
}