const Enemy = require('./enemy');

class Melchor extends Enemy {
    constructor () {
        const name = "Melchor";
        const epithet = "Slayer of Dips";
        const level = 3
        const hp = 1200;
        const atk = 14;
        const spd = 12;
        const standard = "Dipstrike";
        const special_1 = "Ravage";
        const special_2 = "Dipslay";

        super (name, epithet, level, hp, atk, spd, standard, special_1, special_2)
    };

    special_1 (opp, active){
        if (!active.ally.ravage) {
            opp.hp -= this.atk * 0.8;
            active.ally.ravage = !active.ally.ravage;
        } else {
            opp.hp -= this.atk * 0.8 * 1.2;
        }
    }

    special_2 (active) {
        if (this.hp < 600 || this.hp === 600) {
           active.ally.dipslay = !active.ally.dipslay;
        }
    }

}

const m = new Melchor

m.printStats()
m.printActions()

module.exports = Melchor