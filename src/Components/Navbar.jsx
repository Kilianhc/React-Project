import { AppBar, Toolbar, Typography, IconButton, Box, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/images/Ki.png"
import { Link } from "react-router-dom";

export default function NavBar({ toggleAsideBar }) {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={toggleAsideBar}>
                    <MenuIcon />
                </IconButton>

                <Typography component={Link} to={"/"} variant="h4" sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", textDecoration:"none", color:"white" }}>
                    <Box
                        component="img"
                        src={logo}
                        alt="KiMovie Logo"
                        sx={{ height: 60, width: "auto", mr: 1 }}
                    />
                    KiMovie
                </Typography>
            </Toolbar>
        </AppBar>
    )
}