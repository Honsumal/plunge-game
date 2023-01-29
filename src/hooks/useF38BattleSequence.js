import { wait } from "../utils/wait";
import { lifeChecker } from "../utils/lifeChecker";
import { turnFinder } from "../utils/turnFinder";
import { playerAction } from "../utils/playerAction";
import { useState, useEffect } from "react";


export const useF38BattleSequence = (sequence, active, a, b, c, e, setRotating, setActive) => {
    const [turn, setTurn] = useState(0);
    const [round, setRound] = useState(0);
    const [inSeq, setInSeq] = useState(false)
    const [slipstream, setSlipstream] = useState (false)

    const [announcerMessage, setAnnouncerMessage] = useState('')

    const [allyGlobalTurnCounter, setAllyTurnCounter] = useState(0)
    const [enemyGlobalTurnCounter, setEnemyTurnCounter] = useState(0)

    let turnCounter = 100;

    useEffect (() => {
        
        const {action, turn} = sequence;
        
        setTurn(turnFinder(active, e, turnCounter, allyGlobalTurnCounter, enemyGlobalTurnCounter, setAllyTurnCounter, setEnemyTurnCounter))
        setRound(round + 1)

        if(turn === 0) {
            playerAction(action, active, a, b, c, e, setActive, setAnnouncerMessage, setInSeq, setRotating, round)
        } else if (turn === 1) {
            (async () => {
                setInSeq(true)
                if ((e.hp < e.maxHp * 0.8 || e.hp === e.maxHp * 0.8) && !slipstream) {
                    setSlipstream(true);
                    e.spd = Math.floor(e.spd * 1.7)
                    setAnnouncerMessage(`The Horde's elden howls call forth a tempest increasing their speed!`)
                    await wait(4000)
                }

                let dice;
    
                e.turnStart();
                if (active.rot) {
                    dice = Math.floor(Math.random() * 2);
                } else {dice = Math.floor(Math.random() * 3);}
                
                if (dice === 0) {
                    //If Opponent Protect
                    if (active.protect) {
                        active.protect = false;
                        setAnnouncerMessage(`Round ${round}: ${e.name}'s attack bounced off the shield, cracking it!`)
                        await wait(2500);

                        e.attack(active);

                        setAnnouncerMessage(`Striking twice,  ${e.name} attacked ${active.name} using ${e.standard} for ${Math.floor(e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5))} damage!`)
                        await wait(2500);

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

                    } else{
                        e.attack(active)
                        setAnnouncerMessage(`Round ${round}: ${e.name} attacked ${active.name} using ${e.standard} for ${Math.floor(e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5))} damage!`)
                        await wait(2500);

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

                        e.attack(active)
                        setAnnouncerMessage(`Striking again, ${e.name} attacked ${active.name} using ${e.standard} for ${Math.floor(e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5))} damage!`)
                        await wait(2500);

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
                } else if (dice === 2) {
                    //If Opponent Protect
                    if (active.protect) {
                        active.protect = false;
                        setAnnouncerMessage(`Round ${round}: ${e.name}'s attack bounced off the shield, cracking it!`);
                        await wait(2500);
                    } else {
                        setAnnouncerMessage(`Round ${round}: ${e.name} attacked ${active.name} using ${e.special_1} for ${Math.floor(e.atk * 0.5 * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5))} damage!`);
                        e.spec_1(active)
                        await wait(2500);

                        //Set Opponent Ravage
                        setAnnouncerMessage(`${active.name} has been poisoned, taking damage over time!`);
                        await wait(2500);

                        //If Opponent Spiky
                        if (active.sStrike_count > 0) {
                            setAnnouncerMessage(`${e.name} took ${Math.floor(e.atk * 0.5 * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5) * 0.3)} damage from spikes!`);
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
                        setAnnouncerMessage(`Round ${round}: ${e.name}'s attack bounced off the shield, cracking it!`)
                        await wait(2500);

                        e.spec_2(active);
                        setAnnouncerMessage(`Striking twice, ${e.name} attacked ${active.name} using ${e.special_2} for ${Math.floor(e.atk * 0.5 * (1 + e.rage * 0.5) * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5))} damage`)
                        await wait(2500);
                        e.rage ++;
                        setAnnouncerMessage(`${e.name}'s rage is building!`);
                        await wait(2500);

                        //If Opponent Spiky
                        if (active.sStrike_count > 0) {
                            setAnnouncerMessage(`${e.name} took ${Math.floor(e.atk * 0.5 * (1 + e.rage * 0.5) * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5) * 0.3)} damage from spikes!`);
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
                    } else{
                        e.spec_2(active);
                        setAnnouncerMessage(`Round ${round}: ${e.name} attacked ${active.name} using ${e.special_2} for ${Math.floor(e.atk * 0.5 * (1 + e.rage * 0.5) * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5))} damage`)
                        await wait(2500);
                        e.rage ++;
                        setAnnouncerMessage(`${e.name}'s rage is building!`);
                        await wait(2500);

                        //If Opponent Spiky
                        if (active.sStrike_count > 0) {
                            setAnnouncerMessage(`${e.name} took ${Math.floor(e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5) * 0.3)} damage from spikes!`);
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

                        e.spec_2(active);
                        setAnnouncerMessage(`Striking twice, ${e.name} attacked ${active.name} using ${e.special_2} for ${Math.floor(e.atk * 0.5 * (1 + e.rage * 0.5) * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5))} damage`)
                        await wait(2500);
                        e.rage ++;
                        setAnnouncerMessage(`${e.name}'s rage is building!`);
                        await wait(2500);

                        //If Opponent Spiky
                        if (active.sStrike_count > 0) {
                            setAnnouncerMessage(`${e.name} took ${Math.floor(e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5) * 0.3)} damage from spikes!`);
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
                }

                if (!active.isAlive() && (a.isAlive() || b.isAlive() || c.isAlive())) {
                    setAnnouncerMessage(`${active.name} has been defeated!`)
                    await wait(2000)
                    setAnnouncerMessage(`Send someone else in!`)
                    setRotating(true);
                }
                setInSeq(false)                
            })().then(() => lifeChecker(a, b, c, e, setAnnouncerMessage));
            
        }
    }, [sequence])

    return {
        turn,
        inSeq,
        announcerMessage
    }
}