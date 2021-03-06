import * as Components from './Components';
import Walk from '../animations/Walk';
import Bob from '../animations/Bob';
import {tileSize} from '../utils/constants';
import * as Vector from '../utils/vector';

export const player = (name, profession, color, control, index, cm) => {
    return cm.createEntity(name)
        .add(Components.sprite(`${profession}1`, 0, 0, {color}))
        .add(Components.character(name, profession))
        .add(Components.turnTaker(control, index))
        .add(Components.tag("player"))
        .add(Components.animations({
            walk: (from, to, gm) => walk(from, to, gm)([`${profession}1`, `${profession}2`]),
            walkPath: (path, gm) => {
                const walks = [];
                path.forEach((from, i) => {
                    if(i === path.length-1) return;
                    walks.push(
                        walk(
                            Vector.multiply(from, tileSize), 
                            Vector.multiply(path[i+1], tileSize),
                            gm)([`${profession}1`, `${profession}2`]));
                });
                return walks;
            }
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
    frames, from, to, 6.0, gm.spriteMap
);