
export const sprite = (name, x, y, options) => {
    if(!options) options = {
        tint: 0xFFFFFF,
        scale: {x:1, y:1},
        anchor: {x:0, y:0},
        ref: undefined
    }

    return {
        cname:"sprite",
        name,
        x,
        y,
        tint: options.tint,
        scale: options.scale,
        anchor: options.anchor,
        ref: options.ref,
        initialized:false
    };
};

export const animations = (animations) => {
    return {
        cname: "animations",
        ...animations
    }
};

export const tag = (value) => {
    return {
        cname:"tag",
        value
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

