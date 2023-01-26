import Enemy from "./enemy";

export default class Melchor extends Enemy {
    constructor () {
        const name = "Melchor";
        const epithet = "Slayer of Dips";
        const level = 5;
        const hp = 250;
        const maxHp = 250;
        const atk = 12;
        const spd = 12;
        const move_count = 2;
        const standard = "Dipstrike";
        const special_1 = "Ravage";

        super (name, epithet, level, hp, maxHp, atk, spd, move_count, standard, special_1)
    };

    //Ravage
    spec_1 (opp){
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
                    console.log(`${opp.name}'s barrier can withstand ${opp.barrier_count - 1} more hits!`)
                }
            }
        }
    }

    strike (opp) {
        let dice = Math.floor(Math.random() * 2);
        if (dice === 0) {
            return this.attack(opp);
        } else {
            return this.spec_1(opp);
        }
    }

}
