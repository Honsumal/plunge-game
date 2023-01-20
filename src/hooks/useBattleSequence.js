import { wait } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";


export const useBattleSequence = (sequence, active, a, b, c, e, setRotating) => {
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
                            //If Willstrike
                            if (active.wStrike_count > 0) {
                                await wait(2500)
                                active.hp += active.atk * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3;
                                setAnnouncerMessage(`${active.name} drained ${active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3} health!`);
                                if (active.hp > active.maxHp) {
                                    active.hp = active.maxHp;
                                }
                            }

                            await wait(2500);

                            setInSeq(false);                            
                        })();
                        break
                    case 'special_1' :
                        (async () => {
                            setInSeq(true)
                            active.turnStart(dipslay);
                            active.spec_1(e)
                            if (active.special_1 === 'Pugilistic Strike') {
                                setAnnouncerMessage(`${active.name} attacked ${e.name} using ${active.special_1} for ${active.atk * 0.5 * (1 + active.pStrike_count) * (1 - e.barrier * 0.5)} damage!`)
                                active.pStrike_count ++;
                                
                                //If Willstrike
                                if (active.wStrike_count > 0) {
                                    await wait(2500)
                                    active.hp += active.atk * 0.5 * (1 + active.pStrike_count) * (1 - e.barrier * 0.5) * 0.3;
                                    setAnnouncerMessage(`${active.name} drained ${active.atk * 0.5 * (1 + active.pStrike_count) * (1 - e.barrier * 0.5) * 0.3} health!`);
                                    if (active.hp > active.maxHp) {
                                        active.hp = active.maxHp;
                                    }
                                }

                                await wait(2500);
                                setInSeq(false)
                            } else if (active.special_1 === 'Willful Strike') {
                                setAnnouncerMessage(`${active.name} attacked ${e.name} using ${active.special_1} for ${active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5)} damage!`);
                                await wait(2500)
                                
                                //Set Willstrike
                                if(active.wStrike_count === 0) {
                                    active.wStrike_count = 6;
                                    setAnnouncerMessage (`Ally attacks now drain allies for some health!`)
                                } else {
                                    setAnnouncerMessage(`${active.name} drained ${active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3} health!`);
                                    if (active.hp > active.maxHp) {
                                        active.hp = active.maxHp;
                                    }
                                }
                                await wait(2500);
                                setInSeq(false);
                            } else if (active.special_1 === 'Spiky Strike') {
                                setAnnouncerMessage(`${active.name} attacked ${e.name} using ${active.special_1} for ${(active.atk * 0.8* (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5))} damage!`)
                                await wait(2500);
                                
                                //Set Spiky Shield
                                if (active.sStrike_count === 0) {            
                                    active.sStrike_count = 6;
                                    console.log(`Spikes from ${active.name}'s attack formed a shield around allies, injuring enemies who attack!`)
                                }
                                
                                //If Willstirke
                                if (active.wStrike_count > 0) {
                                    await wait(2500);
                                    active.hp += active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3;
                                    console.log(`${active.name} drained ${active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3} health!`);
                                    if (active.hp > active.maxHp) {
                                        active.hp = active.maxHp;
                                    }
                                }
                                await wait(2500);
                                setInSeq(false);
                            }

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
                    e.attack(active)
                    setAnnouncerMessage(`${e.name} attacked ${active.name} using ${e.standard} for ${e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5)} damage!`)
                    await wait(2500)
                    
                } else {
                    e.spec_1(active)
                    setAnnouncerMessage(`${e.name} attacked ${active.name} using ${e.special_1} for ${e.atk * 0.8 * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5)} damage!`)
                    await wait(2500)
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