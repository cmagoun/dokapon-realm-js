import * as Components from './Components';
import Walk from '../animations/Walk';

export const player = (name, profession, color, index, cm) => {
    return cm.createEntity(name)
        .add(Components.sprite(`${profession}1`, 0, 0, {color}))
        .add(Components.character(name))

        .add(Components.turnTaker(index))
        .add(Components.tag("player"))
        .add(Components.profession(profession))
        .add(Components.animations({
            walk: (from, to, gm) => walk(from, to, gm)([`${profession}1`, `${profession}2`])
        }));
};

const walk = (from, to, gm) => (frames) => new Walk(
    frames, from, to, 2.0, gm.spriteMap
);