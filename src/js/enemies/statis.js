import Enemy from "./enemy";

export default class Statis extends Enemy {
    constructor () {
        const name = "Golba Statis";
        const epithet = "The Midnight Tempest";
        const level = 10;
        const hp = 700;
        const maxHp = 1000;
        const atk = 18;
        const spd = 30;
        const standard = "Atrocity";
        const special_1 = "Ravage";
        const special_2 = "Willful Strike";

        super (name, epithet, level, hp, maxHp, atk, spd, standard, special_1, special_2)
    
    };

    //Ravage
    spec_1 (opp){
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
            
            // If Willstrike
            if (this.wStrike_count > 0) {
                this.hp += Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3);
                console.log(`${this.name} drained ${Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3)} health!`);
                if (this.hp > this.maxHp) {
                    this.hp = this.maxHp;
                }
            }

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
    };

    //WStrike
    spec_2 (opp) {
        if (opp.protect) {
            opp.protect = false;
            console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
        } else {
            opp.hp -= Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5));
            console.log(`${this.name} attacked ${opp.name} using ${this.special_2} for ${Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))} damage!`);
            
            if (this.wStrike_count === 0) {
                this.wStrike_count = 3;
                console.log(`${this.name}'s attacks now drain allies for some health!`)
            }


            this.hp += Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3);
            console.log(`${this.name} drained ${Math.floor(this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3)} health!`);
            if (this.hp > this.maxHp) {
                this.hp = this.maxHp;
            }
            
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