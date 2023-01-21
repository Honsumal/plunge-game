import Character from "./character";

export default class Lionel extends Character {
    constructor () {
        const name = "Lionel";
        const epithet = "the Starch King";
        const hp = 18;
        const maxHp = 18;
        const atk = 15;
        const baseAtk = 15;
        const spd = 12;
        const baseSpd = 12;
        const standard = "Hammer";
        const special_1 = "Spiky Strike";
        const special_2 = "Barrier";
        const rotate = "Smoke Ball";

        super (name, epithet, hp, maxHp, atk, baseAtk, spd, baseSpd, standard, special_1, special_2, rotate)
    };

    //SStrike
    spec_1(opp) {
        //If Opponent Protect
        if (opp.protect) {
            opp.protect = false;
            console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
        } else {
            opp.hp -= (this.atk * 0.8* (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5));
            console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${(this.atk * 0.8* (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))} damage!`);
            
            
            if (this.sStrike_count === 0) {            
                this.sStrike_count = 6;
                console.log(`Spikes from ${this.name}'s attack formed a shield around allies, injuring enemies who attack!`)
            }

            // If Willstrike
            if (this.wStrike_count > 0) {
                this.hp += this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3;
                console.log(`${this.name} drained ${this.atk * 0.8 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3} health!`);
                if (this.hp > this.maxHp) {
                    this.hp = this.maxHp;
                }
            }

            // If Opponent Barrier
            if (opp.barrier) {
                opp.barrier_count --;
                if (opp.barrier_count === 0) {
                    opp.barrier = false;
                    console.log(`The allies broke through ${opp.name}'s barrier!`);
                } else {
                    console.log(`${opp.name}'s barrier can withstand ${opp.barrier_count} more hits!`)
                }
            }
        }
    }

    spec_2 () {
        this.protect = true;
        this.barrier = true;
        this.barrier_count = 5;
        console.log(`${this.name} formed a barrier around the allies, nullifying some damage!`)
    }

    levelUp () {
        this.level ++;
        this.hp += 3;
        this.maxHp += 3;
        this.atk += 2;
        this.baseAtk += 2;
        this.spd ++;
        this.baseSpd ++;       
    }
}