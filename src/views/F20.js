import React, {useEffect, useState} from "react";
import Mack from "../js/allies/mack"
import Drake from "../js/allies/drake"
import Lionel from "../js/allies/lionel"
import Melchor from "../js/enemies/melchor"
import CombatantSummary from "../components/CombatantSummary";
import Actions from "../components/Actions";
import Rotations from "../components/Rotations";
import FightLog from "../components/FightLog";
import { useBattleSequence } from "../hooks/useBattleSequence";
import { wait } from "../utils/wait";

export default function F20 () {
    let aPrime = new Mack();
    
    let bPrime = new Drake();

    let cPrime = new Lionel();
    
    let ePrime = new Melchor();

    for (let i = 0; i < 4; i++) {aPrime.levelUp()}
    for (let i = 0; i < 4; i++) {bPrime.levelUp()}
    for (let i = 0; i < 4; i++) {cPrime.levelUp()}

    const [a, setA] = useState(aPrime)
    const [b, setB] = useState(bPrime)
    const [c, setC] = useState(cPrime)
    const [e, setE] = useState(ePrime)
    
    const [active, setActive] = useState(a);
    
    //add all the other attacks
    // const [playerTurn, setPlayerTurn] = useState(false);
    const [rotating, setRotating] = useState(false);
    const [sequence, setSequence] = useState({})

    //const [aDipslay, setADipslay] = useState(false);
    // const [aRavage, setARavage] = useState(false);
    // const [aProtect, setAProtect] = useState(false);
    // const [aBarrier, setABarrier] = useState(false);

    // const [aBarrierCount, setABarrierCount] = useState(0);
    // const [aPStrikeCount, setAPStrikeCount] = useState(0);
    // const [aWStrikeCount, setAWStrikeCount] = useState(0);
    // const [aSSTrikeCount, setASStrikeCount] = useState(0);
    // const [aSlipstreamCount, setASlipstreamCount] = useState(0);

    // const [eRavage, setERavage] = useState(false);
    // const [eProtect, setEProtect] = useState(false);
    // const [eBarrier, setEBarrier] = useState(false);
    // const [eSlipstream, setEDSlipstream] = useState(false);

    // const [eBarrierCount, setEBarrierCount] = useState(0);
    // const [eWStrikeCount, setEWStrikeCount] = useState(0);

    // const[aHp, setAHp] = useState(a.maxHp);
    // const[aAtk, setAAtk] = useState(a.baseAtk);
    // const[aSpd, setASpd] = useState(a.baseSpd);

    // const[bHp, setBHp] = useState(b.maxHp);
    // const[bAtk, setBAtk] = useState(b.baseAtk);
    // const[bSpd, setBSpd] = useState(b.baseSpd);

    // const[cHp, setCHp] = useState(c.maxHp);
    // const[cAtk, setACtk] = useState(c.baseAtk);
    // const[cSpd, setCSpd] = useState(c.baseSpd);

    // const[eHp, setEHp] = useState(e.maxHp);
    // const[eAtk, setEAtk] = useState(e.baseAtk);
    // const[eSpd, setESpd] = useState(e.baseSpd);

    function changeChar(nameNext) {
        if (active.name === nameNext) {
            console.log(`${active.name} is already in combat!`);
        } else if ((a.name === nameNext && !a.isAlive()) || (b.name === nameNext && !b.isAlive()) || (c.name === nameNext && !c.isAlive())) {
            console.log(`${nameNext} has fallen, ${active.name} cannot switch out!`);
        } else {
            if (a.name === nameNext) {
                active.rotateTo(a);
                setActive(a);
            } else if (b.name === nameNext) {
                active.rotateTo(b);
                setActive(b);
            } else if (c.name === nameNext) {
                active.rotateTo(c);
                setActive(c);
            }
            active.turnStart();
            setRotating(false);
        }  
    }

    const {
        turn,
        inSeq,
        announcerMessage
    } = useBattleSequence(sequence, active, a, b, c, e, setRotating)

    useEffect(() => {
        if (turn === 1 && !inSeq) {
          setSequence({ turn, mode: 'ai' });
        }
      }, [turn, inSeq]);
    
      useEffect(() => {
        if ((a.isAlive() || b.isAlive() || c.isAlive()) && e.isAlive()) {
          (async () => {
            await wait(1000);
            // onGameEnd(playerHealth === 0 ? opponentStats : playerStats);
          })();
        }
      }, [active, e]);

    return (
        <div>
            <div className="container box2">
                <h2>Fight Log</h2>
                <FightLog message={announcerMessage || `What will ${active.name} do?`}/>
                <br></br>
            </div>

            <br></br>

            <div className="container box2">
                <h2>Combat Field</h2>

                <div className="ally"></div>
                    <CombatantSummary combatant={active}/>
                <br></br>

                <div>
                    {active.name} vs {e.name}!
                </div>

                <br></br>

                <div className="enemy"></div>
                    <CombatantSummary combatant={e}/>

                <br></br>
            </div>

            <br></br>

            <div className="container box2">
                <h2>Actions:</h2>
                <br></br>

                {rotating 
                    ? <Rotations 
                        rMack={() => changeChar('Mack')} 
                        rDrake={() => changeChar('Drake')} 
                        rLionel={() => changeChar('Lionel')} 
                        back={() => setRotating(false)} />

                    : <Actions 
                        active = {active}
                        onStandard={() => setSequence({ action: 'standard', turn })} 
                        onSpec1={() => active.spec_1(e)} 
                        onSpec2={() => active.spec_2(e)} 
                        onRotate={() => setRotating(true)} /> }

                <br></br>
            </div>

        </div>
        
    )
}