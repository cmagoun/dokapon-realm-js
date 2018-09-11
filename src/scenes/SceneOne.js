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
        this.drawEntities();
    }

    drawEntities() {
        const entities = this.game.cm.entitiesWith("sprite", true);
        entities.forEach(e => {
            const sprite = this.spriteMap.getSprite(e, this.game.cm);
            
            if(e.isToBeDestroyed())  {this.container.removeChild(sprite); return;}     
            this.container.addChild(sprite);
        });
    }

    handleClick() {
        if(this.game.stopEvent) return;

        const pally = this.game.entity("p1");
        pally.destroy();
    }
}