import { Container } from "../pixi/Aliases";

export default class Scene {
    constructor(game) {
        this.game = game;
        this.spriteMap = game.spriteMap;
        this.mgr = game.sceneManager;
        this.initialized = false;
        this.initEachTime = false;
        this.container = new Container();
    }
}