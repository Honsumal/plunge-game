const Character = require('./character');

class Lionel extends Character {
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

    spec_1(opp) {
        if (this.sStrike_count === 0) {            
            opp.hp -= this.atk * 0.8;
            opp.hp.toFixed(2);
            this.spd = this.spd * 0.7;
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.8} damage! Enemy attacks will damage them!`);
            this.sStrike_count = 4;

            if(this.wStrike_count > 0) {
                this.hp += this.atk * 0.8 * 0.3;
                console.log(`${this.name} recovered ${this.atk * 0.8 * 0.3} health!`);

                if (this.hp > this.maxHp) {
                    this.hp = this.maxHp;
                }
            }
            
        } else {
            opp.hp -= this.atk * 0.8;
            opp.hp.toFixed(2);
            this.spd = this.spd * 0.7;
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.8} damage!`);
            if(this.wStrike_count > 0) {
                this.hp += this.atk * 0.8 * 0.3;
                console.log(`${this.name} recovered ${this.atk * 0.8 * 0.3} health!`);

                if (this.hp > this.maxHp) {
                    this.hp = this.maxHp;
                }
            }
        }
    }

    levelUp () {
        this.level ++;
        this.hp += 3;
        this.maxHp += 3;
        this.atk += 2;
        this.baseAtk += 2;
        this.spd ++;
        this.baseSpd ++;       
    }
}

module.exports = Lionel;