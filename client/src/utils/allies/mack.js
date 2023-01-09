const Character = require('./character');

class Mack extends Character {
    constructor () {
        const name = "Mack";
        const epithet = "the Stannic Sol";
        const hp = 15;
        const maxHp = 15;
        const atk = 12;
        const spd = 18;
        const standard = "Batter";
        const special_1 = "Pugilistic Strike";
        const special_2 = "Ravage";
        const rotate = "Disengage";

        super (name, epithet, hp, maxHp, atk, spd, standard, special_1, special_2, rotate)
    };

    spec_1(opp, pStrike_count) {
        opp.hp -= this.atk * 0.5 *(1 + pStrike_count);
        console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.5 * (1 + pStrike_count)} damage!`)
    }

    levelUp () {
        this.level ++;
        this.hp += 2;
        this.maxHp += 2;
        this.atk ++;
        this.spd += 3;       
    }
}

module.exports = Mack