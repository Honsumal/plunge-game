import React, { createContext, useContext, useState } from 'react';
import Mack from '../js/allies/mack';
import Drake from '../js/allies/drake';
import Lionel from '../js/allies/lionel';

let a = new Mack()


const AllyContext = createContext();

export const useAllyContext = () => useContext(AllyContext);

export const AllyProvider = ({ children }) => {
    const [active, setActive] = useState(a);

    const rotation = (current, next) => {
        if (next === "Back") {
            setActive(current);
        } else if (current.name === next.name) {
            console.log(`${current.name} is already in combat!`)
        } 
    }
}