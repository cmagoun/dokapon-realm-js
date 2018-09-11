import Scene from './Scene';
import Walk from '../animations/Walk';

export default class SceneOne extends Scene {
    constructor(game) {
        super(game);
        this.onClick = this.handleClick.bind(this);
        this.clicks = 0;
    } 

    init() {
        document.addEventListener("click", this.onClick);

        const entities = this.game.entities();
        entities.forEach(e => {
            const sprite = this.spriteMap.getSprite(e, this.game.cm);
            this.container.addChild(sprite);
        });
    }

    handleClick() {
        if(this.game.stopEvent) return;

        const pally = this.game.entity("p1");
        pally.sprite.ref.tint = 0xff8888;
    }
}