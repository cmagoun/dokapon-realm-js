export const create = (x,y) => {
    return {x:x, y:y};
};

export const from = (component) => {
    return {x:component.x, y:component.y};
}

export const add = (v1) => (v2) => {
    return {x:v1.x + v2.x, y:v1.y + v2.y};
};

export const subtract = (v1) => (v2) => {
    //subtract v2 from v1
    let vTemp = {x:v2.x*-1, y:v2.y*-1};
    return add(v1)(vTemp);
};

export const multiply = (v1, k) => {
    return {x:v1.x*k, y:v1.y*k};
};

export const equals = (v1) => (v2) => {
    return v1.x === v2.x && v1.y === v2.y;
};

export const magSqr = v => {
    return v.x*v.x + v.y*v.y;
};

export const magnatude = v => {
    return Math.sqrt(magSqr(v));
};

export const normalized = v => {
    let mag = magnatude(v);
    if (mag === 0) return {x: 0, y: 0};
    return {x: v.x/mag, y: v.y/mag};
};

export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max-min+1)) + min;
};

export const randomDirection = () => {
    return randomVector({x:-1, y:-1}, {x:1, y:1});
};

export const randomVector = (min, max) => {
    const x = getRandomInt(min.x, max.x);
    const y = getRandomInt(min.y, max.y);
    return {x,y};
};

export const within = (vec, radius) => {
    const result = [];
    for(let x = vec.x - radius; x <= vec.x + radius; x++) {
        for(let y = vec.y - radius; y <= vec.y + radius; y++) {
            result.push({x, y});
        }
    }
    
    return result;
};

export const isHorizontal = (dir) => {
    return dir.y === 0 && dir.x !== 0;
};

export const isVertical = (dir) => {
    return dir.y !== 0 && dir.x === 0;
};

export const isDiagonal = (dir) => {
    return dir.y !== 0 && 
        dir.x !== 0 && 
        Math.abs(dir.x) === Math.abs(dir.y);
};

export const isForwardSlash = (dir) => {
    return (dir.y < 0 && dir.x > 0) ||
        (dir.y > 0 && dir.x < 0);
};

export const isCardinalDirection = (v1) => (v2) => {
    const dir = subtract(v1)(v2);

    if(isHorizontal(dir)) return true;
    if(isVertical(dir))return true;
    if(isDiagonal(dir))return true;
    return false;
};


export const adjacent = (vec) => {
    return within(vec, 1)
        .filter(s => s.x !== vec.x || s.y !== vec.y);
};