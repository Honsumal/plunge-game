import { Box, Button } from "@mui/material"

export default function Actions ({active, onStandard, onSpec1, onSpec2, onRotate}) {
    return(
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button variant="contained" onClick={onStandard}>{active.standard}</Button>
            <Button variant="contained" onClick={onSpec1}>{active.special_1}</Button>
            <Button variant="contained" onClick={onSpec2}>{active.special_2}</Button>
            <Button variant="contained" onClick={onRotate}>{active.rotate}</Button>
        </Box>
    )
}