import { Button } from "@mui/material"
import { Box } from "@mui/system"

export default function StartMenu ({ onStart }) {
    return (
        <Box sx = {{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={onStart}>Fight Melchor!</Button>
        </Box>
    )
}