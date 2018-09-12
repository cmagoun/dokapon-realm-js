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