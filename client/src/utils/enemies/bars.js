const Enemy = require('./enemy');

class Bars extends Enemy {
    constructor () {
        const name = 'Bars';
        const epithet = 'the Dragon';
        const level = 5;
        const hp = 500;
        const maxHp = 500;
        const atk = 19;
        const spd = 15;
        const standard = 'Fire Breath';
        const special_1 = 'Ravage';

        super (name, epithet, level, hp, maxHp, atk, spd, standard, special_1);
    };

    //Ravage
    spec_1 (opp){
        opp.hp -= parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2)).toFixed(2);
        console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2)).toFixed(2)} damage!`);

        if (!opp.ravage) {
            opp.ravage = true;
            console.log(`${opp.name} has been ravaged and now takes extra damage!`)
        };
        
        //If Opponent Spiky
        if (opp.sStrike_count > 0) {
            this.hp -= parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2) * 0.3).toFixed(2);
            console.log(`${this.name} took ${parseFloat(this.atk * (1 + opp.ravage * 0.2) * 0.3).toFixed(2)} damage from spikes!`)
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