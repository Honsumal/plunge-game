const Character = require('./character');

class Mack extends Character {
    constructor () {
        const name = "Mack";
        const epithet = "the Stannic Sol";
        const hp = 15;
        const atk = 12;
        const spd = 18;
        const standard = "Batter";
        const special_1 = "Pugilistic Strike";
        const special_2 = "Ravage";
        const rotate = "Disengage";

        super (name, epithet, hp, atk, spd, standard, special_1, special_2, rotate)
    };

    special_1(opp, pStrike_count) {
        opp.hp -= (this.atk * 0.5 * (pStrike_count + 1))
        pStrike_count ++
    }

    rotate(next, active){
        if (active.character === "Mack") {
            active.character = next;
        }
    }

    entry (active) {
        if (active.ally.dipslay) {
            this.spd = this.spd * 0.5;
        }
    }

    levelUp () {
        this.level ++;
        this.hp += 2;
        this.atk ++;
        this.spd += 3;
    }
}

module.exports = Mack