
export const animations = (animations) => {
    return {
        cname: "animations",
        ...animations
    }
};

export const character = (name) => {
    return {
        cname:"character",
        name
    };
};

export const pos = (map, id) => {
    return {
        cname: "pos",
        map,
        id
    }
};

export const profession = (value) => {
    return {
        cname: "profession",
        value
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
        index
    };
};







