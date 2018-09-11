import Scene from './Scene';


export default class SceneOne extends Scene {
    constructor(key, game) {
        super(key, game);
        this.onClick = this.handleClick.bind(this);
        this.clicks = 0;
    } 

    init() {
        document.addEventListener("click", this.onClick);
        this.drawEntities();
    }

    draw() {
        this.container.removeChildren();
        this.drawEntities();
    }

    drawEntities() {
        const entities = this.game.entities();
        entities.forEach(e => {
            const sprite = this.spriteMap.getSprite(e, this.game.cm);
            this.container.addChild(sprite);
        });
    }

    handleClick() {
        if(this.game.stopEvent) return;

        const pally = this.game.entity("p1");
        pally.edit("sprite", {tint:0x44FF44});
    }
}