import Enemy from "./enemy";

export default class Kyle extends Enemy {
    constructor () {
        const name = "Kyle";
        const epithet = "the Champion of Legend";
        const level = 9;
        const hp = 500;
        const maxHp = 500;
        const atk = 10;
        const spd = 27;
        const move_count = 3;
        const standard = "Audacious Declaration";
        const special_1 = "Power Siphon";
        const special_2 = "Golden Pose"

        super (name, epithet, level, hp, maxHp, atk, spd, move_count, standard, special_1, special_2)
    };

    spec_1 (opp) {
        //If Opponent Protect
        if (opp.protect) {
            opp.protect = false;
            console.log(`${this.name}'s attack bounced off the shield, cracking it!`)
        } else {
            opp.hp -= (Math.floor(this.atk * 0.5 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5)));
            console.log(`${this.name} attacked ${opp.name} for ${Math.floor(this.atk * 0.5 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5))} damage!`)
            if (opp.baseAtk > opp.maxHp && opp.baseAtk > opp.baseSpd) {
                this.atk += opp.level;
                console.log(`${this.name}'s attack increased`);
            } else if (opp.baseSpd > opp.maxHp && opp.baseSpd > opp.baseAtk) {
                this.spd += Math.floor(opp.level * 0.5);
                console.log(`${this.name}'s speed increased`);
            } else {
                this.hp += opp.level * 5
                console.log(`${this.name} recovered some HP`);
            }

            //If Opponent Spiky
            if (opp.sStrike_count > 0) {
                this.hp -= Math.floor(this.atk * 0.5 * (1 + opp.ravage * 0.2) * (1 - opp.barrier * 0.5) * 0.3);
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

    spec_2 () {
        this.protect = true;
        console.log(`${this.name} turns to gold, becoming invulnerable to the next attack!`)
    }
}