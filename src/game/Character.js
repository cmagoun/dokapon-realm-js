//Helpers for characters on the map
import * as Vector from '../utils/vector';
import {tileSize} from '../utils/constants';
import * as Components from '../game/Components';

export const setPos = (entity, mapName, spaceId, scenario, setSpritePos) => {
    if(!entity.pos) {
        entity.add(Components.pos(mapName, spaceId));
    } else {
        entity.edit("pos", {mapName, spaceId});
    }

    if(!setSpritePos) return;

    const pos = getPixiPos(entity, scenario);

    if(!entity.sprite) {
        entity.add(Components.sprite(`${entity.character.profession}1`, pos.x, pos.y));
    } else {
        entity.edit("sprite", {name:`${entity.character.profession}1`, x:pos.x, y:pos.y});
    }
}

export const getPos = (entity, scenario) => {
    if(!entity.pos) return undefined;

    return scenario.maps
        .get(entity.pos.map)
        .getPosition(entity.pos.id);
}

export const getPixiPos = (entity, scenario) => {
    if(!entity.pos) return undefined;
    return Vector.multiply(getPos(entity, scenario), tileSize);
}