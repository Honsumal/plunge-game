import React from 'react';
import {FaDice, FaQuestionCircle} from 'react-icons/fa'
import {GiAxeSword} from 'react-icons/gi'
import {Box, Typography, Modal} from '@mui/material';


export default function NavTabs({ currentCalculator, handleCalculatorChange }) {

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  return (
    <ul className="nav nav-tabs">
      <li><h1><a href='https://honsumal.github.io/portfolio/' className='headline'>Alastair Lee</a></h1></li>
    
      <li className="nav-item">
        <a
        href="#rolls"
        onClick={() => handleCalculatorChange('Rolls')}

        className={currentCalculator === 'Rolls' ? 'nav-link active' : 'nav-link'}
        >
        <FaDice className = 'proj'/>
        </a>
      </li>

      <li className="nav-item nav-link" href="#rolls"
        onClick={handleOpen}>
        
        <FaQuestionCircle className = 'proj'/>
      </li>

      <li className="nav-item nav-link" href="#rolls"
        onClick={handleOpen2}>
        
        <GiAxeSword className = 'proj'/>
      </li>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="instructions"
        aria-describedby="instructions for usage"
      >
        <Box sx={style}>
          <Typography id="instructions" variant="h6" component="h3">
            Instructions:
          </Typography>
          <Typography id="usage instructions" sx={{ mt: 2 }}>
            Welcome to The Plunge! Control Mack, Drake, and Lionel to fight against the bosses on screen. Here's a summary of the different skills that are available to use:
          </Typography>
          <Typography>- Batter, Dissonance, Hammer: Standard Attack</Typography>
          <Typography>- Pugilistic Strike: Attack that initially begins with low damage but increases in damage with each use</Typography>
          <Typography>- Willful Strike: Attack that causes successive allied attacks to drain some HP for 5 rounds</Typography>
          <Typography>- Spiky Strike: Attack that creates a shield around the allies, causing enemies to take some damage on attacks</Typography>
          <Typography>- Ravage: Attack that causes enemies to take more damage</Typography>
          <Typography>- Slipstream: Supportive skill that increases allied speed for 5 rounds</Typography>
          <Typography>- Barrier: Supportive skill that nullifies the next attack by the enemy, and protects the allies for the next 4 successive hits</Typography>
          <Typography>- Disengage, Recall, Smoke Ball: Supportive skill that allows the user to switch to their specified ally</Typography>
          <Typography>Warning: If you try to switch to someone who can't come in, you will use up your turn!</Typography>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="field-fx"
        aria-describedby="field effect descriptions"
      >
        <Box sx={style}>
          <Typography id="ffx" variant="h6" component="h3">
            Field Effects:
          </Typography>
          <Typography id="ffx instructions" sx={{ mt: 2 }}>
            Here are a list of the field effects! Make sure to take them in account when facing your enemy!
          </Typography>
          <Typography>- Dirt: Nothing</Typography>
          <Typography>- Grass: Heals active character by 6.25% of their max HP after each action</Typography>
          <Typography>- Steel: Slipstream additionally increases user's speed by 20%</Typography>
          <Typography>- Superheated: Damages active character by 6.25% of their max HP after each action</Typography>
          <Typography>- Titanium: Barrier gains two extra charges before it breaks</Typography>
          <Typography>- Swamp: Active character's speed is decreased by 20% of its current level each round</Typography>
          <Typography>- Crystalline: Spiky Strike additionally increases user's attack by 20% after use</Typography>
          <Typography>- Electric: Switch moves increases incoming character's speed by 20%</Typography>
          <Typography>- Icy: Pugilistic Strike increases user's speed by 20% after use</Typography>
          <Typography>- Diamond: Ravage decreases enemy speed when used</Typography>
        </Box>
      </Modal>
    </ul>    
  );
}

