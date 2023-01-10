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


    spec_1(opp) {
        if (this.wStrike_count === 0) {            
            opp.hp -= this.atk * 0.8;
            this.hp += this.atk * 0.8 * 0.3;
            opp.hp.toFixed(2);
            this.hp.toFixed(2);
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.8} damage! Allied attacks now steal some health from enemies!`);
            this.wStrike_count = 4;
            if (this.hp > this.maxHp) {
                this.hp = this.maxHp;
            }
        } else {
            opp.hp -= this.atk * 0.8;
            this.hp += this.atk * 0.8 * 0.3;
            opp.hp.toFixed(2);
            this.hp.toFixed(2);
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.8} damage!`);
            console.log(`${this.name} recovered ${this.atk * 0.8 * 0.3} health!`);
            this.wStrike_count --;
            if (this.hp > this.maxHp) {
                this.hp = this.maxHp;
            }
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