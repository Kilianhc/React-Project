import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar({toggleAsideBar}) {
    

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={toggleAsideBar}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h4" sx={{flexGrow: 1}}>
                    KiMovie
                </Typography>
            </Toolbar>
        </AppBar>
    )
}