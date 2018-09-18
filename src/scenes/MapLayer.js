import Scene from './Scene';
import TiledMap from '../tiled/TiledMap';

export default class MapLayer extends Scene {
    constructor(key, game) {
        super(key, game);
        this.affectedByCamera = true;
    } 

    init() {
        const scen = this.game.scenario;
        this.map = scen.tiled.get(scen.startMap);
        this.addChild(this.map);
    }
}