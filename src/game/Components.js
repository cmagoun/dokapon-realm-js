
export const sprite = (name, x, y, spriteRef) => {
    return {
        cname:"sprite",
        name,
        x,
        y,
        ref:spriteRef,
        initialized:false
    };
};

export const animations = (animations) => {
    return {
        cname: "animations",
        ...animations
    }
}

export const tag = (value) => {
    return {
        cname:"tag",
        value
    };
};

