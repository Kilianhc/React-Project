import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid2, Card, CardMedia, CardContent, Button, Stack } from "@mui/material";
import BackButton from "../Components/BackButton";
import PushPinIcon from "@mui/icons-material/PushPin";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getMovieById, updateMovie } from "../Utils/api";

export default function MovieDetails() {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieById(id);
                setMovie(data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchMovie();
    }, [id]);

    const handleUpdateMovie = async (updatedFields) => {
        try {
            const updatedMovie = await updateMovie(id, updatedFields);
            setMovie(updatedMovie);
        } catch (error) {
            console.error("Error al actualizar la película:", error);
        }
    };

    const addToWatchList = () => {
        handleUpdateMovie({ wantWatch: true })
    }

    const addToWatchedMovies = () => {
        handleUpdateMovie({ isWatched: true })
    }

    const addToFavorites = () => {
        handleUpdateMovie({ isFavorite: true })
    }

    if (!movie) return <Typography color="white" sx={{ mt: 10, textAlign: "center" }}>Loading...</Typography>

    return (
        <Container>
            <Grid2 container justifyContent="center" sx={{ mt: {sm:13, xs: 9 }, mb:{xs:5, sm: 0}}}>
                <Grid2 item xs={12} sm={6} md={4}>
                    <Card sx={{
                        bgcolor: "black", display: "flex", flexDirection:{xs:"column", sm:"row"}, maxWidth: "800px", height: {xs:"auto", sm:"700px"}, borderRadius: "15px", border: "5px solid",
                        borderColor: "primary.main"
                    }}>
                        <CardMedia
                            component="img"
                            image={movie.image}
                            alt={movie.title}
                            sx={{ width: {sm:"50%"}, height: "100%", objectFit: "cover" }}
                        />
                        <CardContent sx={{ mt: 5, color: "white", flex: 2, flexDirection: "column", justifyContent: "center", p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 5 }}>{movie.title} ({movie.year})</Typography>
                            <Typography variant="body2">Director: {movie.director}</Typography>
                            <Typography sx={{ mt: 1 }} variant="body2">Género: {movie.genre}</Typography>
                            <Typography sx={{ mt: 1 }} variant="body2">Actores principales: {movie.mainActors}</Typography>
                            <Typography sx={{ mt: 1 }} variant="body2">Calificación: {movie.rate}</Typography>
                            <Typography sx={{ mt: 1 }} variant="body2">Sinopsis: {movie.sinopsis}</Typography>
                            <Stack spacing={2} sx={{ mt: 10 }}>
                                <Button variant="contained" sx={{ bgcolor: "background.main", "&:hover": { transform: "scale(1.05)" } }} onClick={addToWatchList} startIcon={<PushPinIcon />}>
                                    Quiero verla
                                </Button>
                                <Button variant="contained" sx={{ bgcolor: "neutral.main", "&:hover": { transform: "scale(1.05)" } }} onClick={addToWatchedMovies} startIcon={<CheckIcon />}>
                                    Vista
                                </Button>
                                <Button variant="contained" sx={{ bgcolor: "accent.main", "&:hover": { transform: "scale(1.05)" } }} onClick={addToFavorites} startIcon={<FavoriteIcon />}>
                                    Favoritas
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
            <Grid2 sx={{ display: "flex", justifyContent: "center" }}>
                <BackButton />
            </Grid2>
        </Container>
    )
}