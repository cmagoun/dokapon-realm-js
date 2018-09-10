import * as Components from './Components';
import Walk from '../animations/Walk';

export const paladin = (name, x, y, cm) => {
    return cm.createEntity(name)
        .add(Components.sprite("paladin1", x, y))
        .add(Components.animations({
            walk: (from, to, gm) => walk(from, to, gm)(["paladin1", "paladin2"])
        }));
};

export const ranger = (name, x, y, cm) => {
    return cm.createEntity(name)
        .add(Components.sprite("ranger1", x, y))
        .add(Components.animations({
            walk: (from, to, gm) => walk(from, to, gm)(["ranger1", "ranger2"])
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