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

        const multiplier = this.clicks%2 === 0
            ? 1
            : -1;

        this.clicks++;

        const from = {x:pally.sprite.x, y:pally.sprite.y};
        const to = {x:pally.sprite.x + (96 * multiplier), y:pally.sprite.y};

        this.game.animate(pally.id, pally.animations.walk(from, to, this.game));

        const ranger = this.game.entity("r1");
        const f2 = {x:ranger.sprite.x, y:ranger.sprite.y};
        const t2 = {x:ranger.sprite.x + (96 * multiplier), y:ranger.sprite.y};

        this.game.animate(ranger.id, ranger.animations.walk(f2, t2, this.game));
    }
}