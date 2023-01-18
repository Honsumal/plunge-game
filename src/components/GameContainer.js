import React, {useState} from 'react'
import NavTabs from './NavTabs';
import F20 from './levels/F20';


export default function GameContainer() {
    const [currentCalculator, setCurrentCalculator] = useState('Confidence');

    

    const handleCalculatorChange = (calc) => setCurrentCalculator(calc)

    return (
        <div>
            <NavTabs currentCalculator={currentCalculator} handleCalculatorChange={handleCalculatorChange} />
            <br></br>
            <div className='container'>
                <br></br>
                
                <F20 />
                <br></br>
                
            </div>
            <br></br>
        </div>
    )
}   