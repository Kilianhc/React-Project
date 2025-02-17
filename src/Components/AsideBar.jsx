import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function AsideBar({open, toggleAsideBar}) {
    

    return(
        <Drawer anchor="" open={open} onClose={toggleAsideBar}>
            <List>
                <ListItem button component={Link} to="/" onClick={toggleAsideBar}>
                    <ListItemText primary=" 🏠 Home" />
                </ListItem>
                <ListItem button component={Link} to="/watchlist" onClick={toggleAsideBar}>
                    <ListItemText primary=" 📌 Películas por ver" />
                </ListItem>
                <ListItem button component={Link} to="/watched" onClick={toggleAsideBar}>
                    <ListItemText primary=" ✅ Películas vistas" />
                </ListItem>
                <ListItem button component={Link} to="/favorites" onClick={toggleAsideBar}>
                    <ListItemText primary=" ❤️ Favoritas" />
                </ListItem>
            </List>
        </Drawer>
    )
}