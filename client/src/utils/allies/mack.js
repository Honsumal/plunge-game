const Character = require('./character');

class Mack extends Character {
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


    spec_1(opp) {
        opp.hp -= this.atk * 0.5 * (1 + this.pStrike_count * 0.25);
        opp.hp.toFixed(2)
        console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.5 * (1 + this.pStrike_count * 0.25)} damage!`);
        this.pStrike_count ++;
    }

    levelUp () {
        this.level ++;
        this.hp += 2;
        this.maxHp += 2;
        this.atk ++;
        this.baseAtk ++;
        this.spd += 3;  
        this.baseSpd += 3;     
    }
}

module.exports = Mack