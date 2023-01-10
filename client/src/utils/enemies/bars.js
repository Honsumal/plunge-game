const Enemy = require('./enemy');

class Bars extends Enemy {
    constructor () {
        const name = 'Bars';
        const epithet = 'the Dragon';
        const level = 5;
        const hp = 200;
        const maxHp = 200;
        const atk = 6;
        const spd = 15;
        const standard = 'Fire Breath';
        const special_1 = 'Ravage';

        super (name, epithet, level, hp, maxHp, atk, spd, standard, special_1);
    };

    spec_1 (opp){
        if (!this.aRavage) {
            opp.hp -= this.atk * 0.8;
            opp.hp.toFixed(2)
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.8 * (1 + this.aRavage * 0.2)} damage!`)
            this.aRavage = true;
        } else {
            opp.hp -= this.atk * 0.8 * 1.2;
            opp.hp.toFixed(2)
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.8 * (1 + this.aRavage * 0.2)} damage!`)
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

module.exports = Bars