import Character from "./character";

export default class Drake extends Character {
    constructor () {
        const name = "Drake";
        const epithet = "the FlyLord";
        const hp = 12;
        const maxHp = 12;
        const atk = 18;
        const baseAtk = 18;
        const spd = 15;
        const baseSpd = 15;
        const standard = "Dissonance";
        const special_1 = "Willful Strike";
        const special_2 = "Slipstream";
        const rotate = "Recall";

        super (name, epithet, hp, maxHp, atk, baseAtk, spd, baseSpd, standard, special_1, special_2, rotate)
    };

    levelUp () {
        this.level ++;
        this.maxHp += 2;
        this.baseAtk += 6;
        this.baseSpd += 4;
        this.turnCount = 0;  
        this.hp = this.maxHp;
        this.atk = this.baseAtk;
        this.spd = this.baseSpd; 
    }
}