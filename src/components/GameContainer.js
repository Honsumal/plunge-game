import React, {useState} from 'react'
import NavTabs from './NavTabs';
import F20 from '../views/F20';
import StartMenu from '../views/StartMenu'


export default function GameContainer() {
    const [currentCalculator, setCurrentCalculator] = useState('Confidence');

    const [mode, setMode] = useState('start')
    

    const handleCalculatorChange = (calc) => setCurrentCalculator(calc)

    return (
        <div>
            <NavTabs currentCalculator={currentCalculator} handleCalculatorChange={handleCalculatorChange} />
            <br></br>
            <div className='container'>
                <br></br>
                
                {mode === 'start' && <StartMenu onStart={() => setMode('f20')} />}
                {mode === 'f20' && <F20 />}
                {/* {mode === 'end' && <F20 />} */}

                <br></br>
                
            </div>
            <br></br>
        </div>
    )
}   