import Character from "./character";

export default class Lionel extends Character {
    constructor () {
        const name = "Lionel";
        const epithet = "the Starch King";
        const hp = 18;
        const maxHp = 18;
        const atk = 15;
        const baseAtk = 15;
        const spd = 12;
        const baseSpd = 12;
        const standard = "Hammer";
        const special_1 = "Spiky Strike";
        const special_2 = "Barrier";
        const rotate = "Smoke Ball";

        super (name, epithet, hp, maxHp, atk, baseAtk, spd, baseSpd, standard, special_1, special_2, rotate)
    };

    levelUp () {
        this.level ++;
        this.hp += 6;
        this.maxHp += 6;
        this.atk += 4;
        this.baseAtk += 4;
        this.spd += 2;
        this.baseSpd += 2;       
    }
}