const Enemy = require('./enemy');

class Melchor extends Enemy {
    constructor () {
        const name = "Melchor";
        const epithet = "Slayer of Dips";
        const level = 3
        const hp = 160;
        const maxHp = 160;
        const atk = 4;
        const spd = 12;
        const standard = "Dipstrike";
        const special_1 = "Ravage";
        const special_2 = "Dipslay";

        super (name, epithet, level, hp, maxHp, atk, spd, standard, special_1, special_2)
    };

    spec_1 (opp, aRavage){
        if (!aRavage) {
            opp.hp -= this.atk * 0.8;
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.8 * (1 + aRavage * 0.2)} damage!`)
        } else {
            opp.hp -= this.atk * 0.8 * 1.2;
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.8 * (1 + aRavage * 0.2)} damage!`)
        }
    }

}

module.exports = Melchor