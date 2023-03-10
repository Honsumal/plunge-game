import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"

export default function StartMenu ({ onNew, onCurrent }) {
    return (
        <Box>
            <Box sx = {{ display: 'flex', justifyContent: 'center' }}>
                
                <Typography>Welcome! Click the question mark above for instructions! When you're ready, challenge Jerry!</Typography>

            </Box>
            <br></br>

            <Box sx = {{ display: 'flex', justifyContent: 'space-evenly' }}>

                <Button variant="contained" onClick={onNew}>Start Anew!</Button>

                <Button variant="contained" onClick={onCurrent}>Continue!</Button>

            </Box>
        </Box>
    )
}