import { wait } from "../utils/wait";
import { lifeChecker } from "../utils/lifeChecker";
import { turnFinder } from "../utils/turnFinder";
import { playerAction } from "../utils/playerAction";
import { useState, useEffect } from "react";


export const useF1BattleSequence = (sequence, active, a, b, c, e, setRotating, setActive) => {
    const [turn, setTurn] = useState(0);
    const [inSeq, setInSeq] = useState(false)
    const [dipslay, setDipslay] = useState (false)
    const [announcerMessage, setAnnouncerMessage] = useState('')

    const [allyGlobalTurnCounter, setAllyTurnCounter] = useState(0)
    const [enemyGlobalTurnCounter, setEnemyTurnCounter] = useState(0)

    let turnCounter = 100;

    useEffect (() => {
        
        const {action, turn} = sequence;
        
        setTurn(turnFinder(active, e, turnCounter, allyGlobalTurnCounter, enemyGlobalTurnCounter, setAllyTurnCounter, setEnemyTurnCounter))

        if(turn === 0) {
            playerAction(action, active, a, b, c, e, setActive, setAnnouncerMessage, setInSeq, setRotating)
        } else if (turn === 1) {
            (async () => {
                setInSeq(true)
                if ((e.hp < e.maxHp * 0.65 || e.hp === e.maxHp * 0.65) && !dipslay) {
                    setDipslay(true);
                    active.dipslay = true;
                    active.spd *= 0.5;
                    setAnnouncerMessage(`Feeling the pressure, Melchor uses Dipslay! All allies have their speed halved!`)
                    await wait(3000)
                }
                e.turnStart();

                //If Opponent Protect
                if (active.protect) {
                    active.protect = false;
                    setAnnouncerMessage(`${e.name}'s attack bounced off the shield, cracking it!`)
                    await wait(2500);
                } else{
                    e.attack(active)
                    setAnnouncerMessage(`${e.name} attacked ${active.name} using ${e.standard} for ${Math.floor(e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5))} damage!`)
                    await wait(2500);

                    //If Opponent Spiky
                    if (active.sStrike_count > 0) {
                        e.hp -= Math.floor(e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5) * 0.3);
                        setAnnouncerMessage(`${e.name} took ${Math.floor(e.atk * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5) * 0.3)} damage from spikes!`)
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