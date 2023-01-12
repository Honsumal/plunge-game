class Character {
    constructor (name, epithet, hp, maxHp, atk, baseAtk, spd, baseSpd, standard, special_1, special_2, rotate) {
        this.name = name;
        this.epithet = epithet
        this.level = 1;
        this.hp = hp;
        this.maxHp = maxHp;
        this.atk = atk;
        this.baseAtk = baseAtk;
        this.spd = spd;
        this.baseSpd = baseSpd;
        this.standard = standard;
        this.special_1 = special_1;
        this.special_2 = special_2;
        this.rotate = rotate;
        this.isActive = false;
        this.dipslay = false;
        this.ravage = false;
        this.pStrike_count = 0;
        this.wStrike_count = 0;
        this.sStrike_count = 0;
    }

    attack(opp) {
        if (this.wStrike_count === 0) {
            opp.hp -= this.atk;
            opp.hp = parseFloat(opp.hp.toFixed(2));
            console.log(`${this.name} attacked ${opp.name} using ${this.standard} for ${(this.atk).toFixed(2)} damage!`);
        } else {
            opp.hp -= this.atk;
            this.hp += this.atk * 0.3;
            opp.hp = parseFloat(opp.hp.toFixed(2));
            this.hp = parseFloat(this.hp.toFixed(2));
            console.log(`${this.name} attacked ${opp.name} using ${this.standard} for ${(this.atk).toFixed(2)} damage!`);
            console.log(`${this.name} recovered ${this.atk * 0.3} health!`);
            if (this.hp > this.maxHp) {
                this.hp = this.maxHp;
            }
        }
    }

    rotateTo(next){
        if (this.name === next.name) {
            console.log(`${this.name} is already in combat!`)
        }

        if (next.isAlive()) {
            this.isActive = false;
            this.atk = this.baseAtk;
            this.spd = this.baseSpd;

            next.sStrike_count = this.sStrike_count;
            next.wStrike_count = this.wStrike_count;

            next.isActive = true;
            console.log(`${this.name} retreated! ${next.name} stepped up to fight!`)
        } else {
            console.log(`${next.name} has already fallen, ${this.name} cannot switch out!`)
        }
    }

    turnStart (dipslay) {
        if (dipslay && !this.dipslay) {
            this.spd = this.spd * 0.5;
            this.spd = parseFloat(this.spd.toFixed(2));
            this.dipslay = true;
        };

        if (this.sStrike_count > 0) {
            this.sStrike_count --;
            if (this.sStrike_count > 0) {
                console.log(`Spiky Strike active for ${this.sStrike_count} more turns!`)
            } else {
                console.log(`Spiky Strike has worn off!`)
            }
        };

        if (this.wStrike_count > 0) {
            this.wStrike_count --;
            if (this.wStrike_count > 0) {
                console.log(`Willful Strike active for ${this.wStrike_count} more turns!`)
            } else {
                console.log(`Willful Strike has worn off!`)
            }
        };

        this.hp = parseFloat(this.hp.toFixed(2));
        this.atk = parseFloat(this.atk.toFixed(2));
        this.spd = parseFloat(this.spd.toFixed(2));
    }

    printStats() {
        console.log(`Name: ${this.name}, ${this.epithet}; `, `Level: ${this.level};` ,`Hp: ${this.hp};`, `Atk: ${this.atk};`, `Spd: ${this.spd}`)
    }

    printActions() {
        console.log(`Standard Attack: ${this.standard};`, `Special 1: ${this.special_1};`, `Special 2: ${this.special_2};`, `Rotation Move: ${this.rotate}`)
    }

    isAlive() {
        return (this.hp > 0)
    }
}

module.exports = Character