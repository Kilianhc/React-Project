import { useState, useEffect } from "react";
import { Container, Typography, Card, CardMedia, CardContent, Grid2 } from "@mui/material";
import axios from "axios";
import MovieCard from "../Components/MovieCard";
import ConfirmationDialog from "../Components/ConfirmationDialog";
import useMovieActions from "../Utils/useMovieActions";
import useConfirmationDialog from "../Utils/useConfirmationDialog";
import BackButton from "../Components/BackButton";

const API_URL = import.meta.env.VITE_API_URL

export default function WatchedMovies() {

    const [watchedMovies, setWatchedMovies] = useState([])

    const { dialogOpen, selectedMovieId, handleOpenDialog, handleCloseDialog } = useConfirmationDialog()

    const { handleUpdateMovie } = useMovieActions()

    useEffect(() => {
        axios
            .get(`${API_URL}/movies?isWatched=true`)
            .then((res) => setWatchedMovies(res.data))
            .catch((error) => console.error("Error al obtener las películas vistas:", error));
    }, []);

    const handleRemoveFromWatched = () => {
        if(selectedMovieId) {
            handleUpdateMovie(
                selectedMovieId, {isWatched: false}, () => {
                    setWatchedMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== selectedMovieId))
                    handleCloseDialog()
                }
            ) 
        }
    }

    return (
        <Container sx={{ mt: 10, mb: 10 }}>
            <Typography textAlign="center" variant="h4" color="white" gutterBottom>✅ Películas vistas</Typography>
            {watchedMovies.length === 0 ? (
                <Typography textAlign="center" color="white">No hay películas en la lista</Typography>
            ) : (
                <Grid2 justifyContent="center" container spacing={3}>
                    {watchedMovies.map((movie) => (
                        <Grid2 items xs={12} sm={6} md={4} key={movie.id}>
                            <MovieCard movie={movie} onRemove={() => handleOpenDialog(movie.id)} />
                        </Grid2>
                    ))}
                </Grid2>
            )}
            <ConfirmationDialog open={dialogOpen} onClose={handleCloseDialog} onConfirm={handleRemoveFromWatched}
                    title="Eliminar Película" message="Esta película se eliminará de tu lista de películas vistas, ¿está seguro de que quiere eliminarla?" />
            <Grid2 sx={{mt: 1}} display="flex" justifyContent="center">
                <BackButton/>
            </Grid2>
        </Container>
    )

}