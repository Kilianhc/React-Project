import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Grid2, Card, CardMedia, CardContent, Button, Stack } from "@mui/material";
import BackButton from "../Components/BackButton";

const API_URL = import.meta.env.VITE_API_URL

export default function MovieDetails() {
    const {id} = useParams()
    const [movie, setMovie] = useState(null)
    
    useEffect(() => {
        axios
        .get(`${API_URL}/movies/${id}`)
        .then((res) => setMovie(res.data))
        .catch((error) => console.error("Error al obtener los datos:", error))
    }, [id])

    const updateMovie = (updatedFields) => {
        axios
            .patch(`${API_URL}/movies/${id}`, updatedFields)
            .then((res) => setMovie(res.data))
            .catch((error) => console.error("Error al actualizar la película:", error));
    };

    const addToWatchList = () => {
        updateMovie({wantWatch: true})
    }

    const addToWatchedMovies = () => {
        updateMovie({isWatched: true})
    }

    const addToFavorites = () => {
        updateMovie({isFavorite: true})
    }

    if (!movie) return <Typography color="white" sx={{ mt: 10, textAlign: "center" }}>Loading...</Typography>

    return (
        <Container>
        <Grid2 container justifyContent="center" sx={{ mt: 10 }}>
            <Grid2 item xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor:"black", display:"flex", maxWidth: "800px", height: "700px", borderRadius:"15px", border: "5px solid",
                    borderColor:"primary.main"
                 }}>
                    <CardMedia
                        component="img"
                        image={movie.image}
                        alt={movie.title}
                        sx={{ width: "50%", height: "100%", objectFit: "cover" }}
                    />
                    <CardContent sx={{mt: 5, color:"white", flex: 2, flexDirection: "column", justifyContent: "center", p: 3}}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 5 }}>{movie.title} ({movie.year})</Typography>
                        <Typography variant="body2">Director: {movie.director}</Typography>
                        <Typography sx={{mt: 1}} variant="body2">Género: {movie.genre}</Typography>
                        <Typography sx={{mt: 1}} variant="body2">Actores principales: {movie.mainActors}</Typography>
                        <Typography sx={{mt: 1}} variant="body2">Calificación: {movie.rate}</Typography>
                        <Typography sx={{mt: 1}} variant="body2">Sinopsis: {movie.sinopsis}</Typography>
                        <Stack spacing={2} sx={{mt:10}}>
                            <Button variant="contained" sx={{bgcolor:"background.main"}} onClick={addToWatchList}>
                            ✚ Quiero verla
                            </Button>
                            <Button variant="contained" sx={{bgcolor:"neutral.main"}}  onClick={addToWatchedMovies}>
                            ✅ Vista
                            </Button>
                            <Button variant="contained" sx={{bgcolor:"accent.main"}} onClick={addToFavorites}>
                            ❤️ Favoritas 
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
        <Grid2 sx={{display:"flex", justifyContent:"center"}}>
            <BackButton />
        </Grid2>
    </Container>
    )
}