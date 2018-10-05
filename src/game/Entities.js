import * as Components from './Components';
import Walk from '../animations/Walk';
import Bob from '../animations/Bob';

export const player = (name, profession, color, index, cm) => {
    return cm.createEntity(name)
        .add(Components.sprite(`${profession}1`, 0, 0, {color}))
        .add(Components.character(name, profession))
        .add(Components.turnTaker(index))
        .add(Components.tag("player"))
        .add(Components.animations({
            walk: (from, to, gm) => walk(from, to, gm)([`${profession}1`, `${profession}2`])
        }));
};

export const moveArrow = (x, y, cm) => {
    return cm.createEntity(`arrow_${x}_${y}`)
        .add(Components.sprite("redarrow", x, y))
        .add(Components.tag("movearrow"))
        .add(Components.animations({
            bob: (gm) => new Bob({x,y}, {x, y:y+24}, 2, gm)
        }))
}

const walk = (from, to, gm) => (frames) => new Walk(
    frames, from, to, 2.0, gm.spriteMap
);