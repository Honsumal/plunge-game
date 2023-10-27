import { Box, Button } from "@mui/material"

export default function Rotations ({rMack, rDrake, rLionel, back, turn}) {
    return(
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button variant="contained" onClick={rMack}>Mack</Button>
            <Button variant="contained" onClick={rDrake}>Drake</Button>
            <Button variant="contained" onClick={rLionel}>Lionel</Button>
            <Button variant="contained" onClick={back}>Back</Button>
        </Box>
    )
}