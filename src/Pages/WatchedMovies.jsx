import { useState, useEffect } from "react";
import { Container, Typography, Card, CardMedia, CardContent, Grid2 } from "@mui/material";
import axios from "axios";
import MovieCard from "../Components/MovieCard";

const API_URL = import.meta.env.VITE_API_URL

export default function WatchedMovies() {

    const [watchedMovies, setWatchedMovies] = useState([])

    useEffect(() => {
        axios
        .get(`${API_URL}/movies?isWatched=true`)
        .then((res) => setWatchedMovies(res.data))
        .catch((error) => console.error("Error al obtener las películas vistas:", error));
}, []);

const handleRemoveFromWatched = (movieId) => {
    axios
    .patch(`${API_URL}/movies/${movieId}`, {isWatched: false})
    .then(() => {
        setWatchedMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId))
    })
    .catch((error) => console.error("Error al eliminar de Películas vistas:", error))
}

    return (
        <Container sx={{mt: 15}}>
            <Typography variant="h4" color="white" gutterBottom>✅ Películas vistas</Typography>
            {watchedMovies.length === 0 ? (
                <Typography color="white">No hay películas en la lista</Typography>
            ) : (
                <Grid2 container spacing={3}>
                    {watchedMovies.map((movie) => (
                        <Grid2 items xs={12} sm={6} md={4} key={movie.id}>
                            <MovieCard movie={movie} showRemoveButton={true} onRemove={handleRemoveFromWatched} />
                        </Grid2>
                    ))}
                </Grid2>
            )}
        </Container>
    )

}