const Character = require('./character');

class Drake extends Character {
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

    //WStrike
    spec_1(opp) {
        opp.hp -= parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2)).toFixed(2);
        console.log(`${this.name} attacked ${opp.name} using ${this.special_2} for ${parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2)).toFixed(2)} damage!`);
        
        if (this.wStrike === 0) {
            this.wStrike = 6;
            console.log(`${this.name}'s attacks now drain allies for some health!`)
        }

        this.hp += parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2) * 0.3).toFixed(2);
        console.log(`${this.name} drained ${parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2) * 0.3).toFixed(2)} health!`);
        if (this.hp > this.maxHp) {
            this.hp = this.maxHp;
        }
    }

    levelUp () {
        this.level ++;
        this.hp ++;
        this.maxHp ++;
        this.atk += 3;
        this.baseAtk += 3;
        this.spd += 2;
        this.baseSpd += 2;       
    }
}

module.exports = Drake