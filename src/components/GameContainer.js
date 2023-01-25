import React, {useState} from 'react'
import NavTabs from './NavTabs';
import F20 from '../views/F20';
import StartMenu from '../views/StartMenu'
import F30 from '../views/F30';


export default function GameContainer() {
    const [currentCalculator, setCurrentCalculator] = useState('Rolls');

    const [mode, setMode] = useState('start')
    

    const handleCalculatorChange = (calc) => setCurrentCalculator(calc)

    return (
        <div>
            <NavTabs currentCalculator={currentCalculator} handleCalculatorChange={handleCalculatorChange} />
            <br></br>
            <div className='container'>
                <br></br>
                
                {mode === 'start' && <StartMenu onStart={() => setMode('f20')} />}
                {mode === 'f20' && <F20 toMenu={() => setMode('start')} toNext={() => setMode('f30')}/>}
                {mode === 'f30' && <F30 toMenu={() => setMode('start')} toNext={() => setMode('f50')}/>}
                <br></br>
                
            </div>
            <br></br>
        </div>
    )
}   