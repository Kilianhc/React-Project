import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "../Pages/Dashboard";
import logo from "../assets/images/Ki.png"

export default function NavBar({ toggleAsideBar }) {


    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={toggleAsideBar}>
                    <MenuIcon />
                </IconButton>

                <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box
                        component="img"
                        src={logo}
                        alt="KiMovie Logo"
                        sx={{ height: 60, width: "auto", mr: 2 }}
                    />
                    KiMovie
                </Typography>
            </Toolbar>
        </AppBar>
    )
}