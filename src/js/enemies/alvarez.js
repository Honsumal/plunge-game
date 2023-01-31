import Enemy from "./enemy";

export default class Alvarez extends Enemy {
    constructor () {
        const name = "Alvarez";
        const epithet = "the Biohazard";
        const level = 4;
        const hp = 500;
        const maxHp = 500;
        const atk = 7;
        const spd = 17;
        const move_count = 2;
        const standard = "Wrestle";
        const special_1 = "Festering Fist";

        super (name, epithet, level, hp, maxHp, atk, spd, move_count, standard, special_1)
    };

    //Festering Fist (ignores protect & barrier)
    spec_1 (opp){
        opp.hp -= Math.floor(this.atk * 0.5 * (1 + opp.ravage * 0.2));
        console.log(`${this.name} attacked ${opp.name} using ${this.special_1} for ${Math.floor(this.atk * 0.5 * (1 + opp.ravage * 0.2))} damage!`);
        
        opp.rot = true
        console.log(`${this.name}'s strike caused damage over time on ${opp.name}`)
        
        //If Opponent Spiky
        if (opp.sStrike_count > 0) {
            this.hp -= Math.floor(this.atk * 0.5 * (1 + opp.ravage * 0.2) * 0.3);
            console.log(`${this.name} took ${Math.floor(this.atk * 0.5 * (1 + opp.ravage * 0.2) * 0.3)} damage from spikes!`)
        }

    }

    strike (opp) {
        let dice = Math.floor(Math.random() * 3);
        if (dice === 0 || dice === 1) {
            return this.attack(opp);
        } else {
            return this.spec_1(opp);
        }
    }

}
