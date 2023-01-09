class Character {
    constructor (name, epithet, hp, atk, spd, standard, special_1, special_2, rotate) {
        this.name = name;
        this.epithet = epithet
        this.level = 1;
        this.atk = atk;
        this.hp = hp;
        this.spd = spd;
        this.standard = standard;
        this.special_1 = special_1;
        this.special_2 = special_2;
        this.rotate = rotate;
    }

    attack(opp) {
        opp.hp -= this.atk
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