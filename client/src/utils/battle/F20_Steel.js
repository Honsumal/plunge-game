const Mack = require('../allies/mack');
const Drake = require('../allies/drake');
const Lionel = require('../allies/lionel')
const Melchor = require('../enemies/melchor');
const inquirer = require('inquirer');

function turnFinder (ally, enemy) {
    let turnCounter = 100;
    let allyTurnCounter = 0;
    let enemyTurnCounter = 0;
    
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

async function F20 (aLv, bLv, cLv) {
    async function playerTurn () {
        await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'what would you like to do?',
                choices: [
                    active.standard,
                    active.special_1,
                    active.rotate
                ]
            },
            {
                type: 'list',
                name: 'rotate',
                message: 'Who do you want to switch in?',
                when: (input) => input.action === active.rotate,
                choices: [
                    a.name,
                    b.name,
                    c.name,
                    'Back'
                ]
            }
        ]).then((answers) => {
            switch (answers.action) {
                case active.standard:
                    active.attack(e);
                    break
                case active.special_1:
                    active.spec_1(e);
                    break
                case active.rotate:
                    if (answers.rotate === 'Back') {
                        return playerTurn();
                    } else if (active.name === answers.rotate) {
                        console.log(`${active.name} is already in combat!`);
                        return tagOut();

                    } else if (a.name === answers.rotate && !a.isAlive() || b.name === answers.rotate && !b.isAlive() || c.name === answers.rotate && !c.isAlive()) {
                        console.log(`${answers.rotate} has fallen, ${active.name} cannot switch out!`);
                        return tagOut();

                    } else {
                        if (a.name === answers.rotate) {
                            active.rotateTo(a);
                            active = a;
                            break
                        } else if (b.name === answers.rotate) {
                            active.rotateTo(b);
                            active = b;
                            break
                        } else if (c.name === answers.rotate) {
                            active.rotateTo(c);
                            active = c;
                            break
                        }
                    }                     
            }
        })

    }
    
    async function tagOut () {
        await inquirer.prompt([{
            type: 'list',
            name: 'rotate',
            message: `Who should tag in?`,
            choices: [
                a.name,
                b.name,
                c.name
            ]
        }]).then((answers) => {
            if (answers.rotate === 'Back') {
                return playerTurn();
            } else if (active.name === answers.rotate) {
                console.log(`${active.name} is already in combat!`)
                return tagOut()

            } else if (a.name === answers.rotate && !a.isAlive() || b.name === answers.rotate && !b.isAlive()) {
                console.log(`${answers.rotate} has fallen, ${active.name} cannot switch out!`)
                return tagOut()

            } else {
                if (a.name === answers.rotate) {
                    active.rotateTo(a);
                    active = a;
                } else if (b.name === answers.rotate) {
                    active.rotateTo(b);
                    active = b;
                }
            } 
        })

    }

    let a = new Mack;
    for (let i = 0; i < aLv; i++) {
        a.levelUp();
    }

    let b = new Drake;
    for (let i = 0; i < bLv; i++) {
        b.levelUp();
    }

    let c = new Lionel;
    for (let i = 0; i < cLv; i++) {
        c.levelUp();
    }

    let e = new Melchor;

    let active = a;
    a.isActive = true;

    let turn = '';

    let dipslay = false;

    let turnCount = 1;

    console.log(`Battle Start! ${a.name}, ${a.epithet} & ${b.name}, ${b.epithet} & ${c.name}, ${c.epithet} vs ${e.name}, ${e.epithet}!`);
    console.log(`${active.name} steps up to fight first!`)
    active.printStats();
    e.printStats();
    console.log(`----------------------------------------------------------------`);

    while ((a.isAlive() || b.isAlive || c.isAlive) && e.isAlive()) {
        console.log(`Turn ${turnCount}`)
        if ((e.hp == e.maxHp * 0.5  && !dipslay) || (e.hp < e.maxHp * 0.5 && !dipslay)) {
            dipslay = true
            console.log(`Feeling the pressure, Melchor uses Dipslay! All allies have their speed halved!`)
        }

        turn = turnFinder(active, e)

        if (turn.name != "Melchor") {
            active.turnStart(dipslay);

            await playerTurn();

        } else {
            e.turnStart();
            e.strike(active);

            if (!active.isAlive()) {
                console.log(`${active.name} has been defeated!`)
                await tagOut();
            }
        }
        active.printStats();
        e.printStats();
        console.log(`----------------------------------------------------------------`);
        turnCount ++
        
    }

    if (!a.isAlive() && !b.isAlive() && !c.isAlive()) {
        console.log (`The party has fallen, ${e.name} has triumphed!`)
        console.log (`Game Over!`)
    } else {
        console.log(`${e.name} has perished, the party is victorious!`)
        a.levelUp();
        a.hp = a.maxHp;
        a.atk = a.baseAtk;
        a.spd = a.baseSpd;
        console.log(`${a.name} has levelled up!`)
        a.printStats()

        b.levelUp();
        b.hp = b.maxHp;
        b.atk = b.baseAtk;
        b.spd = b.baseSpd;
        console.log(`${b.name} has levelled up!`)
        b.printStats()

        c.levelUp();
        c.hp = c.maxHp;
        c.atk = c.baseAtk;
        c.spd = c.baseSpd;
        console.log(`${c.name} has levelled up!`)
        c.printStats()
    }
}

F20(4, 4, 4)