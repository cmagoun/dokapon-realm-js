import Scene from './Scene';

const DIRTY = true;

export default class PlayerLayer extends Scene {
    constructor(key, game) {
        super(key, game);
        this.onClick = this.handleClick.bind(this);
        this.clicks = 0;
        this.affectedByCamera = true;
    } 

    init() {
        document.addEventListener("click", this.onClick);
        this.drawEntities();
    }

    draw() {
        this.drawEntities();
    }

    drawEntities() {
        const entities = this.game.cm.entitiesWith("sprite", DIRTY);
        entities.forEach(e => {
            const sprite = this.spriteMap.getSprite(e, this.game.cm);
            
            if(e.isToBeDestroyed())  {this.removeChild(sprite); return;}     
            this.addChild(sprite);
        });
    }

    handleClick() {
        if(this.game.stopEvent) return;
        this.game.moveCamera(480, 480);
    }
}