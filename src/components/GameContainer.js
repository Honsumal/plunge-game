import React, {useState} from 'react'
import NavTabs from './NavTabs';
import StartMenu from '../views/StartMenu';
import F1 from '../views/F1';
import F8 from '../views/F8';
import F20 from '../views/F20';
import F28 from '../views/F28';
import F30 from '../views/F30';


export default function GameContainer() {
    const [currentCalculator, setCurrentCalculator] = useState('Rolls');

    const [mode, setMode] = useState('start');

    const [aLv, setAlv] = useState(5);
    const [bLv, setBlv] = useState(4);
    const [cLv, setClv] = useState(3);
    

    const handleCalculatorChange = (calc) => setCurrentCalculator(calc)

    return (
        <div>
            <NavTabs currentCalculator={currentCalculator} handleCalculatorChange={handleCalculatorChange} />
            <br></br>
            <div className='container'>
                <br></br>
                
                {mode === 'start' && <StartMenu onF1={() => setMode('f1')} onTest={() => setMode('f28')} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f1' && <F1 toMenu={() => setMode('start')} toNext={() => setMode('f8')} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f8' && <F8 toMenu={() => setMode('start')} toNext={() => setMode('f20')} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f20' && <F20 toMenu={() => setMode('start')} toNext={() => setMode('f28')} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f28' && <F28 toMenu={() => setMode('start')} toNext={() => setMode('f30')} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f30' && <F30 toMenu={() => setMode('start')} toNext={() => setMode('f50')} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                <br></br>
                
            </div>
            <br></br>
        </div>
    )
}   