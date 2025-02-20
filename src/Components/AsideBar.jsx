import { Drawer, List, ListItem, ListItemText, ListItemIcon, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PushPinIcon from "@mui/icons-material/PushPin";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useState } from "react";
import KeyIcon from '@mui/icons-material/Key';

export default function AsideBar({ open, toggleAsideBar }) {

    const [isAdmin, setIsAdmin] = useState(false)
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState("");

    const handleAdminClick = () => {
        setIsAdmin(!isAdmin);
        setIsAuthenticated(false);
        setPassword("");
        setError("");
    };

    const handleLogin = () => {
        if (password === "1234") {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Contraseña incorrecta");
        }
    };

    return (
        <Drawer anchor="top" open={open} onClose={toggleAsideBar} PaperProps={{ sx: { backgroundColor: "primary.main" } }}>
            <List>
                <ListItem button component={Link} to="/" onClick={toggleAsideBar}>
                    <ListItemIcon sx={{ color: "white" }}><HomeIcon /></ListItemIcon>
                    <ListItemText sx={{ color: "white" }} primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/watchlist" onClick={toggleAsideBar}>
                    <ListItemIcon sx={{ color: "white" }}><PushPinIcon /></ListItemIcon>
                    <ListItemText sx={{ color: "white" }} primary="Películas por ver" />
                </ListItem>
                <ListItem button component={Link} to="/watched" onClick={toggleAsideBar}>
                    <ListItemIcon sx={{ color: "white" }}><CheckIcon /></ListItemIcon>
                    <ListItemText sx={{ color: "white" }} primary="Películas vistas" />
                </ListItem>
                <ListItem button component={Link} to="/favorites" onClick={toggleAsideBar}>
                    <ListItemIcon sx={{ color: "white" }}><FavoriteIcon /></ListItemIcon>
                    <ListItemText sx={{ color: "white" }} primary="Favoritas" />
                </ListItem>
                <ListItem button component={Link} onClick={handleAdminClick}>
                    <ListItemIcon sx={{ color: "white" }}><AdminPanelSettingsIcon /></ListItemIcon>
                    <ListItemText sx={{ color: "white" }} primary={isAdmin ? "Salir de Admin" : "Admin"} />
                </ListItem>
                {isAdmin && !isAuthenticated && (
                    <>
                        <ListItem>
                            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                fullWidth sx={{ input: { color: "white" }, label: { color: "white" }, "& .MuiInputBase-root": { color: "white", bgcolor:"secondary.main" } }} />
                        </ListItem>
                        <ListItem>
                            <Button onClick={handleLogin} variant="contained" sx={{bgcolor:"secondary.main", color:"white", "&:hover": { transform: "scale(1.05)" }}} startIcon={<KeyIcon />}>
                                Ingresar
                            </Button>
                        </ListItem>
                        {error && (
                            <ListItem>
                                <Typography color="error">{error}</Typography>
                            </ListItem>
                        )}
                    </>
                )}

                {isAuthenticated && (
                    <ListItem button component={Link} to='/addmovie' onClick={toggleAsideBar}>
                        <ListItemIcon sx={{ color: "white" }}><AddIcon /></ListItemIcon>
                        <ListItemText sx={{ color: "white" }} primary="Añadir Nueva Película" />
                    </ListItem>
                )}
            </List>
        </Drawer>
    )
}