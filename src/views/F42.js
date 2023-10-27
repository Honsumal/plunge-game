import React, {useEffect, useState} from "react";
import Mack from "../js/allies/mack";
import Drake from "../js/allies/drake";
import Lionel from "../js/allies/lionel";
import { useF42BattleSequence } from "../hooks/useF42BattleSequence";
import { BattleField } from "../components/BattleField";
import { handleLevelUp } from "../utils/handleLevelUp";
import Kurosawa from "../js/enemies/kurosawa";

export default function F42 ({toMenu, toNext, aLv, setALv, bLv, setBLv, cLv, setCLv}) {
    let aPrime = new Mack();
    
    let bPrime = new Drake();

    let cPrime = new Lionel();
    
    let ePrime = new Kurosawa();

    for (let i = 0; i < aLv - 1; i++) {aPrime.levelUp()}
    for (let i = 0; i < bLv - 1; i++) {bPrime.levelUp()}
    for (let i = 0; i < cLv - 1; i++) {cPrime.levelUp()}

    const [a] = useState(aPrime)
    const [b] = useState(bPrime)
    const [c] = useState(cPrime)
    const [e] = useState(ePrime)
    
    const [active, setActive] = useState(a);
    const [sequence, setSequence] = useState({})
    const [rotating, setRotating] = useState(false)
    const [roundOver, setRoundOver] = useState(false)

    const [open, setOpen] = React.useState(false);
    const [openStart, setOpenStart] = React.useState(true)

    const handleOpen = () => setOpen(true);
    const handleCloseStart = () => setOpenStart (false)

    const field = 'Electric'

    const {
        turn,
        inSeq,
        announcerMessage
    } = useF42BattleSequence(sequence, active, a, b, c, e, setRotating, setActive, field)

    useEffect(() => {
        if (turn === 1 && !inSeq && e.isAlive()) {
          setSequence({ turn, mode: 'ai' });
        }
      }, [turn, inSeq]);
    
      useEffect(() => {
        if ((!a.isAlive() && !b.isAlive() && !c.isAlive()) || !e.isAlive()) {
          if (!roundOver){
            handleOpen();
            if(!e.isAlive()){
              handleLevelUp(a, b, c, 8);
              setALv(a.level);
              setBLv(b.level);
              setCLv(c.level);
            }
            setRoundOver(true)
          }              
        }
      }, [active.hp, e.hp]);

    return (
        <div>
            <BattleField announcerMessage={announcerMessage} activechar={active} echar={e} setRotating={setRotating} setSequence={setSequence} setActive={setActive} handleCloseStart={handleCloseStart} turn={turn} rotating={rotating} toMenu={toMenu} toNext={toNext} open={open} openStart={openStart} a={a} b={b} c={c} floor={42} field={field}/>

        </div>
    )
}