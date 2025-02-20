import { Box, Typography } from "@mui/material"

export default function Footer() {


    return (
        <Box sx={{ position: "fixed", bottom: 0, width: "100%", textAlign: "center", p: 0.5, bgcolor: "primary.main", color: "white" }}>
            <Typography variant="body2">© 2025 KiMovie</Typography>
        </Box>
    )
}