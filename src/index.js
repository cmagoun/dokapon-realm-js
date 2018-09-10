import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Application, Loader} from './pixi/Aliases';
import Game from './game/Game';
import TurnLoop from './ecs/TurnLoop';
import Main from './ui/Main';
import * as Entities from './game/Entities';
import SceneOne from './scenes/SceneOne';
import SceneTwo from './scenes/SceneTwo';
import Arrows from './ui/Arrows';

const app = new Application();
app.renderer.resize(window.innerWidth*.99, window.innerHeight*.99);
document.body.appendChild(app.view);

const game = new Game(app);
Entities.paladin("p1", 24, 24, game.cm);
Entities.ranger("r1", 48, 48, game.cm);

Loader
    .add("creatures", "dist/creatures.png")
    .add("world", "dist/world.png")
    .load(setup);

function setup() {
    game.spriteMap.loadTexture("paladin1", "dist/creatures.png", 24, 24, 24, 24);
    game.spriteMap.loadTexture("paladin2","dist/creatures.png", 24, 48, 24, 24);
    game.spriteMap.loadTexture("ranger1", "dist/creatures.png", 48, 24, 24, 24);
    game.spriteMap.loadTexture("ranger2", "dist/creatures.png", 48, 48, 24, 24);
    game.spriteMap.loadTexture("wall2_x", "dist/world.png", 24, 48, 24, 24);
    game.spriteMap.loadTexture("wall2_ul", "dist/world.png", 408, 48, 24, 24);
    game.spriteMap.loadTexture("wall2_ur", "dist/world.png", 432, 48, 24, 24);
    game.spriteMap.loadTexture("wall2_ll", "dist/world.png", 456, 48, 24, 24);
    game.spriteMap.loadTexture("wall2_lr", "dist/world.png", 480, 48, 24, 24);
    game.spriteMap.loadTexture("wall2_v", "dist/world.png", 360, 48, 24, 24);
    game.spriteMap.loadTexture("wall2_h", "dist/world.png", 288, 48, 24, 24);
    game.spriteMap.loadTexture("floor_check_big", "dist/world.png", 120, 48, 24, 24);
    game.spriteMap.loadTexture("floor_check_small", "dist/world.png", 96, 48, 24, 24);
    game.spriteMap.loadTexture("floor_grey", "dist/world.png", 168, 48, 24, 24);

    const playerLayer = new SceneOne(game);
    const floorLayer = new SceneTwo(game);
    game.sceneMgr.setScreens([floorLayer, playerLayer]);

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

