import {BaseGameManager} from '../ecs/GameManager';
import PixiSceneManager from '../pixi/PixiSceneManager';
import SpriteMap from '../pixi/SpriteMap';
import States from './GameStates';
import * as Entities from './Entities';
import * as Character from './Character';
import { tileSize } from '../utils/constants';
import { centerInWindow, centerCameraOn } from '../utils/utils';

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

        //do begin round stuff, reset player stuff, etc.
        this.updateGameState(States.START_TURN);
    }

    takeTurn() {
        const pixiPos = Character.getPixiPos(this.currentPlayer(), this.scenario);
        const camera = centerCameraOn(pixiPos);
        this.sceneMgr.moveCamera(camera.x, camera.y);

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
        //do end of round stuff... for now, just move to the next round
        this.updateGameState(States.START_ROUND);
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



    updateGameState(newState, payload) {
        this.gameState = newState;
        document.dispatchEvent(
            new CustomEvent(
                "game_state_changed", 
                { "detail": { state: newState, payload } }
            ));
    }
}