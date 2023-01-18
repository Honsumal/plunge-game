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
        //If Opponent Protect
        if (opp.protect) {
            opp.protect = false;
            console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
        } else {
            opp.hp -= this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5);
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5)} damage!`);
            
            if (this.wStrike_count === 0) {
                this.wStrike_count = 6;
                console.log(`${this.name}'s attacks now drain allies for some health!`)
            }

            this.hp += this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3;
            console.log(`${this.name} drained ${this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3} health!`);
            if (this.hp > this.maxHp) {
                this.hp = this.maxHp;
            }

            // If Opponent Barrier
            if (opp.barrier) {
                opp.barrier_count --;
                if (opp.barrier_count === 0) {
                    opp.barrier = false;
                    console.log(`The allies broke through ${opp.name}'s barrier!`);
                } else {
                    console.log(`${opp.name}'s barrier can withstand ${opp.barrier_count} more hits!`)
                }
            }
        }
    }

    //Slipstream
    spec_2 () {
        this.slipstream_count = 9;
        this.spd *= 1.2
        console.log(`${this.name} conjured up a magicks to increase allied speed!`)
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