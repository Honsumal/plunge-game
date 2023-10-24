import { lifeChecker } from "./lifeChecker";
import { wait } from "./wait";
import { changeChar } from "./changeChar";
import { turnEnd } from "./turnEnd";

export function playerAction(action, active, a, b, c, e, setActive, setAnnouncerMessage, setInSeq, setRotating, round, field, deterius) {
    active.turnCount ++;
    if (action) {
        switch(action) {
            case 'standard' :                       
                (async () => {
                    setInSeq(true);
                    //active.turnStart();
                    //If Opponent Protect
                    if(e.protect){
                        e.protect = false;
                        setAnnouncerMessage(`Round ${round}: ${active.name}'s attack broke the guard!`);
                    } else {
                        active.attack(e);
                        setAnnouncerMessage(`Round ${round}: ${active.name} attacked ${e.name} using ${active.standard} for ${Math.floor(active.atk * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5))} damage!`);
                        await wait(2500);

                        //If Willstrike
                        if (active.wStrike_count > 0) {
                            //active.hp += Math.floor(active.atk * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3);
                            setAnnouncerMessage(`${active.name} drained ${Math.floor(active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * (1 - active.rot * 0.7) * 0.15)} health!`);
                            if (active.hp > active.maxHp) {
                                active.hp = active.maxHp;
                            }
                            await wait(2500);
                        }

                        //If Opponent Barrier
                        if (e.barrier) {
                            e.barrier_count --;
                            if (e.barrier_count === 0) {
                                e.barrier = false;
                                setAnnouncerMessage(`${active.name} broke through ${e.name}'s barrier!`);
                                await wait(2500);
                            } else {
                                setAnnouncerMessage(`${e.name}'s guard can withstand ${e.barrier_count} more hits!`)
                                await wait(2500);
                            }
                        }
                        
                    }
                    await turnEnd(active, setAnnouncerMessage, a, b, c, setRotating, field);
                    //await wait(2500);
                    setInSeq(false);                            
                })().then(() => lifeChecker(a, b, c, e, setAnnouncerMessage));
                
                break
            case 'special_1' :
                (async () => {
                    setInSeq(true)
                    //active.turnStart();
                    //If Opponent Protect
                    if(e.protect){
                        e.protect = false;
                        setAnnouncerMessage(`Round ${round}: ${active.name}'s attack broke the guard!`);
                    } else {
                        active.spec_1(e)
                        if (active.special_1 === 'Pugilistic Strike') {
                            setAnnouncerMessage(`Round ${round}: ${active.name} attacked ${e.name} using ${active.special_1} for ${Math.floor(active.atk * 0.5 * (1 + (active.pStrike_count - 1) * 0.5) * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5))} damage!`)
                            await wait(2500);
                            
                            //If Willstrike
                            if (active.wStrike_count > 0) {
                                //active.hp += Math.floor(active.atk * 0.5 * (1 + active.pStrike_count) * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3);
                                setAnnouncerMessage(`${active.name} drained ${Math.floor(active.atk * 0.5 * (1 + (active.pStrike_count - 1) * 0.5) * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * (1 - active.rot * 0.7) * 0.15)} health!`);
                                if (active.hp > active.maxHp) {
                                    active.hp = active.maxHp;
                                }
                                await wait(2500);
                            }

                            if (field === 'Icy') {
                                active.spd += Math.floor(active.baseSpd * 0.2)
                                setAnnouncerMessage(`Sliding on the icy field boosted ${active.name}'s speed!`)
                                await wait(2500)
                            }
                        } else if (active.special_1 === 'Willful Strike') {
                            setAnnouncerMessage(`Round ${round}: ${active.name} attacked ${e.name} using ${active.special_1} for ${Math.floor(active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5))} damage!`);
                            await wait(2500)
                            
                            //Set Willstrike
                            if(active.wStrike_count === 0) {
                                active.wStrike_count = 6;
                                setAnnouncerMessage (`Ally attacks now drain allies for some health!`)
                                await wait (2500);
                            } else {
                                setAnnouncerMessage(`${active.name} drained ${Math.floor(active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * (1 - active.rot * 0.7) * 0.15)} health!`);
                                if (active.hp > active.maxHp) {
                                    active.hp = active.maxHp;
                                }
                                await wait(2500);
                            }

                        } else if (active.special_1 === 'Spiky Strike') {
                            setAnnouncerMessage(`Round ${round}: ${active.name} attacked ${e.name} using ${active.special_1} for ${Math.floor(active.atk * 0.8* (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5))} damage!`)
                            await wait(2500);
                            
                            //Set Spiky Shield
                            if (active.sStrike_count === 0) {            
                                active.sStrike_count = 6;
                                setAnnouncerMessage(`Spikes from ${active.name}'s attack formed a shield around allies, injuring enemies who attack!`)
                                await wait(2500);
                            }

                            
                            //If Willstrike
                            if (active.wStrike_count > 0) {
                                //active.hp += Math.floor(active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3);
                                setAnnouncerMessage(`${active.name} drained ${Math.floor(active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * (1 - active.rot * 0.7) * 0.15)} health!`);
                                if (active.hp > active.maxHp) {
                                    active.hp = active.maxHp;
                                }
                                await wait(2500);
                            }

                            if (field === 'crystalline') {
                                active.atk += Math.floor(active.atk * 0.2)
                                setAnnouncerMessage(`The crystalline field augments ${active.name}'s attacks!`)
                                await wait(2500);
                            }
                        };

                        //If Opponent Barrier
                        if (e.barrier) {
                            e.barrier_count --;
                            if (e.barrier_count === 0) {
                                e.barrier = false;
                                setAnnouncerMessage(`${active.name} broke through ${e.name}'s barrier!`);
                                await wait(2500);
                            } else {
                                setAnnouncerMessage(`${e.name}'s guard can withstand ${e.barrier_count} more hits!`)
                                await wait(2500);
                            }
                        }
                    }
                    await turnEnd(active, setAnnouncerMessage, a, b, c, setRotating, field);
                    //await wait(2500);
                    setInSeq(false);

                })().then(() => lifeChecker(a, b, c, e, setAnnouncerMessage));
                break
            case 'special_2': 
                (async () => {
                    setInSeq(true);
                    //active.turnStart();

                    if (active.special_2 === 'Ravage') {
                        //If Opponent Protect
                        if(e.protect){
                            e.protect = false;
                            setAnnouncerMessage(`Round ${round}: ${active.name}'s attack broke the guard!`);
                        } else {
                            active.spec_2(e);
                            setAnnouncerMessage(`Round ${round}: ${active.name} attacked ${e.name} using ${active.special_2} for ${Math.floor(active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5))} damage!`);
                            await wait(2500);

                            //Set Opponent Ravage

                            e.ravage = true;
                            setAnnouncerMessage (`${e.name} has been ravaged, taking extra damage!`);
                            await wait(2500);

                            if (field === 'diamond') {
                                e.spd -= Math.floor(e.spd * 0.2)
                                setAnnouncerMessage(`Hitting the diamond field lowered ${e.name}'s speed!`)
                            }
                            

                            //If Willstrike
                            if (active.wStrike_count > 0) {
                                await wait(2500);
                                //active.hp += Math.floor(active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * 0.3);
                                setAnnouncerMessage(`${active.name} drained ${Math.floor(active.atk * 0.8 * (1 + e.ravage * 0.2) * (1 - e.barrier * 0.5) * (1 - active.rot * 0.7) * 0.15)} health!`);
                                if (active.hp > active.maxHp) {
                                    active.hp = active.maxHp;
                                }
                                await wait(2500);
                            }

                            //If Opponent Barrier
                            if (e.barrier) {
                                e.barrier_count --;
                                if (e.barrier_count === 0) {
                                    e.barrier = false;
                                    setAnnouncerMessage(`${active.name} broke through ${e.name}'s barrier!`);
                                    await wait(2500);
                                } else {
                                    setAnnouncerMessage(`${e.name}'s guard can withstand ${e.barrier_count} more hits!`)
                                    await wait(2500);
                                }
                            }
                        }  
                    } else if (active.special_2 === 'Slipstream') {
                        active.spec_2();
                        setAnnouncerMessage(`Round ${round}: ${active.name} conjured up magicks to increase allied speed!`);
                        await wait(2500);
                        if (field === 'steel'){
                            active.spd += Math.floor(active.baseSpd * 0.2)
                            setAnnouncerMessage(`The steel field further increased ${active.name}'s speed!`)
                            await wait(2500);
                        }
                    } else if (active.special_2 === 'Barrier') {
                        active.spec_2();
                        setAnnouncerMessage(`Round ${round}: ${active.name} formed a barrier around the allies, nullifying some damage!`);
                        await wait(2500);
                        if (field === 'titanium') {
                            active.barrier_count += 2
                            setAnnouncerMessage(`The titanium field augments the barrier!`)
                        }
                    }
                    await turnEnd(active, setAnnouncerMessage, a, b, c, setRotating, field);
                    //await wait(2500);
                    setInSeq(false)
                })().then(() => lifeChecker(a, b, c, e, setAnnouncerMessage));
                break
            case 'rotating_1':
                (async () => {
                    changeChar('Mack', active, a, b, c, setInSeq, setActive, setAnnouncerMessage, deterius, field);
                    setRotating(false);
                })();
                break
            case 'rotating_2':
                (async () => {
                    changeChar('Drake', active, a, b, c, setInSeq, setActive, setAnnouncerMessage, deterius, field);
                    setRotating(false);
                })();
                break
            case 'rotating_3':
                (async () => {
                    changeChar('Lionel', active, a, b, c, setInSeq, setActive, setAnnouncerMessage, deterius, field);
                    setRotating(false);
                })();
                break

        }
    }
} 