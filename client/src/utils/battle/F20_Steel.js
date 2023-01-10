const Mack = require('../allies/mack');
const Drake = require('../allies/drake');
const Melchor = require('../enemies/melchor');
const inquirer = require('inquirer');

// let a = new Mack;
// for (let i = 0; i < 4; i++) {
//     a.levelUp()
// }

let a = new Drake;
for (let i = 0; i < 4; i++) {
    a.levelUp()
}

let e = new Melchor;

let turn = '';

let dipslay = false;

let turnCounter = 100;
let turnCount = 1;
let allyTurnCounter = 0;
let enemyTurnCounter = 0;

function turnFinder (ally, enemy) {
    while (allyTurnCounter < turnCounter && enemyTurnCounter < turnCounter) {
        if (allyTurnCounter > turnCounter && allyTurnCounter > enemyTurnCounter) {
            //console.log (allyTurnCounter, enemyTurnCounter, 1)
            allyTurnCounter -= turnCounter;
            return ally
        } else if (allyTurnCounter = turnCounter && allyTurnCounter > enemyTurnCounter) {
            //console.log (allyTurnCounter, enemyTurnCounter, 2)
            allyTurnCounter -= turnCounter;
            return ally
        } else if (enemyTurnCounter > turnCounter && enemyTurnCounter > allyTurnCounter) {
            //console.log (allyTurnCounter, enemyTurnCounter, 3)
            enemyTurnCounter -= turnCounter;
            return enemy
        } else if (enemyTurnCounter = turnCounter && enemyTurnCounter > allyTurnCounter) {
            //console.log (allyTurnCounter, enemyTurnCounter, 4)
            enemyTurnCounter -= turnCounter;
            return enemy
        }
        allyTurnCounter += ally.spd;
        enemyTurnCounter += enemy.spd;
        //console.log(allyTurnCounter,enemyTurnCounter, 'unga')
    }
}

charTurn = [
    {
        type: 'list',
        name: 'action',
        message: 'what would you like to do?',
        when: a.name === 'Mack',
        choices: [
            'Batter',
            'Pugilistic Strike'
        ]
    },
    {
        type: 'list',
        name: 'action',
        message: 'what would you like to do?',
        when: a.name === 'Drake',
        choices: [
            'Dissonance',
            'Willful Strike'
        ]
    }

]

async function fight () {
    console.log(`Battle Start! ${a.name}, ${a.epithet} vs ${e.name}, ${e.epithet}!`);
    a.printStats();
    e.printStats();
    console.log(`----------------------------------------------------------------`);

    while (a.isAlive() && e.isAlive()) {
        console.log(`Turn ${turnCount}`)
        if ((e.hp == e.maxHp * 0.5  && !dipslay) || (e.hp < e.maxHp * 0.5 && !dipslay)) {
            dipslay = true
            console.log(`Feeling the pressure, Melchor uses Dipslay! All allies have their speed halved!`)
        }

        turn = turnFinder(a, e)

        if (turn.name != "Melchor") {
            a.turnStart(dipslay);
            await inquirer.prompt(charTurn).then((answers) => {
                switch (answers.action) {
                    case 'Batter': 
                        a.attack(e);
                        break
                    case 'Pugilistic Strike':
                        a.spec_1(e);
                        break
                    case 'Dissonance':
                        a.attack(e);
                        break
                    case 'Willful Strike': 
                        a.spec_1(e);
                        break
                }
            })
        } else {
            e.turnStart();
            e.strike(a);
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
        a.levelUp();
        a.hp = a.maxHp;
        a.atk = a.baseAtk;
        a.spd = a.baseSpd;
        console.log(`${a.name} has levelled up!`)
        a.printStats()
    }
}

fight()