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
                            active.turnStart(dipslay)
                            setInSeq(true);
                            active.attack(e);
                            setAnnouncerMessage(`${active.name} attacked ${e.name} using ${active.standard} for ${active.atk * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5)} damage!`);
                            await wait(3000);

                            setInSeq(false);                            
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
                    await wait(3000)
                    
                } else {
                    e.spec_1(active)
                    setAnnouncerMessage(`${e.name} attacked ${active.name} using ${e.special_1} for ${e.atk * 0.8 * (1 + active.ravage * 0.2) * (1 - active.barrier * 0.5)} damage!`)
                    await wait(3000)
                }

                if (!active.isAlive() && (a.isAlive() || b.isAlive() || c.isAlive())) {
                    setAnnouncerMessage(`${active.name} has been defeated!`)
                    await wait(3000)
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