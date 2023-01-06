import React, { useState } from 'react';
import NavTabs from './NavTabs'
import Plunge from 'Plunge'

export default function GameContainer() {

    const renderGame = () => <Plunge />    

    return (
        <div>
            <NavTabs />
            <div>
                {renderGame()}
            </div>
        </div>
    )
}