import Scene from './Scene';
import Walk from '../animations/Walk';

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
        this.drawPlayers();
    }

    draw() {
        this.drawPlayers();
    }

    drawPlayers() {
        const entities = this.game.cm.entitiesWith("sprite", DIRTY);
        entities.forEach(e => {
            //do I need this?
            if(e.sprite.x < 1 || e.sprite.y < 1) {this.removeChild(sprite); return;}

            const sprite = this.spriteMap.getSprite(e, this.game.cm);

            const circle = this.spriteMap.getCircle(e, this.game.cm);
            circle.x = sprite.x;
            circle.y = sprite.y + 8;
            circle.tint = e.sprite.color;
            
            if(e.isToBeDestroyed())  {this.removeChild(sprite); return;}     
            this.addChild(circle);
            this.addChild(sprite);
        });
    }

    handleClick() {
        if(this.game.modal) return;
        
        const p1 = this.game.entity("Player 1");
        const from = {x:p1.sprite.x, y:p1.sprite.y};
        const to = {x:from.x + 48, y:from.y};

        this.game.animate(p1.id, p1.animations.walk(from, to, this.game));
    }
}