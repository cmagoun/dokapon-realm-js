import spaces from './fourislands/FourIslandsMap';
import GameMap from '../game/GameMap';

const startPos = {
    paladin: {map:"fourislands", id:16},
    ranger: {map:"fourislands", id:11}
}

const SET_SPRITE = true;

export default class FourIslandsScenario {
    constructor(loader) {
        this.name="fourislands"
        this.displayName="Four Islands";
        this.maps = new Map();
        this.loader = loader

        this.introText = `<p>This is the story of a young, strapping, adventurous, heroic lad named... Tim.
        Tim will likely die here, but that is ok, because I am just trying to fill out some text to see
        just how bad this looks on screen.</p>
        
        <p>Sincerely,</p>
        <p>The GM</p>`
    }

    init() {
        this.loadResources();
        this.loadmaps();
        //this.loadmonsters();
        //this.loaditems();
        //this.loadencounters();
    }

    loadResources() {
        this.loader.add("fourislands", "dist/FourIslands.tmx");
    }

    loadmaps() {
        this.maps.set("fourislands",  new GameMap("fourislands", spaces));
    }

    setInitialGameState(game) {
        const players = game.players();
        players.forEach(p => {
            const pos = startPos[p.profession.value];
            game.setPlayerPos(p, pos.map, pos.id, SET_SPRITE);
        });
    }
}