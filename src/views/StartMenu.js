import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"

export default function StartMenu ({ onStart }) {
    return (
        <Box>
            <Box sx = {{ display: 'flex', justifyContent: 'center' }}>
                
                <Typography>Welcome! Click the question mark above for instructions! When you're ready, challenge Melchor!</Typography>

            </Box>
            <br></br>

            <Box sx = {{ display: 'flex', justifyContent: 'center' }}>

                <Button variant="contained" onClick={onStart}>Fight Melchor!</Button>

            </Box>
        </Box>
    )
}