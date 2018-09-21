import * as Vector from '../utils/vector';
import {tileSize} from '../utils/constants';

class GameMap {
    constructor(name, spacesJson) {
        this.name = name;
        this.file = "";
        this.spaces = this.init(spacesJson);
    }

    getPosition(id) {
        return this.spaces.filter(s => s.id === id).map(s => {return {x:s.x, y:s.y}})[0];
    }

    getPixiPosition(id) {
        return Vector.multiply(this.getPosition(id), tileSize);
    }

    getId(x, y) {
        return this.spaces.filter(s => s.x === x && s.y === y).map(s => s.id)[0];
    }

    init(json) {
        return JSON.parse(json)
            .map(t => {
                return {id:t.Id, region:t.Region, x:t.X, y:t.Y, spaceType:t.SpaceType, links:t.Links}
            });
    }
}

export default GameMap;