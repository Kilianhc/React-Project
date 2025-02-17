import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function AsideBar({open, toggleAsideBar}) {
    

    return(
        <Drawer anchor="" open={open} onClose={toggleAsideBar}>
            <List>
                <ListItem button component={Link} to="/" onClick={toggleAsideBar}>
                    <ListItemText sx={{color: "black"}} primary=" 🏠 Home" />
                </ListItem>
                <ListItem button component={Link} to="/watchlist" onClick={toggleAsideBar}>
                    <ListItemText sx={{color: "black"}} primary=" 📌 Películas por ver" />
                </ListItem>
                <ListItem button component={Link} to="/watched" onClick={toggleAsideBar}>
                    <ListItemText sx={{color: "black"}} primary=" ✅ Películas vistas" />
                </ListItem>
                <ListItem button component={Link} to="/favorites" onClick={toggleAsideBar}>
                    <ListItemText sx={{color: "black"}} primary=" ❤️ Favoritas" />
                </ListItem>
            </List>
        </Drawer>
    )
}