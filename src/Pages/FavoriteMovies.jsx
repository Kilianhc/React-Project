import { useEffect, useState } from "react";
import { Container, Typography, Card, CardMedia, CardContent, Grid2 } from "@mui/material";
import axios from "axios";
import MovieCard from "../Components/MovieCard";

const API_URL = import.meta.env.VITE_API_URL

export default function FavoriteMovies() {

    const [favoriteMovies, setFavoriteMovies] = useState([])

    useEffect(() => {
        axios
        .get(`${API_URL}/movies?isFavorite=true`)
        .then((res) => setFavoriteMovies(res.data))
        .catch((error) => console.error("Error al obtener las películas favoritas:", error));
}, []);

    const handleRemoveFromFavorites = (movieId) => {
        axios
        .patch(`${API_URL}/movies/${movieId}`, {isFavorite: false})
        .then(() => {
            setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId))
        })
        .catch((error) => console.error("Error al eliminar de favoritos:", error))
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
                            <MovieCard movie={movie} showRemoveButton={true} onRemove={handleRemoveFromFavorites} />
                        </Grid2>
                    ))}
                </Grid2>
            )}
        </Container>
    )

}