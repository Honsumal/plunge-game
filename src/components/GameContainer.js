import React, {useState} from 'react'
import NavTabs from './NavTabs';
import StartMenu from '../views/StartMenu';
import F1 from '../views/F1';
import F8 from '../views/F8';
import F20 from '../views/F20';
import F28 from '../views/F28';
import F30 from '../views/F30';
import F34 from '../views/F34';
import F38 from '../views/F38';
import F42 from '../views/F42';


export default function GameContainer() {
    const [currentCalculator, setCurrentCalculator] = useState('Rolls');

    const [mode, setMode] = useState('start');
    const [current, setCurrent] = useState('f46')

    const [aLv, setAlv] = useState(8);
    const [bLv, setBlv] = useState(10);
    const [cLv, setClv] = useState(8);
    

    const handleCalculatorChange = (calc) => setCurrentCalculator(calc)

    return (
        <div>
            <NavTabs currentCalculator={currentCalculator} handleCalculatorChange={handleCalculatorChange} />
            <br></br>
            <div className='container'>
                <br></br>
                
                {mode === 'start' && <StartMenu onF1={() => {setMode('f1'); setCurrent('f1')}} onTest={() => setMode(current)} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f1' && <F1 toMenu={() => setMode('start')} toNext={() => {setMode('f8'); setCurrent('f8')}} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f8' && <F8 toMenu={() => setMode('start')} toNext={() => {setMode('f20'); setCurrent('f20')}} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f20' && <F20 toMenu={() => setMode('start')} toNext={() => {setMode('f28'); setCurrent('f28')}} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f28' && <F28 toMenu={() => setMode('start')} toNext={() => {setMode('f30'); setCurrent('f30')}} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f30' && <F30 toMenu={() => setMode('start')} toNext={() => {setMode('f34'); setCurrent('f34')}} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f34' && <F34 toMenu={() => setMode('start')} toNext={() => {setMode('f38'); setCurrent('f38')}} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f38' && <F38 toMenu={() => setMode('start')} toNext={() => {setMode('f42'); setCurrent('f42')}} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                {mode === 'f42' && <F42 toMenu={() => setMode('start')} toNext={() => {setMode('f46'); setCurrent('f46')}} aLv={aLv} setALv={setAlv} bLv={bLv} setBLv={setBlv} cLv={cLv} setCLv={setClv}/>}
                <br></br>
                
            </div>
            <br></br>
        </div>
    )
}   