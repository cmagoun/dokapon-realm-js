import * as Vector from "../utils/vector";

export const roll = (player) => {
    const roll = Vector.getRandomInt(1, 25);
    const moveroll = Math.ceil((roll - 1)/4);
    return moveroll;
}

export const findPaths = (from, distance, mapSpaces) => {
    const paths = [];
    const start = [];

    const startSpace = mapSpaces.filter(ms => ms.id === from.id)[0];

    start.push(startSpace);
    createPaths(start, -1, distance, mapSpaces, paths);

    return paths;
}

export const createPaths = (path, comingFrom, distance, mapSpaces, paths) => {
    if(pathLength(path) > distance) {
        paths.push(path);
        return;
    }
    const current = path[path.length-1];
    const links = current.links.filter(l => l !== comingFrom);

    links.forEach(link => {
        const newPath = path.slice();
        const newSpace = mapSpaces.filter(space => space.id === link)[0];
        newPath.push(newSpace);
        createPaths(newPath, current.id, distance, mapSpaces, paths);
    });
}

const pathLength = (path) => {
    return path.filter(p => p.spaceType !== "junction").length;
}