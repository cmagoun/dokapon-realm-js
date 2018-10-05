import { Container } from "../pixi/Aliases";

export default class Scene {
    constructor(key, game) {
        this.key = key;
        this.game = game;
        this.spriteMap = game.spriteMap;
        this.mgr = game.sceneMgr;
        this.initialized = false;
        this.initEachTime = false;
        this.container = new Container();
    }

    init() {}
    draw(game) {}
    teardown() {}

    addChild(child) {
        this.container.addChild(child);
    }

    removeChild(child) {
        this.container.removeChild(child);
    }
}