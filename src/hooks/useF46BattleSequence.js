import { wait } from "../utils/wait";
import { lifeChecker } from "../utils/lifeChecker";
import { turnFinder } from "../utils/turnFinder";
import { playerAction } from "../utils/playerAction";
import { useState, useEffect } from "react";


export const useF46BattleSequence = (sequence, active, a, b, c, e, setRotating, setActive) => {
    const [turn, setTurn] = useState(0);
    const [round, setRound] = useState(0);
    const [inSeq, setInSeq] = useState(false);

    const [ult, setUlt] = useState(false);

    const [announcerMessage, setAnnouncerMessage] = useState('');

    const [allyGlobalTurnCounter, setAllyTurnCounter] = useState(0)
    const [enemyGlobalTurnCounter, setEnemyTurnCounter] = useState(0)

    let turnCounter = 100;
    let field = "icy"

    useEffect (() => {
        
        const {action, turn} = sequence;
        
        setTurn(turnFinder(active, e, turnCounter, allyGlobalTurnCounter, enemyGlobalTurnCounter, setAllyTurnCounter, setEnemyTurnCounter))
        setRound(round + 1)

        if(turn === 0) {
            playerAction(action, active, a, b, c, e, setActive, setAnnouncerMessage, setInSeq, setRotating, round, field)
        } else if (turn === 1) {
            (async () => {
                setInSeq(true);

                if ((e.hp < e.maxHp * 0.5 || e.hp === e.maxHp * 0.5) && !ult) {
                    setUlt(true)
                    let hijacked = a;
                    if (b.turnCount > a.turnCount && b.turnCount > c.turnCount) {
                        hijacked = b;
                    } else if (c.turnCount > a.turnCount && c.turnCount > b.turnCount) {
                        hijacked = c;
                    }
                    
                    if (hijacked.baseAtk > hijacked.baseSpd && hijacked.baseAtk > hijacked.maxHp) {
                        //Maelstrom
                        e.atk *= 1.5;
                        e.spd *= 1.5;
                        setAnnouncerMessage(`Taking ${hijacked.name}'s power, ${e.name} uses Maelstrom, increasing his attack and spd!`);
                        await wait(2500)
                    } else if (hijacked.baseSpd > hijacked.baseAtk && hijacked.baseSpd > hijacked.maxHp) {
                        //Terror Unleashed
                        a.ravage = true;
                        b.ravage = true;
                        c.ravage = true;
                        setAnnouncerMessage(`Taking ${hijacked.name}'s power, ${e.name} uses Terror Unleased, ravaging all his foes`);
                        await wait(3000);
                    } else {
                        //Hallowed Ground
                        e.protect = true;
                        e.barrier = true;
                        e.barrier_count = 5;
                        setAnnouncerMessage(`Taking ${hijacked.name}'s power, ${e.name} uses Hallowed Ground, blocking several of the next attacks!`);
                        await wait(2500);
                    }
                }

                e.turnStart();
                let dice = Math.floor(Math.random() * 4);
                if(dice === 0 || dice === 1) {
                    //If Opponent Protect
                    if (active.protect) {
                        active.protect = false;
                        setAnnouncerMessage(`Round ${round}: ${e.name}'s attack bounced off the shield, cracking it!`)
                        await wait(2500);
                    } else {
                        e.attack(active)
                        setAnnouncerMessage(`Round ${round}: ${e.name} attacked ${active.name} using ${e.standard} for ${Math.floor(e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5))} damage!`)
                        await wait(2500);

                        setAnnouncerMessage(`I am named Kyle!`);
                        await wait(2500);

                        //If Opponent Spiky
                        if (active.sStrike_count > 0) {
                            //e.hp -= Math.floor(e.atk * 0.8 * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5) * 0.3);
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
                } else if (dice === 2) {
                    if (active.protect) {
                        setAnnouncerMessage(`Round ${round}: ${e.name}'s attack bounced off the shield, cracking it!`)
                    } else {
                        e.spec_1(active)
                        setAnnouncerMessage(`Round ${round}: ${e.name} attacked ${active.name} using ${e.special_1} for ${Math.floor(e.atk * 0.5 * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5))} damage!`);
                        await wait (2500);
                        if (active.baseAtk > active.maxHp && active.baseAtk > active.baseSpd) {
                            setAnnouncerMessage(`${this.name}'s attack increased`);
                            await wait(2500);
                        } else if (active.baseSpd > active.maxHp && active.baseSpd > active.baseAtk) {
                            setAnnouncerMessage(`${this.name}'s speed increased`);
                            await wait(2500);
                        } else {
                            setAnnouncerMessage(`${this.name} recovered some HP`);
                            await wait(2500);
                        }

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
                    e.spec_2()
                    setAnnouncerMessage(`${e.name} uses ${e.special_2}, turning to gold and becoming invulnerable!`)
                    await wait(2500);
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