import Enemy from "./enemy";

export default class Elvin extends Enemy {
    constructor () {
        const name = 'Elvin';
        const epithet = 'the Blob';
        const level = 6;
        const hp = 700;
        const maxHp = 700;
        const atk = 25;
        const spd = 12;
        const move_count = 2;
        const standard = 'Wall Slam';
        const special_1 = 'Concuss';
        const special_2 = 'Truancy'

        super (name, epithet, level, hp, maxHp, atk, spd, move_count, standard, special_1, special_2);
        this.concussCharge = false;
    };

    //Concuss
    spec_1(opp) {
        if (!this.concussCharge) {
            this.concussCharge = true;
            console.log(`Elvin is charging up a massive attack!`)
        } else {
            this.concussCharge = false;
            //If Opponent Protect
            if (opp.protect) {
                opp.protect = false;
                console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
            } else {
                opp.hp -= Math.floor(this.atk * 2 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))
                console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${Math.floor(this.atk * 2 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))} damage!`)
                //If Opponent Spiky
                if (opp.sStrike_count > 0) {
                    this.hp -= Math.floor(this.atk * 2 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3);
                    console.log(`${this.name} took ${Math.floor(this.atk * 2 (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3)} damage from spikes!`)
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
    

    //Truancy
    spec_2() {
        console.log(`Elvin takes a snack break!`)
    }

    strike(opp) {
        let dice = Math.floor(Math.random() * 4);
        if(this.concussCharge){
            return this.spec_1(opp)
        } else if (dice === 0) {
            return this.attack(opp);
        } else if (dice === 1) {
            return this.spec_1(opp);
        } else {
            return this.spec_2();
        }
    }

}