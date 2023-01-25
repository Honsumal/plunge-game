import CombatantSummary from "../components/CombatantSummary";
import Actions from "../components/Actions";
import Rotations from "../components/Rotations";
import FightLog from "../components/FightLog";
import { Modal, Box, Typography, Button } from "@mui/material";

export function BattleField({announcerMessage, activechar, echar, setSequence, setRotating, setActive, handleCloseStart, turn, rotating, toMenu, toNext, open, openStart, a, b, c}) {

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
    
    return (
        <div>
            <div className="container box2">
                <h2>Fight Log</h2>
                <FightLog message={announcerMessage || `What will ${activechar.name} do?`}/>
                <br></br>
            </div>

            <br></br>

            <div className="container box2">
                <h2>Combat Field</h2>

                <div className="ally"></div>
                    <CombatantSummary combatant={activechar}/>
                <br></br>

                <div>
                    {activechar.name} vs {echar.name}!
                </div>

                <br></br>

                <div className="enemy"></div>
                    <CombatantSummary combatant={echar}/>

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
                        active = {activechar}
                        onStandard={() => setSequence({ action: 'standard', turn })} 
                        onSpec1={() => setSequence({action: 'special_1', turn })} 
                        onSpec2={() => setSequence({action: 'special_2', turn })} 
                        onRotate={() => setRotating(true)} /> }
                
                {turn === 1 && <h1 className="centered">Wait</h1>}
                <br></br>
            </div>

            <Modal
                open={open}
                aria-labelledby="End Screen"
                aria-describedby="Battle Result"
            >
                <Box sx={style} textAlign='center'>
                <Typography id="instructions" variant="h2" component="h3">
                    {!echar.isAlive() 
                        ? `You Won!`
                        : `You Lost!` }
                        
                </Typography>

                <Button variant="contained" onClick={toMenu}>Menu</Button>

                <Button variant="contained" onClick={toNext}>Menu</Button>

                </Box>
            </Modal>

            <Modal
                open={openStart}
                onClose={handleCloseStart}
                aria-labelledby="Select Lead"
                aria-describedby="Starter Selection"
            >
                <Box sx={style} textAlign='center' justifyContent='space-around'>
                    <Typography>Select your starting fighter!</Typography>
                    <Button variant="contained" onClick={() => {setActive(a); handleCloseStart()}}>{a.name}</Button>
                    <Button variant="contained" onClick={() => {setActive(b); handleCloseStart()}}>{b.name}</Button>
                    <Button variant="contained" onClick={() => {setActive(c); handleCloseStart()}}>{c.name}</Button>
                </Box>
            </Modal>

        </div>
    )
}