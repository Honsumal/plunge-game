const Enemy = require('./enemy');

export default class Statis extends Enemy {
    constructor () {
        const name = "Golba Statis";
        const epithet = "The Midnight Tempest";
        const level = 10;
        const hp = 1000;
        const maxHp = 1000;
        const atk = 30;
        const spd = 30;
        const standard = "Atrocity";
        const special_1 = "Ravage";
        const special_2 = "Willful Strike";

        super (name, epithet, level, hp, maxHp, atk, spd, standard, special_1, special_2)
    
    };

    //Ravage
    spec_1 (opp){
        opp.hp -= parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2)).toFixed(2);
        console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2)).toFixed(2)} damage!`);

        if (!opp.ravage) {
            opp.ravage = true;
            console.log(`${opp.name} has been ravaged and now takes extra damage!`)
        };
        
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
    };

    //WStrike
    spec_2 (opp) {
        opp.hp -= parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2)).toFixed(2);
        console.log(`${this.name} attacked ${opp.name} using ${this.special_2} for ${parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2)).toFixed(2)} damage!`);
        
        if (this.wStrike === 0) {
            this.wStrike = 3;
            console.log(`${this.name}'s attacks now drain allies for some health!`)
        }

        this.hp += parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2) * 0.3).toFixed(2);
        console.log(`${this.name} drained ${parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2) * 0.3).toFixed(2)} health!`);
        if (this.hp > this.maxHp) {
            this.hp = this.maxHp;
        }
        
        //If Opponent Spiky
        if (opp.sStrike_count > 0) {
            this.hp -= parseFloat(this.atk * 0.8 * (1 + opp.ravage * 0.2) * 0.3).toFixed(2);
            console.log(`${this.name} took ${parseFloat(this.atk * (1 + opp.ravage * 0.2) * 0.3).toFixed(2)} damage from spikes!`)
        } 
    };

    strike (opp) {
        let dice = Math.floor(Math.random() * 3);
        if (dice === 0) {
            return this.attack(opp);
        } else if (dice === 1) {
            return this.spec_1(opp);
        } else {
            return this.spec_2(opp);
        }
    }


}