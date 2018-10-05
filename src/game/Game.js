import {BaseGameManager} from '../ecs/GameManager';

import States from './GameStates';
import * as Entities from './Entities';
import * as Professions from './Professions';
import * as Components from './Components';
import * as Move from './Move';
import * as Character from './Character';

import MapLayer from '../scenes/MapLayer';
import PlayerLayer from '../scenes/PlayerLayer';
import ControlLayer from '../scenes/ControlLayer';
import MovePathsLayer from '../scenes/MovePathsLayer';

export default class Game extends BaseGameManager {
    constructor(scenario) {
        super();
        
        this.scenario = scenario;

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
                this.startTurn();
                break;
            case States.TAKING_TURN:
                this.takeTurn();
                break;

            case States.SHOW_MOVE:
                this.showMove();
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

    startTurn() {
        const player = this.currentPlayer();
        Character.startTurn(player);
        this.updateGameState(States.WAITING_FOR_INPUT);
        //dialog appears
    }

    calculateMove() { 
        const player = this.currentPlayer();  
        const moveroll = Move.roll(player);
        player.edit("turntaker", {moveroll});

        const space = player.pos;
        const movepaths = Move.findPaths(player.pos, moveroll, this.scenario.maps.get(space.map).spaces);
        player.edit("turntaker", {movepaths});

        
    }

    showMove() {
        const mapLayer = new MapLayer("map", this);
        const playerLayer = new PlayerLayer("player", this);
        const controlLayer = new ControlLayer("control", this);
        const moveLayer = new MovePathsLayer("move", this);

        this.service("mgr").setScreens([mapLayer, playerLayer, controlLayer, moveLayer]);
        this.updateGameState(States.TAKING_TURN);
    }

    moveSelected(path) {
        const player = this.currentPlayer();
        const end = path[path.length-1];
        
        

        const mapLayer = new MapLayer("map", this);
        const playerLayer = new PlayerLayer("player", this);
        const controlLayer = new ControlLayer("control", this);
        this.service("mgr").setScreens([mapLayer, playerLayer, controlLayer]);

        //rolled a 0, no need to animiate
        if(path.length === 1) {
            Character.changeSpace(player, end.id, this.scenario);
            this.updateGameState(States.TURN_DONE);
            return;
        }


        player.add(Components.cameraOn());

        this.animate(
            player.id, 
            player.animations.walkPath(path, this), 
            () => {
                player.remove("cameraon");
                Character.changeSpace(player, end.id, this.scenario);
                this.updateGameState(States.TURN_DONE);
            });
    }

    takeTurn() {
        //what goes here... for now we are just ending our turn
        //this.updateGameState(States.TURN_DONE);
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
        const c = this
            .entitiesWith("turntaker")
            .filter(e => e.turntaker.index === this.currentPlayerIndex)[0];

        return c;
    }

    isCurrent(player) {
        return this.currentPlayer().id === player.id;
    }

    isSharingSpace(entity) {
        const current = this.currentPlayer();
        if(current === undefined) return 0;

        const sharing = this.players()
            .filter(p => {
                if(!p.pos) return false;
                return p.pos.map === entity.pos.map && p.pos.id === entity.pos.id && p.id !== entity.id;
            });

        const sharingAndCurrent = sharing
            .filter(s => s.id === current.id)[0];

        return sharingAndCurrent
            ? 2
            : sharing.length > 0
                ? 1
                : 0;
            
    }

    players() {
        return this.cm
            .entitiesWith("tag")
            .filter(e => e.tag.value === "player");
    }

    setPlayers(players) {
        const activePlayers = players.filter(p => p.active);
        this.numPlayers = activePlayers.length;

        activePlayers.forEach((p, i) => {
            const player = Entities.player(p.name, p.profession, p.color, i, this.cm).read();
            const startingValues = Professions.startingValues[player.character.profession];

            player.add(Components.hits(startingValues.hits));
            player.add(Components.hasDice(startingValues.dice));
        });
        
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