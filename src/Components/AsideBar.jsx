import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PushPinIcon from "@mui/icons-material/PushPin";

export default function AsideBar({ open, toggleAsideBar }) {


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
                <ListItem button component={Link} to='/addmovie' onClick={toggleAsideBar}>
                    <ListItemIcon sx={{ color: "white" }}><AddIcon /></ListItemIcon>
                    <ListItemText sx={{ color: "white" }} primary="Añadir Nueva Película" />
                </ListItem>
            </List>
        </Drawer>
    )
}