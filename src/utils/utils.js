import {tileSize} from './constants';

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

export const centerCameraOn = (obj) => {
    const x = Math.floor(obj.x - (window.innerWidth/2));
    const y = Math.floor(obj.y - (window.innerHeight/2));
    return {x,y};
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