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

    //SStrike
    spec_1(opp) {
        opp.hp -= parseFloat((this.atk * 0.8).toFixed(2));
        console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${(this.atk * 0.8).toFixed(2)} damage!`);
        
        
        if (this.sStrike_count === 0) {            
            this.sStrike_count = 6;
            console.log(`Spikes from ${this.name}'s attack formed a shield around allies, injuring enemies who attack!`)
        }

        // If Willstrike
        if (this.wStrike > 0) {
            this.hp += parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2) * 0.3).toFixed(2);
            console.log(`${this.name} drained ${parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2) * 0.3).toFixed(2)} health!`);
            if (this.hp > this.maxHp) {
                this.hp = this.maxHp;
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