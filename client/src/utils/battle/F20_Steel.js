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

function fight () {
    console.log(`Battle Start! ${a.name}, ${a.epithet} vs ${e.name}, ${e.epithet}!`);
    a.printStats();
    e.printStats();
    while (a.isAlive() && e.isAlive()){

        a.attack(e)
        e.attack(a, aRavage)
        a.printStats()
        e.printStats()
    }

    if (!a.isAlive()) {
        console.log (`${a.name} perished, ${e.name} has triumphed!`)
    } else {
        console.log(`${e.name} has perished, ${a.name} is victorious!`)
        a.levelUp()
        a.hp = a.maxHp
        console.log(`${a.name} has levelled up!`)
        a.printStats()
    }
}

fight()