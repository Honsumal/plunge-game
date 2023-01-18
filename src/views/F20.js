import React, {useState} from "react";
import Mack from "../js/allies/mack"
import Drake from "../js/allies/drake"
import Lionel from "../js/allies/lionel"
import Melchor from "../js/enemies/melchor"
import CombatantSummary from "../components/CombatantSummary";
import Actions from "../components/Actions";
import Rotations from "../components/Rotations";

export default function F20 () {
    let a = new Mack();
    for (let i = 0; i < 4; i++) {
        a.levelUp();
    }

    let b = new Drake();
    for (let i = 0; i < 4; i++) {
        b.levelUp();
    }

    let c = new Lionel();
    for (let i = 0; i < 4; i++) {
        c.levelUp();
    }

    let e = new Melchor();

    const [active, setActive] = useState(a);
    const [rotating, setRotating] = useState(false);

    const [aDipslay, setADipslay] = useState(false);
    const [aRavage, setARavage] = useState(false);
    const [aProtect, setAProtect] = useState(false);
    const [aBarrier, setABarrier] = useState(false);

    const [aBarrierCount, setABarrierCount] = useState(0);
    const [aPStrikeCount, setAPStrikeCount] = useState(0);
    const [aWStrikeCount, setAWStrikeCount] = useState(0);
    const [aSSTrikeCount, setASStrikeCount] = useState(0);
    const [aSlipstreamCount, setASlipstreamCount] = useState(0);

    const [eRavage, setERavage] = useState(false);
    const [eProtect, setEProtect] = useState(false);
    const [eBarrier, setEBarrier] = useState(false);
    const [eSlipstream, setEDSlipstream] = useState(false);

    const [eBarrierCount, setEBarrierCount] = useState(0);
    const [eWStrikeCount, setEWStrikeCount] = useState(0);

    const[aHp, setAHp] = useState(a.maxHp);
    const[aAtk, setAAtk] = useState(a.baseAtk);
    const[aSpd, setASpd] = useState(a.baseSpd);

    const[bHp, setBHp] = useState(b.maxHp);
    const[bAtk, setBAtk] = useState(b.baseAtk);
    const[bSpd, setBSpd] = useState(b.baseSpd);

    const[cHp, setCHp] = useState(c.maxHp);
    const[cAtk, setACtk] = useState(c.baseAtk);
    const[cSpd, setCSpd] = useState(c.baseSpd);

    const[eHp, setEHp] = useState(e.maxHp);
    const[eAtk, setEAtk] = useState(e.baseAtk);
    const[eSpd, setESpd] = useState(e.baseSpd);

    return (
        <div>
            <div className="container box2">
                <h2>Fight Log</h2>
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
                        rMack={() => console.log('Mack')} 
                        rDrake={() => console.log('Drake')} 
                        rLionel={() => console.log('Lionel')} 
                        back={() => console.log('Back')} />

                    : <Actions 
                        active = {active}
                        onStandard={() => console.log(active.standard)} 
                        onSpec1={() => console.log(active.special_1)} 
                        onSpec2={() => console.log(active.special_2)} 
                        onRotate={() => console.log(active.rotate)} /> }

                <br></br>
            </div>

        </div>
        
    )
}