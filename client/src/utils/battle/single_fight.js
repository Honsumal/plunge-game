const Mack = require('../allies/mack');
const Melchor = require('../enemies/melchor');

let a = new Mack;
for (let i = 0; i < 4; i++) {
    a.levelUp()
}
let e = new Melchor;
let pStrike_count = 0;
let aRavage = false;
var dipslay = false;

a.printStats()
e.printStats()

// a.attack(e)
// console.log(`${a.name} attacked ${e.name} using ${a.standard} for ${a.atk} damage!`)

// a.spec_1(e, pStrike_count)
// console.log(`${a.name} attacked ${e.name} using ${a.special_1} for ${a.atk * 0.5 * (1 + pStrike_count)} damage!`)
// pStrike_count ++

// e.attack(a, aRavage)
// console.log(`${e.name} attacked ${a.name} using ${e.standard} for ${e.atk * (1 + aRavage * 0.2)} damage!`)


// e.spec_1(a, aRavage)
// console.log(`${e.name} attacked ${a.name} using ${e.special_1} for ${e.atk * 0.8 * (1 + aRavage * 0.2)} damage!`)
// aRavage = !aRavage


console.log(dipslay)
e.hp = 35
e.spec_2(dipslay)


console.log(dipslay)
a.entry(dipslay)

a.printStats()
e.printStats()
