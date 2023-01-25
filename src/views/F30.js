import React, {useEffect, useState} from "react";
import Mack from "../js/allies/mack";
import Drake from "../js/allies/drake";
import Lionel from "../js/allies/lionel";
import Bars from "../js/enemies/bars";
import { useF20BattleSequence } from "../hooks/useF20BattleSequence";
import { wait } from "../utils/wait";
import { BattleField } from "../components/BattleField";

export default function F30 ({toMenu, toNext}) {
    let aPrime = new Mack();
    
    let bPrime = new Drake();

    let cPrime = new Lionel();
    
    let ePrime = new Bars();

    for (let i = 0; i < 4; i++) {aPrime.levelUp()}
    for (let i = 0; i < 4; i++) {bPrime.levelUp()}
    for (let i = 0; i < 4; i++) {cPrime.levelUp()}

    const [a] = useState(aPrime)
    const [b] = useState(bPrime)
    const [c] = useState(cPrime)
    const [e] = useState(ePrime)
    
    const [active, setActive] = useState(a);
    const [sequence, setSequence] = useState({})
    const [rotating, setRotating] = useState(false)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        turn,
        inSeq,
        announcerMessage
    } = useF20BattleSequence(sequence, active, a, b, c, e, setRotating, setActive)

    useEffect(() => {
        if (turn === 1 && !inSeq) {
          setSequence({ turn, mode: 'ai' });
        }
      }, [turn, inSeq]);
    
      useEffect(() => {
        if ((!a.isAlive() && !b.isAlive() && !c.isAlive()) || !e.isAlive()) {
          (async () => {
            await wait(1000);
            handleOpen()
          })();
        }
      }, [active.hp, e.hp]);

    return (
        <div>
            <BattleField announcerMessage={announcerMessage} activechar={active} echar={e} setRotating={setRotating} setSequence={setSequence} handleClose={handleClose} turn={turn} rotating={rotating} toMenu={toMenu} open={open}/>

        </div>
    )
}