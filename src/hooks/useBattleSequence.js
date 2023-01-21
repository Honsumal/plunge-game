import { wait } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";


export const useBattleSequence = (sequence, active, a, b, c, e, setRotating, setActive) => {
    const [turn, setTurn] = useState(0);
    const [inSeq, setInSeq] = useState(false)
    const [dipslay, setDipslay] = useState (false)
    const [announcerMessage, setAnnouncerMessage] = useState('')

    const [allyGlobalTurnCounter, setAllyTurnCounter] = useState(0)
    const [enemyGlobalTurnCounter, setEnemyTurnCounter] = useState(0)

    let turnCounter = 100;

    function turnFinder (ally, enemy) {
        let allyTurnCounter = allyGlobalTurnCounter;
        let enemyTurnCounter = enemyGlobalTurnCounter;

        while (allyTurnCounter < turnCounter && enemyTurnCounter < turnCounter) {
            allyTurnCounter += ally.spd;
            enemyTurnCounter += enemy.spd;
            //console.log(allyTurnCounter,enemyTurnCounter, 'unga')
        }

        if (allyTurnCounter > turnCounter && allyTurnCounter > enemyTurnCounter) {
            //console.log (allyTurnCounter, enemyTurnCounter, 1);
            allyTurnCounter -= turnCounter;
            setAllyTurnCounter(allyTurnCounter);
            setEnemyTurnCounter(enemyTurnCounter);
            return 0
        } else if (allyTurnCounter === turnCounter && allyTurnCounter > enemyTurnCounter) {
            //console.log (allyTurnCounter, enemyTurnCounter, 2);
            allyTurnCounter -= turnCounter;
            setAllyTurnCounter(allyTurnCounter);
            setEnemyTurnCounter(enemyTurnCounter);
            return 0
        } else if (enemyTurnCounter > turnCounter && enemyTurnCounter > allyTurnCounter) {
            //console.log (allyTurnCounter, enemyTurnCounter, 3)
            enemyTurnCounter -= turnCounter;
            setAllyTurnCounter(allyTurnCounter);
            setEnemyTurnCounter(enemyTurnCounter);
            return 1
        } else if (enemyTurnCounter === turnCounter && enemyTurnCounter > allyTurnCounter) {
            //console.log (allyTurnCounter, enemyTurnCounter, 4);
            enemyTurnCounter -= turnCounter;
            setAllyTurnCounter(allyTurnCounter);
            setEnemyTurnCounter(enemyTurnCounter);
            return 1
        } else {
            //console.log(allyTurnCounter, enemyTurnCounter, 5);
            allyTurnCounter -= turnCounter;
            setAllyTurnCounter(allyTurnCounter);
            setEnemyTurnCounter(enemyTurnCounter);
            return 0
        }
            
    }

    async function changeChar(nameNext) {
        setInSeq(true)
        if (active.name === nameNext) {
            setAnnouncerMessage(`${active.name} is already in combat!`);
            await wait(2500);
        } else if ((a.name === nameNext && !a.isAlive()) || (b.name === nameNext && !b.isAlive()) || (c.name === nameNext && !c.isAlive())) {
            setAnnouncerMessage(`${nameNext} has fallen, ${active.name} cannot switch out!`);
            await wait(2500);
        } else {
            if (a.name === nameNext) {
                if (!a.isAlive()) {
                    setAnnouncerMessage (`${a.name} has already fallen, ${active.name} cannot switch to them!`)
                } else {
                    active.rotateTo(a);
                    setActive(a);
                    setAnnouncerMessage (`${active.name} retreated! ${a.name} stepped up to fight!`);
                }

            } else if (b.name === nameNext) {
                if (!b.isAlive()) {
                    setAnnouncerMessage (`${b.name} has already fallen, ${active.name} cannot switch to them!`)
                } else {
                    active.rotateTo(b);
                    setActive(b);
                    setAnnouncerMessage (`${active.name} retreated! ${b.name} stepped up to fight!`);
                }

            } else if (c.name === nameNext) {
                if (!c.isAlive()) {
                    setAnnouncerMessage (`${c.name} has already fallen, ${active.name} cannot switch to them!`)
                } else {
                    active.rotateTo(c);
                    setActive(c);
                    setAnnouncerMessage (`${active.name} retreated! ${c.name} stepped up to fight!`);
                }
            }
            await wait(2500)
            active.turnStart();
            setRotating(false);
            setInSeq(false);
        }  
    }

    useEffect (() => {
        
        const {action, turn} = sequence;
        
        setTurn(turnFinder(active, e))

        if(turn === 0) {
            if (action) {
                switch(action) {
                    case 'standard' :                       
                        (async () => {
                            setInSeq(true);
                            active.turnStart(dipslay);
                            active.attack(e);
                            setAnnouncerMessage(`${active.name} attacked ${e.name} using ${active.standard} for ${active.atk * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5)} damage!`);
                            await wait(2500);
                            //If Willstrike
                            if (active.wStrike_count > 0) {
                                active.hp += active.atk * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3;
                                setAnnouncerMessage(`${active.name} drained ${active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3} health!`);
                                if (active.hp > active.maxHp) {
                                    active.hp = active.maxHp;
                                }
                                await wait(2500);
                            }


                            setInSeq(false);                            
                        })();
                        break
                    case 'special_1' :
                        (async () => {
                            setInSeq(true)
                            active.turnStart(dipslay);
                            active.spec_1(e)
                            if (active.special_1 === 'Pugilistic Strike') {
                                setAnnouncerMessage(`${active.name} attacked ${e.name} using ${active.special_1} for ${active.atk * 0.5 * (active.pStrike_count) * (1 - e.barrier * 0.5)} damage!`)
                                await wait(2500);
                                
                                //If Willstrike
                                if (active.wStrike_count > 0) {
                                    active.hp += active.atk * 0.5 * (1 + active.pStrike_count) * (1 - e.barrier * 0.5) * 0.3;
                                    setAnnouncerMessage(`${active.name} drained ${active.atk * 0.5 * (1 + active.pStrike_count) * (1 - e.barrier * 0.5) * 0.3} health!`);
                                    if (active.hp > active.maxHp) {
                                        active.hp = active.maxHp;
                                    }
                                    await wait(2500);
                                }
                            } else if (active.special_1 === 'Willful Strike') {
                                setAnnouncerMessage(`${active.name} attacked ${e.name} using ${active.special_1} for ${active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5)} damage!`);
                                await wait(2500)
                                
                                //Set Willstrike
                                if(active.wStrike_count === 0) {
                                    active.wStrike_count = 6;
                                    setAnnouncerMessage (`Ally attacks now drain allies for some health!`)
                                    await wait (2500);
                                } else {
                                    setAnnouncerMessage(`${active.name} drained ${active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3} health!`);
                                    if (active.hp > active.maxHp) {
                                        active.hp = active.maxHp;
                                    }
                                    await wait(2500);
                                }

                            } else if (active.special_1 === 'Spiky Strike') {
                                setAnnouncerMessage(`${active.name} attacked ${e.name} using ${active.special_1} for ${(active.atk * 0.8* (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5))} damage!`)
                                await wait(2500);
                                
                                //Set Spiky Shield
                                if (active.sStrike_count === 0) {            
                                    active.sStrike_count = 6;
                                    setAnnouncerMessage(`Spikes from ${active.name}'s attack formed a shield around allies, injuring enemies who attack!`)
                                    await wait(2500);
                                }

                                
                                //If Willstirke
                                if (active.wStrike_count > 0) {
                                    active.hp += active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3;
                                    setAnnouncerMessage(`${active.name} drained ${active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3} health!`);
                                    if (active.hp > active.maxHp) {
                                        active.hp = active.maxHp;
                                    }
                                    await wait(2500);
                                }
                            }
                            setInSeq(false);

                        })();
                        break
                    case 'special_2': 
                        (async () => {
                            setInSeq(true);
                            active.turnStart(dipslay);
                            await wait(2500);

                            if (active.special_2 === 'Ravage') {
                                active.spec_2(e);
                                setAnnouncerMessage(`${active.name} attacked ${e.name} using ${active.special_2} for ${active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5)} damage!`);
                                await wait(2500);

                                //Set Opponent Ravage
                                if (!e.ravage) {
                                    e.ravage = true;
                                    setAnnouncerMessage (`${e.name} has been ravaged, taking extra damage!`);
                                    await wait(2500);
                                }

                                //If Willstirke
                                if (active.wStrike_count > 0) {
                                    await wait(2500);
                                    active.hp += active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3;
                                    setAnnouncerMessage(`${active.name} drained ${active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3} health!`);
                                    if (active.hp > active.maxHp) {
                                        active.hp = active.maxHp;
                                    }
                                    await wait(2500);
                                }
                            } else if (active.special_2 === 'Slipstream') {
                                active.spec_2();
                                setAnnouncerMessage(`${active.name} conjured up magicks to increase allied speed!`);
                                await wait(2500);
                            } else if (active.special_2 === 'Barrier') {
                                active.spec_2();
                                setAnnouncerMessage(`${active.name} formed a barrier around the allies, nullifying some damage!`);
                                await wait(2500);
                            }
                            setInSeq(false)
                        })();
                        break
                    case 'rotating_1':
                        (async () => {
                            changeChar('Mack')
                        })();
                        break
                    case 'rotating_2':
                        (async () => {
                            changeChar('Drake')
                        })();
                        break
                    case 'rotating_3':
                        (async () => {
                            changeChar('Lionel')
                        })();
                        break

                }
            }
        } else if (turn === 1) {
            (async () => {
                setInSeq(true)
                e.turnStart();
                let dice = Math.floor(Math.random() * 2);
                if (dice === 0) {
                    //If Opponent Protect
                    if (active.protect) {
                        active.protect = false;
                        setAnnouncerMessage(`${e.name}'s attack bounced off the shield, cracking it!`)
                        await wait(2500);
                    } else{
                        e.attack(active)
                        setAnnouncerMessage(`${e.name} attacked ${active.name} using ${e.standard} for ${e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5)} damage!`)
                        await wait(2500);

                        //If Opponent Spiky
                        if (active.sStrike_count > 0) {
                            e.hp -= e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5) * 0.3;
                            setAnnouncerMessage(`${e.name} took ${e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5) * 0.3} damage from spikes!`)
                            await wait(2500);
                        }

                        //If Opponent Barrier
                        if (active.barrier) {
                            active.barrier_count --;
                            if (active.barrier_count === 0) {
                                active.barrier = false;
                                setAnnouncerMessage(`${e.name} broke through ${active.name}'s barrier!`);
                                await wait(2500);
                            } else {
                                setAnnouncerMessage(`${active.name}'s barrier can withstand ${active.barrier_count} more hits!`)
                                await wait(2500);
                            }
                        }
                    } 
                } else {
                    //If Opponent Protect
                    if (active.protect) {
                        active.protect = false;
                        setAnnouncerMessage(`${e.name}'s attack bounced off the shield, cracking it!`);
                        await wait(2500);
                    } else {
                        e.spec_1(active)
                        setAnnouncerMessage(`${e.name} attacked ${active.name} using ${e.special_1} for ${e.atk * 0.8 * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5)} damage!`);
                        await wait(2500);

                        //Set Opponent Ravage
                        setAnnouncerMessage(`${active.name} has been ravaged, taking extra damage!`);
                        await wait(2500);

                        //If Opponent Spiky
                        if (active.sStrike_count > 0) {
                            e.hp -= e.atk * 0.8 * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5) * 0.3;
                            setAnnouncerMessage(`${e.name} took ${e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5) * 0.3} damage from spikes!`);
                            await wait(2500);
                        }

                        if (active.barrier) {
                            active.barrier_count --;
                            if (active.barrier_count === 0) {
                                active.barrier = false;
                                setAnnouncerMessage(`${e.name} broke through ${active.name}'s barrier!`);
                                await wait(2500);
                            } else {
                                setAnnouncerMessage(`${active.name}'s barrier can withstand ${active.barrier_count} more hits!`)
                                await wait(2500);
                            }
                        }
                    }
                }

                if (!active.isAlive() && (a.isAlive() || b.isAlive() || c.isAlive())) {
                    setAnnouncerMessage(`${active.name} has been defeated!`)
                    await wait(2500)
                    setAnnouncerMessage(`Send someone else in!`)
                    setRotating(true);
                }
                setInSeq(false)                
            })();
            
        }

    }, [sequence])

    return {
        turn,
        inSeq,
        announcerMessage
    }
}