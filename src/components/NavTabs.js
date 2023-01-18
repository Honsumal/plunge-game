import React from 'react';
import {FaPercentage, FaDice, FaQuestionCircle} from 'react-icons/fa'
import {Box, Typography, Modal} from '@mui/material';


export default function NavTabs({ currentCalculator, handleCalculatorChange }) {

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ul className="nav nav-tabs">
      <li><h1><a href='https://honsumal.github.io/portfolio/' className='headline'>Alastair Lee</a></h1></li>

      <li className="nav-item">
        <a
          href="#confidence"
          onClick={() => handleCalculatorChange('Confidence')}
          className={currentCalculator === 'Confidence' ? 'nav-link active' : 'nav-link'}
        >
          <FaPercentage className = 'home'/>
        </a>
      </li>
    
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
            Input the your probability and either the number of tries (rolls), or desired confidence. Calculations made will be saved locally and displayed below the relevant calculator
          </Typography>
        </Box>
      </Modal>
    </ul>    
  );
}

