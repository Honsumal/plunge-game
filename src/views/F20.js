import React, {useEffect, useState} from "react";
import Mack from "../js/allies/mack"
import Drake from "../js/allies/drake"
import Lionel from "../js/allies/lionel"
import Melchor from "../js/enemies/melchor"
import CombatantSummary from "../components/CombatantSummary";
import Actions from "../components/Actions";
import Rotations from "../components/Rotations";
import FightLog from "../components/FightLog";
import { useF20BattleSequence } from "../hooks/useF20BattleSequence";
import { wait } from "../utils/wait";
import { Modal, Box, Typography, Button } from "@mui/material";

export default function F20 ({toMenu}) {
    let aPrime = new Mack();
    
    let bPrime = new Drake();

    let cPrime = new Lionel();
    
    let ePrime = new Melchor();

    for (let i = 0; i < 2; i++) {aPrime.levelUp()}
    for (let i = 0; i < 2; i++) {bPrime.levelUp()}
    for (let i = 0; i < 2; i++) {cPrime.levelUp()}

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


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

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

                {turn === 0 && rotating 
                    ? <Rotations 
                        rMack={() => {setSequence({ action: 'rotating_1', turn })}} 
                        rDrake={() => {setSequence({ action: 'rotating_2', turn })}} 
                        rLionel={() => {setSequence({ action: 'rotating_3', turn })}} 
                        back={() => setRotating(false)} />

                    : <Actions 
                        active = {active}
                        onStandard={() => setSequence({ action: 'standard', turn })} 
                        onSpec1={() => setSequence({action: 'special_1', turn })} 
                        onSpec2={() => setSequence({action: 'special_2', turn })} 
                        onRotate={() => setRotating(true)} /> }
                
                {turn === 1 && <h1 className="centered">Wait</h1>}
                <br></br>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="End Screen"
                aria-describedby="Battle Result"
            >
                <Box sx={style} textAlign='center'>
                <Typography id="instructions" variant="h2" component="h3">
                    {!e.isAlive() 
                        ? `You Won!`
                        : `You Lost!` }
                        
                </Typography>

                <Button variant="contained" onClick={toMenu}>Menu</Button>

                </Box>
            </Modal>

        </div>
    )
}