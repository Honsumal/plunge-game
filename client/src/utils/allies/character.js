class Character {
    constructor (name, epithet, hp, maxHp, atk, baseAtk, spd, baseSpd, standard, special_1, special_2, rotate) {
        this.name = name;
        this.epithet = epithet
        this.level = 1;
        this.hp = hp;
        this.maxHp = maxHp;
        this.atk = atk;
        this.baseAtk = baseAtk;
        this.spd = spd;
        this.baseSpd = baseSpd;
        this.standard = standard;
        this.special_1 = special_1;
        this.special_2 = special_2;
        this.rotate = rotate;
        this.isActive = false;
        this.dipslay = false;
        this.ravage = false;
        this.pStrike_count = 0;
        this.wStrike_count = 0;
        this.sStrike_count = 0;
    }

    attack(opp) {
        //If Opponent Protect
        if (opp.protect) {
            opp.protect = false;
            console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
        } else {
            opp.hp -= this.atk * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5);
            console.log(`${this.name} attacked ${opp.name} using ${this.standard} for ${this.atk * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5)} damage!`);

            // If Willstrike
            if (this.wStrike > 0) {
                this.hp += this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3;
                console.log(`${this.name} drained ${this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3} health!`);
                if (this.hp > this.maxHp) {
                    this.hp = this.maxHp;
                }
            }

            // If Opponent Barrier
            if (opp.barrier) {
                opp.barrierCount --;
                if (opp.barrierCount === 0) {
                    opp.barrier = false;
                    console.log(`The allies broke through ${opp.name}'s barrier!`);
                }
            }
        }
    }

    rotateTo(next){
        if (this.name === next.name) {
            console.log(`${this.name} is already in combat!`)
        }

        if (next.isAlive()) {
            this.isActive = false;
            this.atk = this.baseAtk;
            this.spd = this.baseSpd;

            next.sStrike_count = this.sStrike_count;
            next.wStrike_count = this.wStrike_count;

            next.isActive = true;
            console.log(`${this.name} retreated! ${next.name} stepped up to fight!`)
        } else {
            console.log(`${next.name} has already fallen, ${this.name} cannot switch out!`)
        }
    }

    turnStart (dipslay) {
        if (dipslay && !this.dipslay) {
            this.spd = (this.spd * 0.5);
            this.dipslay = true;
        };

        if (this.sStrike_count > 0) {
            this.sStrike_count --;
            if (this.sStrike_count > 0) {
                console.log(`Spiky Strike active for ${this.sStrike_count} more turns!`)
            } else {
                console.log(`Spiky Strike has worn off!`)
            }
        };

        if (this.wStrike_count > 0) {
            this.wStrike_count --;
            if (this.wStrike_count > 0) {
                console.log(`Willful Strike active for ${this.wStrike_count} more turns!`)
            } else {
                console.log(`Willful Strike has worn off!`)
            }
        };

        // this.hp = this.hp;
        // this.atk = this.atk;
        // this.spd = this.spd;
    }

    printStats() {
        console.log(`Name: ${this.name}, ${this.epithet}; `, `Level: ${this.level};` ,`Hp: ${this.hp};`, `Atk: ${this.atk};`, `Spd: ${this.spd}`)
    }

    printActions() {
        console.log(`Standard Attack: ${this.standard};`, `Special 1: ${this.special_1};`, `Special 2: ${this.special_2};`, `Rotation Move: ${this.rotate}`)
    }

    isAlive() {
        return (this.hp > 0)
    }
}

module.exports = Character