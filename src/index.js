import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Application, Loader} from './pixi/Aliases';
import Game from './game/Game';
import TurnLoop from './ecs/TurnLoop';
import * as Entities from './game/Entities';
import Arrows from './ui/Arrows';

import MapLayer from './scenes/MapLayer';

const app = new Application();
app.renderer.resize(window.innerWidth*.99, window.innerHeight*.99);
document.body.appendChild(app.view);

const game = new Game(app);
Entities.paladin("p1", 24, 24, game.cm);
Entities.ranger("r1", 48, 48, game.cm);

Loader
    .add("creatures", "dist/creatures.png")
    .add("spaces", "dist/spaces.png")
    .add("regions", "dist/regions.png")
    .add("roads", "dist/roads.png")
    .add("fourislands", "dist/FourIslands.tmx")
    .load(setup);

function setup() {
    setupSprites(game);

    const mapLayer = new MapLayer(game);
    game.sceneMgr.setScreens([mapLayer]);

    function gameLoop() {
        requestAnimationFrame(gameLoop);
        game.update();
        game.app.render(game.app.stage);
        game.runAnimations();
        game.stopEvent = false;
    }

    requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", function() {
    app.renderer.resize(window.innerWidth*.99, window.innerHeight*.99);
});

ReactDOM.render(
    <TurnLoop ctx={game}>
        <Arrows/>
    </TurnLoop>, 
    document.getElementById('ui'));

function setupSprites(game) {
    game.spriteMap.loadTexture("paladin1", "dist/creatures.png", 24, 24, 24, 24);
    game.spriteMap.loadTexture("paladin2","dist/creatures.png", 24, 48, 24, 24);
    game.spriteMap.loadTexture("ranger1", "dist/creatures.png", 48, 24, 24, 24);
    game.spriteMap.loadTexture("ranger2", "dist/creatures.png", 48, 48, 24, 24);
}

