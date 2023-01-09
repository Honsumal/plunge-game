const Mack = require('../allies/mack');
const Melchor = require('../enemies/melchor');

let a = new Mack;
for (let i = 0; i < 4; i++) {
    a.levelUp()
}
let e = new Melchor;

let turn = '';

let pStrike_count = 0;
let aRavage = false;
let dipslay = false;

let turnCounter = 100;
let turnCount = 1;
let allyTurnCounter = 0;
let enemyTurnCounter = 0;

function turnFinder (ally, enemy) {
    while (allyTurnCounter < turnCounter && enemyTurnCounter < turnCounter) {
        if (allyTurnCounter > turnCounter && allyTurnCounter > enemyTurnCounter) {
            console.log (allyTurnCounter, enemyTurnCounter, 1)
            allyTurnCounter -= turnCounter;
            return ally
        } else if (allyTurnCounter = turnCounter && allyTurnCounter > enemyTurnCounter) {
            console.log (allyTurnCounter, enemyTurnCounter, 2)
            allyTurnCounter -= turnCounter;
            return ally
        } else if (enemyTurnCounter > turnCounter && enemyTurnCounter > allyTurnCounter) {
            console.log (allyTurnCounter, enemyTurnCounter, 3)
            enemyTurnCounter -= turnCounter;
            return enemy
        } else if (enemyTurnCounter = turnCounter && enemyTurnCounter > allyTurnCounter) {
            console.log (allyTurnCounter, enemyTurnCounter, 4)
            enemyTurnCounter -= turnCounter;
            return enemy
        }
        allyTurnCounter += ally.spd;
        enemyTurnCounter += enemy.spd;
        console.log(allyTurnCounter,enemyTurnCounter, 'unga')
    }
}

function fight () {
    console.log(`Battle Start! ${a.name}, ${a.epithet} vs ${e.name}, ${e.epithet}!`);
    a.printStats();
    e.printStats();
    console.log(`----------------------------------------------------------------`);

    while (a.isAlive() && e.isAlive()){
        console.log(`Turn ${turnCount}`)
        if ((e.hp == e.maxHp * 0.5  && !dipslay) || (e.hp < e.maxHp * 0.5 && !dipslay)) {
            dipslay = true
            console.log(`Feeling the pressure, Melchor uses Dipslay! All allies have their speed halved!`)
        }

        turn = turnFinder(a, e)

        if (turn.name === "Mack") {
            a.turnStart(dipslay);
            a.attack(e);
        } else if (turn.name === "Melchor") {
            e.turnStart();
            e.attack(a, aRavage);
        }
        a.printStats();
        e.printStats();
        console.log(`----------------------------------------------------------------`);
        turnCount ++
    }

    if (!a.isAlive()) {
        console.log (`${a.name} perished, ${e.name} has triumphed!`)
        console.log (`Game Over!`)
    } else {
        console.log(`${e.name} has perished, ${a.name} is victorious!`)
        a.levelUp()
        a.hp = a.maxHp
        console.log(`${a.name} has levelled up!`)
        a.printStats()
    }
}

fight()