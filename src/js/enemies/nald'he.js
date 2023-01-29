import Enemy from "./enemy";

export default class Naldhe extends Enemy {
    constructor () {
        const name = `Nald'he`;
        const epithet = `the Horde's Revenge`;
        const level = 7;
        const hp = 300;
        const maxHp = 300;
        const atk = 9;
        const spd = 21;
        const move_count = 2;
        const standard = 'Fire Breath';
        const special_1 = 'Venomous Bite';
        const special_2 = 'Raging Frenzy'

        super (name, epithet, level, hp, maxHp, atk, spd, move_count, standard, special_1, special_2);
        this.rage = 0;
    };

    spec_1 (opp){
        //If Opponent Protect
        if (opp.protect) {
            opp.protect = false;
            console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
        } else {
            opp.hp -= Math.floor(this.atk * 0.5 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5));
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${Math.floor(this.atk * 0.5 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))} damage!`);
            
            opp.rot = true
            console.log(`${this.name}'s strike caused damage over time on ${opp.name}`)
            
            //If Opponent Spiky
            if (opp.sStrike_count > 0) {
                this.hp -= Math.floor(this.atk * 0.5 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3);
                console.log(`${this.name} took ${Math.floor(this.atk * 0.5 * (1 + this.pStrike_count * 0.5) * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3)} damage from spikes!`)
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

    spec_2 (opp) {
        if (opp.protect) {
            opp.protect = false;
            console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
        } else {
            opp.hp -= Math.floor(this.atk * 0.5 * (1 + this.rage * 0.5) * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))
            console.log(`${this.name} attacked ${opp.name} using ${this.special_2} for ${Math.floor(this.atk * 0.5 * (1 + this.rage * 0.5) * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))} damage`)
            //this.rage ++;

            //If Opponent Spiky
            if (opp.sStrike_count > 0) {
                this.hp -= Math.floor(this.atk * 0.5 * (1 + this.rage * 0.5) * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3);
                console.log(`${this.name} took ${Math.floor(this.atk * 0.5 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3)} damage from spikes!`)
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
}