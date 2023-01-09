class Enemy {
    constructor(name, epithet, level, hp, atk, spd, standard, special_1, special_2, special_3) {
        this.name = name;
        this.epithet = epithet
        this.level = level;
        this.hp = hp;
        this.atk = atk;
        this.spd = spd;
        this.standard = standard;
        this.special_1 = special_1;
        this.special_2 = special_2;
        this.special_3 = special_3;
    }

    attack(opp, active) {
        opp.hp -= this.atk * (1 + active.ally.ravage * 0.2)
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