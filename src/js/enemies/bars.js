import Enemy from "./enemy";

export default class Bars extends Enemy {
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
        //If Opponent Protect
        if (opp.protect) {
            opp.protect = false;
            console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
        } else {
            opp.hp -= this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5);
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5)} damage!`);

            if (!opp.ravage) {
                opp.ravage = true;
                console.log(`${opp.name} has been ravaged and now takes extra damage!`)
            };
            
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

    strike (opp) {
        let dice = Math.floor(Math.random() * 2);
        if (dice === 0) {
            return this.attack(opp)
        } else {
            return this.spec_1(opp)
        }
    }
}s