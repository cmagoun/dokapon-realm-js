import * as Components from './Components';
import Walk from '../animations/Walk';

export const player = (name, profession, cm) => {
    return cm.createEntity(name)
        .add(Components.sprite(`${profession}1`, 0, 0))
        .add(Components.tag("player"))
        .add(Components.profession(profession))
        .add(Components.animations({
            walk: (from, to, gm) => walk(from, to, gm)([`${profession}1`, `${profession}2`])
        }));
};

const walk = (from, to, gm) => (frames) => new Walk(
    frames, from, to, 2.0, gm.spriteMap
);

export const wall = (spriteName, x, y, cm) => {
    return cm.createEntity(`wall_${x}_${y}`)
        .add(Components.sprite(spriteName, x, y))
        .add(Components.tag("wall"));
};