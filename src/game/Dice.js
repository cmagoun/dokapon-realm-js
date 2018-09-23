import axe from '../dist/axe.png';
import feather from '../dist/feather.png';
import whitedrop from '../dist/whitedrop.png';
import blackdrop from '../dist/blackdrop.png';
import golddrop from '../dist/golddrop.png';
import brownbook from '../dist/brownbook.png';
import rageskull from '../dist/rageskull.png';
import greysquare from '../dist/greysquare.png';
import * as Vector from '../utils/vector';

export const DieStatus = {
    READY: 1,
    ROLLED: 2,
    FATIGUED: 3,
    WOUNDED: 4
}

export const battle = {
    type: "battle",
    display: "Battle",
    abbrev: "B",
    image: axe,
    sides:["", "A+", "A+", "A+", "A", "A", "D+", "D", "D", "S", "M", "", ""],
    status: DieStatus.READY,
    index: 0
};

export const quick = {
    type: "quick",
    display:"Quick",
    abbrev: "Q",
    image: feather,
    sides:["", "D+", "D", "S+", "S+", "S", "M+", "M+", "M+", "M", "M", "", ""],
    status: DieStatus.READY,
    index: 0
};

export const cunning = {
    type: "cunning",
    display:"Cunning",
    abbrev: "C",
    image: brownbook,
    sides: ["", "A+", "A", "D", "S+", "S+", "S+", "S", "S", "M+", "M", "", ""],
    status: DieStatus.READY,
    index: 0
};

export const rage = {
    type: "rage",
    display:"Rage",
    abbrev: "R",
    image: rageskull,
    sides: ["", "A+", "A+", "A+", "A", "S+", "S", "S", "S", "M+", "M", "T", "T"],
    status: DieStatus.READY,
    index: 0
};

export const tough = {
    type:"tough",
    display:"Tough",
    abbrev: "T",
    image: greysquare,
    sides: ["", "D", "D", "D", "D", "S", "S", "V", "V", "V", "H", "Fx", "Fx"],
    status: DieStatus.READY,
    index: 0
};

export const whiteMagic = {
    type:"white",
    display:"White Magic",
    abbrev: "Wm",
    image: whitedrop,
    sides: ["", "Wm+", "Wm+", "Wm+", "Wm", "Wm", "D+", "D", "S", "S", "M", "", ""],
    status: DieStatus.READY,
    index: 0
};


export const blackMagic = {
    type:"black",
    display:"Black Magic",
    abbrev: "Bm",
    image: blackdrop,
    sides: ["", "Bm+", "Bm+", "Bm+", "Bm", "Bm", "A+", "D", "S", "S", "M", "", ""],
    status: DieStatus.READY,
    index: 0
};

export const goldMagic = {
    type:"gold",
    display:"Gold Magic",
    abbrev: "Gm",
    image: golddrop,
    sides: ["", "Gm+", "Gm+", "Gm+", "Gm", "Gm", "D", "S+", "S", "M+", "M", "", ""],
    status: DieStatus.READY,
    index: 0
};


export const roll = (dice) => {
    dice.forEach(d => {
        d.status = DieStatus.ROLLED;
        d.index = Vector.getRandomInt(1, 12);
    });
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