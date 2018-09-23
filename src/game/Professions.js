import * as Dice from './Dice';

export const startingValues = {
    amazon: {
        hits: 6,
        spells:0,
        spellbooks:[],
        dice: [Dice.battle, Dice.battle, Dice.battle, Dice.tough, Dice.quick]
    },
    berserker: {
        hits: 7,
        spells: 0,
        spellbooks:[],
        dice: [Dice.battle, Dice.battle, Dice.battle, Dice.battle, Dice.tough]
    },
    elf: {
        hits: 5,
        spells: 1,
        spellbooks: ["faerie"],
        dice: [Dice.battle, Dice.battle, Dice.battle, Dice.quick, Dice.goldMagic]
    },
    whiteknight: {
        hits: 6,
        spells: 1,
        spellbooks: ["holy"],
        dice: [Dice.battle, Dice.battle, Dice.battle, Dice.battle, Dice.whiteMagic]
    },
    witchking: {
        hits: 4,
        spells: 4,
        spellbooks: ["sorcery", "demonic"],
        dice: [Dice.cunning, Dice.blackMagic, Dice.blackMagic, Dice.blackMagic, Dice.blackMagic]
    }
}