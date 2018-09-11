export default class PixiSceneManager {
    constructor(app) {
        this.app = app;
        this.screens = [];
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
            this.app.stage.addChild(s.container);
        });
    }

    draw() {
        this.screens.forEach(s => {
            if(s.draw) s.draw();
        })
    }
}