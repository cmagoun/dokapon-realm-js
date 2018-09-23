import spaces from './fourislands/FourIslandsMap';
import GameMap from '../game/GameMap';
import TiledMap from '../tiled/TiledMap';
import * as Character from '../game/Character';

const startPos = {
    whiteknight: {map:"fourislands", id:16},
    elf: {map:"fourislands", id:11},
    witchking: {map: "fourislands", id:6},
    berserker: {map: "fourislands", id:8}
}

const SET_SPRITE = true;

export default class FourIslandsScenario {
    constructor(loader) {
        this.name="fourislands"
        this.displayName="Four Islands";
        this.maps = new Map();
        this.tiled = new Map();

        this.loader = loader

        this.mapData = [
            {alias:"fourislands", path:"dist/FourIslands.tmx", spaces:spaces}
        ];

        this.startMap = "fourislands";

        this.introTitle = "The Story So Far";
        this.introText = `<p>This is the story of a young, strapping, adventurous, heroic lad named... Tim.
        Tim will likely die here, but that is ok, because I am just trying to fill out some text to see
        just how bad this looks on screen.</p>
        
        <p>Sincerely,</p>
        <p>The GM</p>`;
    }

    loadMaps() {
        this.mapData.forEach(md => {
            this.loader.add(md.alias, md.path);
            this.maps.set(md.alias,  new GameMap(md.alias, md.spaces));
        });
    }

    loadTiled() {
        this.mapData.forEach(md => {
            this.tiled.set(md.alias, new TiledMap(md.path, md.alias));
        });
    }


    setInitialGameState(game) {
        const players = game.players();
        players.forEach(p => {
            const pos = startPos[p.character.profession];
            Character.setPos(p, pos.map, pos.id, this, SET_SPRITE);
        });
    }
}