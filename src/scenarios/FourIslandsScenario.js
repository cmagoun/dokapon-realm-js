import spaces from './fourislands/FourIslandsMap';

export default class FourIslandsScenario {
    constructor(loader) {
        this.name="fourislands"
        this.displayName="Four Islands";
        this.maps = new Map();
        this.loader = loader

        this.introText = `This is the story of a young, strapping, adventurous, heroic lad named... Tim.
        Tim will likely die here, but that is ok, because I am just trying to fill out some text to see
        just how bad this looks on screen.
        
        Sincerely,
        The GM`
    }

    init() {
        this.loadResources();
        this.loadmaps();
        //this.loadmonsters();
        //this.loaditems();
        //this.loadencounters();
    }

    loadResources() {
        this.loader.add("fourislands", "dist/FourIslands.tmx");
    }

    loadmaps() {
        this.maps.set("fourislands",  spaces);
    }
}