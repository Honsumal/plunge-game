import Enemy from "./enemy";

export default class Bars extends Enemy {
    constructor () {
        const name = 'Bars';
        const epithet = 'the Dragon';
        const level = 5;
        const hp = 400;
        const maxHp = 400;
        const atk = 19;
        const spd = 17;
        const move_count = 2;
        const standard = 'Fire Breath';
        const special_1 = 'Ravage';
        const special_2 = 'Detect'

        super (name, epithet, level, hp, maxHp, atk, spd, move_count, standard, special_1, special_2);
    };

    //Ravage
    spec_1 (opp){
        if (this.protect){
            this.protect = false;
        }
        //If Opponent Protect
        if (opp.protect) {
            opp.protect = false;
            console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
        } else {
            opp.hp -= Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5));
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))} damage!`);

            if (!opp.ravage) {
                opp.ravage = true;
                console.log(`${opp.name} has been ravaged and now takes extra damage!`)
            };
            
            //If Opponent Spiky
            if (opp.sStrike_count > 0) {
                this.hp -= Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3);
                console.log(`${this.name} took ${Math.floor(this.atk * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3)} damage from spikes!`)
            } 
            // If Opponent Barrier
            if (opp.barrier) {
                //opp.barrier_count --;
                if (opp.barrier_count === 0) {
                    opp.barrier = false;
                    console.log(`${this.name} broke through ${opp.name}'s barrier!`);
                } else {
                    console.log(`${opp.name}'s barrier can withstand ${opp.barrier_count} more hits!`)
                }
            }
        }
    }

    spec_2 () {
        this.protect = true;
    }

    strike (opp) {
        let dice = Math.floor(Math.random() * 4);
        if (dice === 0 || dice  === 1) {
            return this.attack(opp)
        } else if (dice === 2) {
            return this.spec_1(opp)
        } else {
            return this.spec_2()
        }
    }
}