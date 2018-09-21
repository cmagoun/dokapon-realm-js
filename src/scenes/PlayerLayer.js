import Scene from './Scene';

const DIRTY = true;

export default class PlayerLayer extends Scene {
    constructor(key, game) {
        super(key, game);
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
        const cm = this.game.cm;
        const entities = cm.entitiesWith("sprite", DIRTY);

        entities.forEach(e => {
            const sprite = this.spriteMap.getSprite(e, cm);
            const circle = this.spriteMap.getCircle(e, cm);

            if(e.isToBeDestroyed())  {
                this.removeChild(sprite);
                this.removeChild(circle);
                return;
            }     

            this.addChild(circle);
            this.addChild(sprite);
        });
    }
}