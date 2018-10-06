import MapLayer from './MapLayer';
import ControlLayer from './ControlLayer';
import MovePathsLayer from './MovePathsLayer';
import PlayerLayer from './PlayerLayer';

export const mapLayer = (game) => new MapLayer("map", game);
export const controlLayer = (game) => new ControlLayer("control", game);
export const movePathsLayer = (game) => new MovePathsLayer("movepaths", game);
export const playerLayer = (game) => new PlayerLayer("player", game);