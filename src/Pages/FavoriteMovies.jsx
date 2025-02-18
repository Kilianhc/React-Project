import { useEffect, useState } from "react";
import { Container, Typography, Card, CardMedia, CardContent, Grid2 } from "@mui/material";
import axios from "axios";
import MovieCard from "../Components/MovieCard";
import ConfirmationDialog from "../Components/ConfirmationDialog";
import useConfirmationDialog from "../Utils/useConfirmationDialog";
import useMovieActions from "../Utils/useMovieActions";

const API_URL = import.meta.env.VITE_API_URL

export default function FavoriteMovies() {

    const [favoriteMovies, setFavoriteMovies] = useState([])

    const {dialogOpen, selectedMovieId, handleOpenDialog, handleCloseDialog} = useConfirmationDialog()

    const {handleUpdateMovie} = useMovieActions()

    useEffect(() => {
        axios
        .get(`${API_URL}/movies?isFavorite=true`)
        .then((res) => setFavoriteMovies(res.data))
        .catch((error) => console.error("Error al obtener las películas favoritas:", error));
}, []);

    const handleRemoveFromFavorites = () => {
        if(selectedMovieId) {
        handleUpdateMovie(
            selectedMovieId, {isFavorite: false}, () => {
                setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== selectedMovieId))
                handleCloseDialog()
            }
        )
    }
}

    return (
        <Container sx={{mt: 15}}>
            <Typography variant="h4" color="white" gutterBottom>❤️ Favoritas</Typography>
            {favoriteMovies.length === 0 ? (
                <Typography color="white">No hay películas en la lista</Typography>
            ) : (
                <Grid2 container spacing={3}>
                    {favoriteMovies.map((movie) => (
                        <Grid2 items xs={12} sm={6} md={4} key={movie.id}>
                            <MovieCard movie={movie} onRemove={() => handleOpenDialog(movie.id)} />
                        </Grid2>
                    ))}
                </Grid2>    
            )}
            <ConfirmationDialog open={dialogOpen} onClose={handleCloseDialog} onConfirm={handleRemoveFromFavorites}
                    title="Eliminar Película" message="Esta película se eliminará de tu lista de favoritas, ¿está seguro de que quiere eliminarla?" />
        </Container>
    )
}