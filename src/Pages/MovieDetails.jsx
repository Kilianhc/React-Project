import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Grid2, Card, CardMedia, CardContent, Button, Stack } from "@mui/material";

const API_URL = "http://localhost:5005/"

export default function MovieDetails() {
    const {id} = useParams()
    const [movie, setMovie] = useState(null)
    const [watchList, setWatchList] = useState([])
    const [watchedMovies, setWatchedMovies] = useState([])
    const [favorites, setFavorites] =useState([])

    useEffect(() => {
        axios
        .get(`${API_URL}movies/${id}`)
        .then((res) => setMovie(res.data))
        .catch((error) => console.error("Error al obtener los datos:", error))
    }, [id])

    const addToWatchList = () => {
        if (!watchList.find((m) => m.id === movie.id)) {
            setWatchList([...watchList, movie])
        }
    }

    const addToWatchedMovies = () => {
        if (!watchedMovies.find((m) => m.id === movie.id)) {
            setWatchedMovies([...watchedMovies, movie])
        }
    }

    const addToFavorites = () => {
        if (!favorites.find((m) => m.id === movie.id)) {
            setFavorites([...favorites, movie])
        }
    }

    if (!movie) return <Typography sx={{ mt: 10, textAlign: "center" }}>Loading...</Typography>

    return (
        <Container>
        <Grid2 container justifyContent="center" sx={{ mt: 15 }}>
            <Grid2 item xs={12} sm={6} md={4}>
                <Card sx={{ width: "100%", height: "600px" }}>
                    <CardMedia
                        component="img"
                        image={movie.image}
                        alt={movie.title}
                        sx={{ width: "100%", height: "300px", objectFit: "cover" }}
                    />
                    <CardContent>
                        <Typography variant="h6">{movie.title} ({movie.year})</Typography>
                        <Typography variant="body2">Director: {movie.director}</Typography>
                        <Typography variant="body2">Género: {movie.genre}</Typography>
                        <Typography variant="body2">Actores principales: {movie.mainActors}</Typography>
                        <Typography variant="body2">Calificación: {movie.rate}</Typography>
                        <Stack spacing={2} sx={{mt: 2}}>
                            <Button variant="contained" color="warning" onClick={addToWatchList}>
                            ➕ Quiero verla
                            </Button>
                            <Button variant="contained" color="secondary" onClick={addToWatchedMovies}>
                            ✅ Vista
                            </Button>
                            <Button variant="contained" color="primary" onClick={addToFavorites}>
                            ❤️ Favoritas 
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    </Container>
    )
}