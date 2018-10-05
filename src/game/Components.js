
export const animations = (animations) => {
    return {
        cname: "animations",
        ...animations
    }
};

export const cameraOn = () => {
    return {
        cname: "cameraon"
    }
}

export const character = (name, profession, level, prowess, resilience) => {
    return {
        cname:"character",
        level: level || 1,
        prowess: prowess || 2 + Math.floor((level-1)/2)+2,
        resilience: resilience || 2 + Math.floor((level-1)/2),
        name, 
        profession
    };
};

export const hasDice = (dice) => {
    return {
        cname:"hasdice",
        dice
    };
};

export const hits = (startingValue) => {
    return {
        cname:"hits",
        max: startingValue,
        current: startingValue
    };
};

export const pos = (map, id) => {
    return {
        cname: "pos",
        map,
        id
    }
};

export const sprite = (name, x, y, options) => {
    if(!options) options = {
        tint: 0xFFFFFF,
        color: 0xFFFFFF,
        scale: {x:1, y:1},
        anchor: {x:0, y:0},
        ref: undefined,
        circle: undefined
    }

    return {
        cname:"sprite",
        name,
        x,
        y,
        tint: options.tint || 0xFFFFFF,
        color: options.color || 0xFFFFFF,
        scale: options.scale || {x:1, y:1},
        anchor: options.anchor || {x:0, y:0},
        ref: options.ref,
        circle: options.circle,
        initialized:false
    };
};


export const tag = (value) => {
    return {
        cname:"tag",
        value
    };
};

export const turnTaker = (index) => {
    return {
        cname:"turntaker",
        index,
        itemsused: 0,
        moveroll: undefined,
        spellsused: 0,
        movepaths: []
    };
};







