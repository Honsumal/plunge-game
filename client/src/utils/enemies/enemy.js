class Enemy {
    constructor(name, epithet, level, hp, maxHp, atk, spd, standard, special_1, special_2, special_3) {
        this.name = name;
        this.epithet = epithet
        this.level = level;
        this.hp = hp;
        this.maxHp = maxHp;
        this.atk = atk;
        this.spd = spd;
        this.standard = standard;
        this.special_1 = special_1;
        this.special_2 = special_2;
        this.special_3 = special_3;
        this.aRavage = false;
        this.eSlipstream = false;
    }

    attack(opp) {
        opp.hp -= this.atk * (1 + this.aRavage * 0.2)
        opp.hp.toFixed(2)
        console.log(`${this.name} attacked ${opp.name} using ${this.standard} for ${this.atk * (1 + this.aRavage * 0.2)} damage!`)
    }

    turnStart(eSlipstream) {
        if (eSlipstream && !this.eSlipstream) {
            this.spd = this.spd * 1.2;
            this.spd.toFixed(2)
            this.eSlipstream = true;
        }
    }

    printStats() {
        console.log(`Name: ${this.name}, ${this.epithet};`, `Level: ${this.level};` ,`Hp: ${this.hp};`, `Atk: ${this.atk};`, `Spd: ${this.spd}`)
    }

    printActions() {
        console.log(`Standard Attack: ${this.standard};`, `Special 1: ${this.special_1};`, `Special 2: ${this.special_2};`, `Special 3: ${this.special_3}`)
    }

    isAlive() {
        return (this.hp > 0)
    }
}

module.exports = Enemy