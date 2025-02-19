import { AppBar, Toolbar, Typography, IconButton, Box, TextField, InputAdornment } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "../Pages/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Ki.png"

export default function NavBar({ toggleAsideBar }) {

    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const navigate = useNavigate(); // Hook para redireccionar

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?genre=${searchTerm}`); // Redirecciona a la página de búsqueda
        }
    };

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
                <form onSubmit={handleSearch}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Buscar por género..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ 
                            backgroundColor: "white", 
                            borderRadius: 1, 
                            "& .MuiOutlinedInput-root": { 
                                color: "black", 
                                "& fieldset": { border: "none" } 
                            } 
                        }}
                        slotProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "black" }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </form>
            </Toolbar>
        </AppBar>
    )
}