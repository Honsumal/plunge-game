import React from "react";
import { 
    Button,
    Box } from "@mui/material";
import Mack from "../../js/allies/mack"
import Drake from "../../js/allies/drake"
import Lionel from "../../js/allies/lionel"
import Melchor from "../../js/enemies/melchor"

export default function F20 () {
    let a = new Mack();
    for (let i = 0; i < 4; i++) {
        a.levelUp();
    }

    let b = new Drake();
    for (let i = 0; i < 4; i++) {
        b.levelUp();
    }

    let c = new Lionel();
    for (let i = 0; i < 4; i++) {
        c.levelUp();
    }

    let e = new Melchor()

    let active = a;


    return (
        <div>
            <div className="container box2">
                <h2>Fight Log</h2>
                <br></br>
            </div>

            <br></br>

            <div className="container box3">
                <h2>Combat Field</h2>
                <br></br>
            </div>

            <br></br>

            <div className="container box2">
                <h2>Action Buttons:</h2>
                <br></br>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button variant="contained">{active.standard}</Button>
                    <Button variant="contained">{active.special_1}</Button>
                    <Button variant="contained">{active.special_2}</Button>
                    <Button variant="contained">{active.rotate}</Button>
                </Box>
                <br></br>
            </div>

        </div>
        
    )
}