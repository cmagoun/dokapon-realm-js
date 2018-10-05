export const centerIn = (parent, obj) => {
    obj.x = (parent.width - obj.width)/2;
    obj.y = (parent.height - obj.height)/2;
    return obj;
}

export const centerInWindow = (obj) => {
    obj.x = (window.innerWidth - obj.width)/2;
    obj.y = (window.innerHeight - obj.height)/2;
    return obj;
}

export const groupBy = (list, keyFunc) => {
    const map = new Map();

    list.forEach(item => {
        const key = keyFunc(item);
        if(!map.has(key)) map.set(key, []);
        map.get(key).push(item);
    });

    return map;
}