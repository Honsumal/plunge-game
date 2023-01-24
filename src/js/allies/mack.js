import Character from "./character";

export default class Mack extends Character {
    constructor () {
        const name = "Mack";
        const epithet = "the Stannic Sol";
        const hp = 15;
        const maxHp = 15;
        const atk = 12;
        const baseAtk = 12;
        const spd = 18;
        const baseSpd = 18;
        const standard = "Batter";
        const special_1 = "Pugilistic Strike";
        const special_2 = "Ravage";
        const rotate = "Disengage";

        super (name, epithet, hp, maxHp, atk, baseAtk, spd, baseSpd, standard, special_1, special_2, rotate)
    };

    levelUp () {
        this.level ++;
        this.hp += 4;
        this.maxHp += 4;
        this.atk += 2;
        this.baseAtk += 2;
        this.spd += 6;  
        this.baseSpd += 6;     
    }
}