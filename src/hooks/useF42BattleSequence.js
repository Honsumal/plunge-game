import { wait } from "../utils/wait";
import { lifeChecker } from "../utils/lifeChecker";
import { turnFinder } from "../utils/turnFinder";
import { playerAction } from "../utils/playerAction";
import { useState, useEffect } from "react";


export const useF42BattleSequence = (sequence, active, a, b, c, e, setRotating, setActive) => {
    const [turn, setTurn] = useState(0);
    const [round, setRound] = useState(0);
    const [inSeq, setInSeq] = useState(false);

    const [deterius, setDeterius] = useState(false);
    const [awakening, setAwakening] = useState(false);

    const [announcerMessage, setAnnouncerMessage] = useState('');

    const [allyGlobalTurnCounter, setAllyTurnCounter] = useState(0)
    const [enemyGlobalTurnCounter, setEnemyTurnCounter] = useState(0)

    let turnCounter = 100;

    useEffect (() => {
        
        const {action, turn} = sequence;
        
        setTurn(turnFinder(active, e, turnCounter, allyGlobalTurnCounter, enemyGlobalTurnCounter, setAllyTurnCounter, setEnemyTurnCounter))
        setRound(round + 1)

        if(turn === 0) {
            playerAction(action, active, a, b, c, e, setActive, setAnnouncerMessage, setInSeq, setRotating, round, deterius)
        } else if (turn === 1) {
            (async () => {
                setInSeq(true)    
                e.turnStart();
                //Rocks
                if ((e.hp < e.maxHp * 0.9 || e.hp === e.maxHp * 0.9) && !deterius) {
                    setDeterius(true);
                    setAnnouncerMessage(`Kurosawa uses Diamond Deterius, scattering hazards across the battlefield`)
                    await wait(3500)
                }

                //Soft Enrage
                if ((e.hp < e.maxHp * 0.4 || e.hp === e.maxHp * 0.4) && !awakening) {
                    setAwakening(true)
                    setAnnouncerMessage(`Acknowledging her opponents, Kurosawa begins to awaken her power!`)
                    await wait(3500)
                }

                //Enrage Timer
                if(awakening) {
                    if (e.enrage_timer === 0) {
                        e.enrage = true;
                        e.atk *= 10;
                        e.spd *= 2;
                        setAnnouncerMessage(`Kurosawa's power has awoken!`)
                        await wait (2500);
                    } else {
                        e.enrage_timer --;
                        setAnnouncerMessage(`Kurosawa's power continues to grow`)
                        await wait (2500);
                    }
                }
                //Enrage Cast
                if (e.enrage) {
                    setAnnouncerMessage(`You were formidable, but your story ends here!`);
                    await wait (2500);
                    active.hp -= e.atk;
                    setAnnouncerMessage(`${e.name} extirpated ${active.name} using Sunshine, dealing ${e.atk} damage!`);
                    await wait(2500);
                    setAnnouncerMessage(`It is a one hit KO!`)
                    await wait(2500);
                } else {
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
                        e.spec_1(active)
                        setAnnouncerMessage(`${e.name} uses Ruby Requiem! ${active.name}'s days are numbered!`);
                        await wait (2500);
                    } else {
                        e.spec_2()
                        setAnnouncerMessage(`${e.name} uses ${e.special_2}, ready to dodge the next attack`)
                        await wait(2500);
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