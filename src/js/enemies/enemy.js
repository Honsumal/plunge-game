class Enemy {
    constructor(name, epithet, level, hp, maxHp, atk, spd, standard, special_1, special_2, special_3) {
        this.name = name;
        this.epithet = epithet
        this.level = level;
        this.hp = hp;
        this.maxHp = maxHp;
        this.atk = atk;
        this.spd = spd;
        this.standard = standard;
        this.special_1 = special_1;
        this.special_2 = special_2;
        this.special_3 = special_3;
        this.eSlipstream = false;
        this.barrier = false;
        this.protect = false;
        this.ravage = false;
        this.ally = false;
        this.barrier_count = 0;
        this.wStrike_count = 0;
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
            if (this.wStrike_count > 0) {
                this.hp += this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3;
                console.log(`${this.name} drained ${this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3} health!`);
                if (this.hp > this.maxHp) {
                    this.hp = this.maxHp;
                }
            }

            //If Opponent Spiky
            if (opp.sStrike_count > 0) {
                this.hp -= this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3;
                console.log(`${this.name} took ${this.atk * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3} damage from spikes!`)
            }

            // If Opponent Barrier
            if (opp.barrier) {
                opp.barrier_count --;
                if (opp.barrier_count === 0) {
                    opp.barrier = false;
                    console.log(`${this.name} broke through ${opp.name}'s barrier!`);
                } else {
                    console.log(`${opp.name}'s barrier can withstand ${opp.barrier_count} more hits!`)
                }
            }
        }
    }

    turnStart(eSlipstream) {
        if (eSlipstream && !this.eSlipstream) {
            this.spd = this.spd * 1.2;
            this.eSlipstream = true;
        }

        if (this.wStrike > 0) {
            this.wStrike --;
        }

    }

    printStats() {
        console.log(`Name: ${this.name}, ${this.epithet};`, `Level: ${this.level};` ,`Hp: ${this.hp};`, `Atk: ${this.atk};`, `Spd: ${this.spd}`)
    }

    printActions() {
        console.log(`Standard Attack: ${this.standard};`, `Special 1: ${this.special_1};`, `Special 2: ${this.special_2};`, `Special 3: ${this.special_3}`)
    }

    isAlive() {
        return (this.hp > 0)
    }
}

module.exports = Enemy