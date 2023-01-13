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
        this.ravage = false;
        this.wStrike = 0;
    }

    attack(opp) {
        opp.hp -= parseFloat(this.atk * (1 + opp.ravage * 0.2)).toFixed(2);
        console.log(`${this.name} attacked ${opp.name} using ${this.standard} for ${parseFloat(this.atk * (1 + opp.ravage * 0.2)).toFixed(2)} damage!`);

        // If Willstrike
        if (this.wStrike > 0) {
            this.hp += parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2) * 0.3).toFixed(2);
            console.log(`${this.name} drained ${parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2) * 0.3).toFixed(2)} health!`);
            if (this.hp > this.maxHp) {
                this.hp = this.maxHp;
            }
        }

        //If Opponent Spiky
        if (opp.sStrike_count > 0) {
            this.hp -= parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2) * 0.3).toFixed(2);
            console.log(`${this.name} took ${parseFloat(this.atk * (1 + opp.ravage * 0.2) * 0.3).toFixed(2)} damage from spikes!`)
        } 
    }

    turnStart(eSlipstream) {
        if (eSlipstream && !this.eSlipstream) {
            this.spd = parseFloat(this.spd * 1.2).toFixed(2);
            this.eSlipstream = true;
        }

        if (this.wStrike > 0) {
            this.wStrike --;
        }

        this.hp = parseFloat(this.hp.toFixed(2));
        this.atk = parseFloat(this.atk.toFixed(2));
        this.spd = parseFloat(this.spd.toFixed(2));
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