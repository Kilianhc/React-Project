import { useState, useEffect } from "react";
import { Container, Typography, Card, CardMedia, CardContent, Grid2 } from "@mui/material";
import axios from "axios";
import MovieCard from "../Components/MovieCard";

const API_URL = import.meta.env.VITE_API_URL

export default function WatchList() {

    const [watchList, setWatchList] = useState([])

    useEffect(() => {
        axios
        .get(`${API_URL}/movies?wantWatch=true`)
        .then((res) => setWatchList(res.data))
        .catch((error) => console.error("Error al obtener las películas favoritas:", error));
}, []);

const handleRemoveFromWatchList = (movieId) => {
    axios
    .patch(`${API_URL}/movies/${movieId}`, {wantWatch: false})
    .then(() => {
        setWatchList((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId))
    })
    .catch((error) => console.error("Error al eliminar de Películas por ver:", error))
}

    return (
        <Container sx={{mt: 15}}>
            <Typography variant="h4" color="white" gutterBottom>📌 Películas por Ver</Typography>
            {watchList.length === 0 ? (
                <Typography color="white">No hay películas en la lista</Typography>
            ) : (
                <Grid2 container spacing={3}>
                    {watchList.map((movie) => (
                        <Grid2 items xs={12} sm={6} md={4} key={movie.id}>
                            <MovieCard movie={movie} showRemoveButton={true} onRemove={handleRemoveFromWatchList} />
                        </Grid2>
                    ))}
                </Grid2>
            )}
        </Container>
    )

}