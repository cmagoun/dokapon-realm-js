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

        this.turn = 0;
        this.currentPlayerIndex = 0;
        this.numPlayers = 0;
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
                this.updateGameState(States.START_ROUND);
                break;
            case States.START_ROUND:
                this.startRound();
                break;
            case States.START_TURN:
                //no op
                break;
            case States.TAKING_TURN:
                this.takeTurn();
                break;

            case States.TURN_DONE:
                this.turnDone();
                break;

            case States.ROUND_DONE:
                this.roundDone();
                break;
        }
    }

    //state mgmt  
    startRound() {
        this.turn++;
        this.currentPlayerIndex = 0;

        //do begin turn stuff, reset player stuff, etc.

        this.updateGameState(States.START_TURN);
    }

    takeTurn() {
        //what goes here... for now we are just ending our turn
        this.updateGameState(States.TURN_DONE);
    }

    turnDone() {
        //do end turn stuff
        this.currentPlayerIndex++;
        if(this.currentPlayerIndex > this.numPlayers - 1) {
            this.updateGameState(States.ROUND_DONE);
            return;
        }

        this.updateGameState(States.START_TURN);
    }

    roundDone() {
        //do end of round stuff
        this.updateGameState(States.START_ROUND);
    }


    updateGameState(newState, payload) {
        this.gameState = newState;
        document.dispatchEvent(
            new CustomEvent(
                "game_state_changed", 
                { "detail": { state: newState, payload } }
            ));
    }


    //system
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

    //helpers
    currentPlayer() {
        return this
            .entitiesWith("turntaker")
            .filter(e => e.turntaker.index === this.currentPlayerIndex)[0];
    }

    players() {
        return this.cm
            .entitiesWith("tag")
            .filter(e => e.tag.value === "player");
    }

    setPlayers(players) {
        const activePlayers = players.filter(p => p.active);
        this.numPlayers = activePlayers.length;   
        activePlayers.forEach(p => Entities.player(p.name, p.profession, p.color, p.index, this.cm));
        this.updateGameState(States.SCENARIO_START_SCREEN);
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