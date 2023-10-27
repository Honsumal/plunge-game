import CombatantSummary from "../components/CombatantSummary";
import Actions from "../components/Actions";
import Rotations from "../components/Rotations";
import FightLog from "../components/FightLog";
import { Modal, Box, Typography, Button } from "@mui/material";

export function BattleField({announcerMessage, activechar, echar, setSequence, setRotating, setActive, handleCloseStart, turn, rotating, toMenu, toNext, open, openStart, a, b, c, floor, field}) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    return (
        <div>
            <div className="container box2">
                <h2>Fight Log</h2>
                <FightLog message={announcerMessage || `Entered Floor ${floor}: V.S. ${echar.name}!`} turn={turn}/>
                <br></br>
            </div>

            <br></br>

            <div className="container box2">
                <h2>Combat Field: {field}</h2>

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

                {!turn &&"burn"}

                {!turn && rotating 
                    ? <Rotations 
                        rMack={() => {setSequence({ action: 'rotating_1', turn })}} 
                        rDrake={() => {setSequence({ action: 'rotating_2', turn })}} 
                        rLionel={() => {setSequence({ action: 'rotating_3', turn })}} 
                        back={() => setRotating(false)}
                        turn={turn} />

                    : <Actions 
                        active = {activechar}
                        onStandard={() => setSequence({ action: 'standard', turn })} 
                        onSpec1={() => setSequence({action: 'special_1', turn })} 
                        onSpec2={() => setSequence({action: 'special_2', turn })} 
                        onRotate={() => setRotating(true)} 
                        turn={turn}/> 
                }
                
                {turn && <h1 className="centered">Wait</h1>}
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

                    <br></br>

                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <CombatantSummary combatant={a}/>
                        <CombatantSummary combatant={b}/>
                        <CombatantSummary combatant={c}/>
                    </Box>

                    <br></br>

                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button variant="contained" onClick={toMenu}>Menu</Button>
                            {!echar.isAlive() 
                            ? floor === 50 
                                ? <Typography variant="h5" component="h5"> Challenge Complete!</Typography>
                                : <Button variant="contained" onClick={toNext}>Next Challenge!</Button>
                                : <Typography variant="h5" component="h5"> Try Again!</Typography>}
                        
                    </Box>                      
                </Box>
            </Modal>

            <Modal
                open={openStart}
                onClose={handleCloseStart}
                aria-labelledby="Select Lead"
                aria-describedby="Starter Selection"
            >
                <Box sx={style} textAlign='center' >
                    <Typography>Select your starting fighter!</Typography>
                    <br></br>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button variant="contained" onClick={() => {setActive(a); handleCloseStart()}}>{a.name}</Button>
                        <Button variant="contained" onClick={() => {setActive(b); handleCloseStart()}}>{b.name}</Button>
                        <Button variant="contained" onClick={() => {setActive(c); handleCloseStart()}}>{c.name}</Button>
                    </Box>
                    
                </Box>
            </Modal>

        </div>
    )
}