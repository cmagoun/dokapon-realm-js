class Map {
    constructor(name, spacesJson) {
        this.spaces = JSON.parse(spacesJson);
        this.name = name;
        this.file = "";
    }

    getPosition(id) {
        return this.spaces.filter(s => s.Id === id).map(s => {return {x:s.X, y:s.Y}})[0];
    }

    getId(x, y) {
        return this.spaces.filter(s => s.X === x && s.Y === y).map(s => s.Id)[0];
    }


}