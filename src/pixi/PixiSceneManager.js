import {tileSize} from '../utils/constants';

export default class PixiSceneManager {
    constructor(app) {
        this.app = app;
        this.screens = [];
        this.cameraOrigin = {x:0, y:0};
    }

    setScreens(screens) {
        this.app.stage.removeChildren();

        this.screens.forEach(x => {
            const incoming = screens.filter(s => s.key === x.key);
            if(!incoming && x.teardown) {
                x.teardown();
            }
        })

        this.screens = screens;
        screens.forEach(s => {
            if(!s.initialized) {
                if(s.init) s.init();
                if(!s.initEachTime) s.initialized = true;
            }
            this.app.stage.addChild(this.shiftedContainer(s, this.cameraOrigin));
        });
    }

    shiftedPosition(x, y) {
        return {x: x+this.cameraOrigin.x, y:y+this.cameraOrigin.y};
    }

    gamePosition(x, y) {
        const shift = this.shiftedPosition(x, y);
        return {x: Math.floor(shift.x/tileSize), y:Math.floor(shift.y/tileSize)};
    }

    moveCamera(x, y) {
        this.cameraOrigin = {x,y};

        this.app.stage.removeChildren();
        this.screens.forEach(s => {
            this.app.stage.addChild(this.shiftedContainer(s, this.cameraOrigin));
        });
    }

    draw() {
        this.screens.forEach(s => {
            if(s.draw) s.draw();
        })
    }

    shiftedContainer(scene, origin) {
        return scene.affectedByCamera
            ? Object.assign(scene.container, {x:-origin.x, y:-origin.y})
            : scene.container;
    }
}