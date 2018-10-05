import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Application, Loader} from './pixi/Aliases';
import Game from './game/Game';
import MapLayer from './scenes/MapLayer';
import PlayerLayer from './scenes/PlayerLayer';
import ControlLayer from './scenes/ControlLayer';
import FourIslandsScenario from './scenarios/FourIslandsScenario';
import States from './game/GameStates';
import TurnLoop from './ecs/TurnLoop';
import Main from './ui/Main';
import PixiSceneManager from './pixi/PixiSceneManager';
import SpriteMap from './pixi/SpriteMap';
import MouseService from './utils/MouseService';
import CameraService from './utils/CameraService';

const app = new Application();
app.renderer.resize(window.innerWidth*.99, window.innerHeight*.99);
document.body.appendChild(app.view);

Loader
    .add("creatures", "dist/creatures.png")
    .add("spaces", "dist/spaces.png")
    .add("regions", "dist/regions.png")
    .add("roads", "dist/roads.png")
    .add("redarrow", "dist/redarrow.png");

const scenario = new FourIslandsScenario(Loader);
scenario.loadMaps();

const sceneMgr = new PixiSceneManager(app);

const game = createGame();

Loader.load(setup);

function createGame() {
    const camera = new CameraService();
    const result = new Game(scenario);
    result.addService("pixi", app);
    result.addService("smap", new SpriteMap());
    result.addService("mgr", sceneMgr);
    result.addService("camera", camera);
    result.addService("mouse", new MouseService(camera, 48));
    return result;
}

function setup() {
    //must happen AFTER Loader.load
    scenario.loadTiled();

    setupSprites(game);

    const mapLayer = new MapLayer("map", game);
    const playerLayer = new PlayerLayer("player", game);
    const controlLayer = new ControlLayer("control", game);

    game.service("mgr").setScreens([mapLayer, playerLayer, controlLayer]);

    game.updateGameState(States.CHARACTER_SELECT);

    function gameLoop() {
        requestAnimationFrame(gameLoop);
        game.update();
        game.runAnimations();
        sceneMgr.draw();
        app.render(app.stage);
        
        game.cm.cleanUp();
        game.stopEvent = false;
    }

    requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", function() {
    app.renderer.resize(window.innerWidth*.99, window.innerHeight*.99);
});


ReactDOM.render(
    <TurnLoop ctx={game}>
        <Main/>
    </TurnLoop>, 
    document.getElementById('ui'));


function setupSprites(game) {
    const sm = game.service("smap");

    sm.loadTexture("whiteknight1", "dist/creatures.png", 48, 48, 48, 48);
    sm.loadTexture("whiteknight2","dist/creatures.png", 48, 96, 48, 48);
    sm.loadTexture("elf1", "dist/creatures.png", 96, 48, 48, 48);
    sm.loadTexture("elf2", "dist/creatures.png", 96, 96, 48, 48);
    sm.loadTexture("berserker1", "dist/creatures.png", 336, 48, 48, 48);
    sm.loadTexture("berserker2", "dist/creatures.png", 336, 96, 48, 48);
    sm.loadTexture("witchking1", "dist/creatures.png", 624, 48, 48, 48);
    sm.loadTexture("witchking2", "dist/creatures.png", 624, 96, 48, 48);
    sm.loadTexture("circle", "dist/creatures.png", 336, 1104, 48, 48);
    sm.loadTexture("redarrow", "dist/redarrow.png", 0, 0, 48, 48);
    sm.loadTexture("yellowsquare", "dist/regions.png", 96, 0, 48, 48 );
}



//start screen
//choose your character screen
//characters are chosen and initialized
//scenario dictates start pos
//map
//how to take turns
//ai?