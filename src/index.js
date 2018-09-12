import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Application, Loader} from './pixi/Aliases';
import Game from './game/Game';
import MapLayer from './scenes/MapLayer';
import PlayerLayer from './scenes/PlayerLayer';
import FourIslandsScenario from './scenarios/FourIslandsScenario';
import States from './game/GameStates';
import TurnLoop from './ecs/TurnLoop';
import Main from './ui/Main';


const app = new Application();
app.renderer.resize(window.innerWidth*.99, window.innerHeight*.99);
document.body.appendChild(app.view);

Loader
    .add("creatures", "dist/creatures.png")
    .add("spaces", "dist/spaces.png")
    .add("regions", "dist/regions.png")
    .add("roads", "dist/roads.png");

const scenario = new FourIslandsScenario(Loader);
scenario.init();

const game = new Game(app, scenario);

Loader.load(setup);

function setup() {
    setupSprites(game);

    const mapLayer = new MapLayer("map", game);
    const playerLayer = new PlayerLayer("player", game);
    game.sceneMgr.setScreens([mapLayer, playerLayer]);

    game.updateGameState(States.SCENARIO_START_SCREEN);

    function gameLoop() {
        requestAnimationFrame(gameLoop);
        game.update();
        game.runAnimations();
        game.draw();
        game.app.render(game.app.stage);
        
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
    game.spriteMap.loadTexture("paladin1", "dist/creatures.png", 48, 48, 48, 48);
    game.spriteMap.loadTexture("paladin2","dist/creatures.png", 48, 96, 48, 48);
    game.spriteMap.loadTexture("ranger1", "dist/creatures.png", 96, 48, 48, 48);
    game.spriteMap.loadTexture("ranger2", "dist/creatures.png", 96, 96, 48, 48);
}



//start screen
//choose your character screen
//characters are chosen and initialized
//scenario dictates start pos
//map
//how to take turns
//ai?