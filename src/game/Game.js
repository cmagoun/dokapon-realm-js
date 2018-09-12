import {BaseGameManager} from '../ecs/GameManager';
import PixiSceneManager from '../pixi/PixiSceneManager';
import SpriteMap from '../pixi/SpriteMap';

export default class Game extends BaseGameManager {
    constructor(app, scenario) {
        super();
        this.app = app;
        this.scenario = scenario;
        this.spriteMap = new SpriteMap();
        this.sceneMgr = new PixiSceneManager(app);
        this.stopEvent = false;
    }

    update() {
        if(this.cm.isDirty()) document.dispatchEvent(new CustomEvent("ecs_updated"));
    }

    draw() {
        this.sceneMgr.draw();
    }

    moveCamera(x, y) {
        this.sceneMgr.moveCamera(x,y);
    }

    updateGameState(newState, payload) {
        this.gameState = newState;
        document.dispatchEvent(
            new CustomEvent(
                "game_state_changed", 
                { "detail": { state: newState, payload } }
            ));
    }
}