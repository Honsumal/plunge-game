import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"

export default function StartMenu ({ onF1, onTest }) {
    return (
        <Box>
            <Box sx = {{ display: 'flex', justifyContent: 'center' }}>
                
                <Typography>Welcome! Click the question mark above for instructions! When you're ready, challenge Melchor!</Typography>

            </Box>
            <br></br>

            <Box sx = {{ display: 'flex', justifyContent: 'space-evenly' }}>

                <Button variant="contained" onClick={onF1}>Fight Jerry!</Button>

                <Button variant="contained" onClick={onTest}>Fight Test!</Button>

            </Box>
        </Box>
    )
}