const Enemy = require('./enemy');

class Melchor extends Enemy {
    constructor () {
        const name = "Melchor";
        const epithet = "Slayer of Dips";
        const level = 3;
        const hp = 160;
        const maxHp = 160;
        const atk = 4;
        const spd = 12;
        const standard = "Dipstrike";
        const special_1 = "Ravage";
        const special_2 = "Dipslay";

        super (name, epithet, level, hp, maxHp, atk, spd, standard, special_1, special_2)
    };

    spec_1 (opp){
        if (!opp.ravage) {
            opp.hp -= this.atk * 0.8;
            opp.hp.toFixed(2)
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.8 * (1 + opp.ravage * 0.2)} damage!`)
            opp.ravage = true;

            if (opp.sStrike_count > 0) {
                this.hp -= this.atk * (1 + opp.ravage * 0.2) * 0.3
                console.log(`${this.name} took ${this.atk * (1 + opp.ravage * 0.2) * 0.3} damage from spikes!`)
            }
        } else {
            opp.hp -= this.atk * 0.8 * 1.2;
            opp.hp.toFixed(2)
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.8 * (1 + opp.ravage * 0.2)} damage!`)

            if (opp.sStrike_count > 0) {
                this.hp -= this.atk * (1 + opp.ravage * 0.2) * 0.3
                console.log(`${this.name} took ${this.atk * (1 + opp.ravage * 0.2) * 0.3} damage from spikes!`)
            }
        }
    }

    strike (opp) {
        let dice = Math.floor(Math.random() * 2);
        if (dice === 0) {
            return this.attack(opp)
        } else {
            return this.spec_1(opp)
        }
    }

}

module.exports = Melchor