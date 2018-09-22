import axe from '../dist/axe.png';
import feather from '../dist/feather.png';
import whitedrop from '../dist/whitedrop.png';
import blackdrop from '../dist/blackdrop.png';
import golddrop from '../dist/golddrop.png';
import brownbook from '../dist/brownbook.png';
import rageskull from '../dist/rageskull.png';
import greysquare from '../dist/greysquare.png';

export const battle = () => {
    return {
        type: "battle",
        display: "Battle",
        abbrev: "B",
        image: axe,
        sides:["", "A+", "A+", "A+", "A", "A", "D+", "D", "D", "S", "M", "", ""],
        status: "ready"
    };
};

export const quick = () => {
    return {
        type: "quick",
        display:"Quick",
        abbrev: "Q",
        image: feather,
        sides:["", "D+", "D", "S+", "S+", "S", "M+", "M+", "M+", "M", "M", "", ""],
        status: "ready"
    };
};

export const cunning = () => {
    return {
        type: "cunning",
        display:"Cunning",
        abbrev: "C",
        image: brownbook,
        sides: ["", "A+", "A", "D", "S+", "S+", "S+", "S", "S", "M+", "M", "", ""],
        status: "ready"
    };
};

export const rage = () => {
    return {
        type: "rage",
        display:"Rage",
        abbrev: "R",
        image: rageskull,
        sides: ["", "A+", "A+", "A+", "A", "S+", "S", "S", "S", "M+", "M", "T", "T"],
        status:"ready"
    };
};

export const tough = () => {
    return {
        type:"tough",
        display:"Tough",
        abbrev: "T",
        image: greysquare,
        sides: ["", "D", "D", "D", "D", "S", "S", "V", "V", "V", "H", "Fx", "Fx"],
        status:"ready"
    };
};

export const whiteMagic = () => {
    return {
        type:"white",
        display:"White Magic",
        abbrev: "Wm",
        image: whitedrop,
        sides: ["", "Wm+", "Wm+", "Wm+", "Wm", "Wm", "D+", "D", "S", "S", "M", "", ""],
    };
};

export const blackMagic = () => {
    return {
        type:"black",
        display:"Black Magic",
        abbrev: "Bm",
        image: blackdrop,
        sides: ["", "Bm+", "Bm+", "Bm+", "Bm", "Bm", "A+", "D", "S", "S", "M", "", ""],
    };
};

export const goldMagic = () => {
    return {
        type:"gold",
        display:"Gold Magic",
        abbrev: "Gm",
        image: golddrop,
        sides: ["", "Gm+", "Gm+", "Gm+", "Gm", "Gm", "D", "S+", "S", "M+", "M", "", ""],
    };
};

export const dc = {
    battle: battle,
    quick: quick,
    cunning: cunning,
    rage: rage,
    tough: tough,
    white: whiteMagic,
    black: blackMagic,
    gold: goldMagic
};