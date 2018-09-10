import Scene from './Scene';

export default class SceneTwo extends Scene {
    constructor(game) {
        super(game);
    }

    init() {
        for(let x = 0; x < 20; x++) {
            for(let y = 0; y < 20; y++) {
                const sprite = this.spriteMap.get("floor_grey");
                sprite.x = x * 24;
                sprite.y = y * 24;
                this.container.addChild(sprite);
            }
        }
    }
}