import {BaseGameManager} from '../ecs/GameManager';
import PixiSceneManager from '../pixi/PixiSceneManager';
import SpriteMap from '../pixi/SpriteMap';
import States from './GameStates';
import * as Components from './Components';
import * as Entities from './Entities';
import {tileSize} from '../utils/constants';

export default class Game extends BaseGameManager {
    constructor(app, scenario) {
        super();
        this.app = app;
        this.scenario = scenario;
        this.spriteMap = new SpriteMap();
        this.sceneMgr = new PixiSceneManager(app);
        this.modal = false;
    }

    update() {
        if(this.cm.isDirty()) document.dispatchEvent(new CustomEvent("ecs_updated"));

        switch(this.gameState) {
            case States.CHARACTER_SELECT:
                //no op
                break;
            case States.SCENARIO_START_SCREEN:
                //no op
                break;
            case States.START_GAME:
                this.scenario.setInitialGameState(this);
                this.updateGameState(States.START_TURN);
                break;
        }
    }

    draw() {
        this.sceneMgr.draw();
    }

    moveCamera(x, y) {
        this.sceneMgr.moveCamera(x,y);
    }

    startModal() {
        this.modal = true;
    }

    endModal() {
        this.modal = false;
    }

    updateGameState(newState, payload) {
        this.gameState = newState;
        document.dispatchEvent(
            new CustomEvent(
                "game_state_changed", 
                { "detail": { state: newState, payload } }
            ));
    }

    setPlayers(players) {
        players.filter(p => p.active).forEach(p => Entities.player(p.name, p.profession, p.tint, this.cm));
        this.updateGameState(States.SCENARIO_START_SCREEN);
    }

    //helpers
    players() {
        return this.cm
            .entitiesWith("tag")
            .filter(e => e.tag.value === "player");
    }

    //needs to be generalized
    setPlayerPos(entity, mapName, spaceId, setSpritePos) {
        if(!entity.pos) {
            entity.add(Components.pos(mapName, spaceId));
        } else {
            entity.edit("pos", {mapName, spaceId});
        }

        if(!setSpritePos) return;
        
        const map = this.scenario.maps.get(mapName);
        const pos = map.getPosition(spaceId);

        if(!entity.sprite) {
            entity.add(Components.sprite(`${entity.profession.value}1`, pos.x * tileSize, pos.y * tileSize));
        } else {
            entity.edit("sprite", {name:`${entity.profession.value}1`, x:pos.x * tileSize, y:pos.y * tileSize});
        }
    }
}