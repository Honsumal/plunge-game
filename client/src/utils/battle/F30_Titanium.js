const Mack = require('../allies/mack');
const Bars = require('../enemies/bars');
const inquirer = require('inquirer');

let a = new Mack;
for (let i = 0; i < 8; i++) {
    a.levelUp()
}
let e = new Bars;

let turn = '';

let dipslay = false
let eSlipstream = false;

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
        choices: [
            'Batter',
            'Pugilistic Strike'
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
        if ((e.hp == e.maxHp * 0.7  && !eSlipstream) || (e.hp < e.maxHp * 0.7 && !eSlipstream)) {
            eSlipstream = true
            console.log(`Bars's fury rose to a fevour pitch! He cast Slipstream!`)
        }

        turn = turnFinder(a, e)

        if (turn.name === "Mack") {;
            a.turnStart();
            await inquirer.prompt(charTurn).then((answers) => {
                switch (answers.action) {
                    case 'Batter': 
                        a.attack(e);
                    case 'Pugilistic Strike':
                        a.spec_1(e);
                }
            })
        } else if (turn.name === "Bars") {
            e.turnStart(eSlipstream);
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
        a.levelUp()
        a.hp = a.maxHp
        console.log(`${a.name} has levelled up!`)
        a.printStats()
    }
}

fight()