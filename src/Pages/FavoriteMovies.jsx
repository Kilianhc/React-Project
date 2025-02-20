import { useEffect, useState } from "react";
import { Container, Typography, Grid2 } from "@mui/material";
import MovieCard from "../Components/MovieCard";
import ConfirmationDialog from "../Components/ConfirmationDialog";
import useConfirmationDialog from "../Utils/useConfirmationDialog";
import useMovieActions from "../Utils/useMovieActions";
import BackButton from "../Components/BackButton";
import { getMovies } from "../Utils/api";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function FavoriteMovies() {

    const [favoriteMovies, setFavoriteMovies] = useState([])

    const { dialogOpen, selectedMovieId, handleOpenDialog, handleCloseDialog } = useConfirmationDialog()

    const { handleUpdateMovie } = useMovieActions()

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            try {
                const movies = await getMovies();
                const favorites = movies.filter((movie) => movie.isFavorite);
                setFavoriteMovies(favorites);
            } catch (error) {
                console.error("Error al obtener las películas favoritas:", error);
            }
        };

        fetchFavoriteMovies();
    }, []);

    const handleRemoveFromFavorites = () => {
        if (selectedMovieId) {
            handleUpdateMovie(
                selectedMovieId, { isFavorite: false }, () => {
                    setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== selectedMovieId))
                    handleCloseDialog()
                }
            )
        }
    }

    return (
        <Container sx={{ mt: 15, mb: 10, maxWidth: "100%", px: { xs: 2, sm: 3 } }}>
            <Typography textAlign="center" variant="h4" color="white" gutterBottom sx={{ mb: 5, display:"flex", justifyContent:"center" }}><FavoriteIcon fontSize="large"/>Favoritas</Typography>
            {favoriteMovies.length === 0 ? (
                <Typography textAlign="center" color="white">No hay películas en la lista</Typography>
            ) : (
                <Grid2 justifyContent="center" container spacing={3} sx={{ width: "100%", margin: 0 }}>
                    {favoriteMovies.map((movie) => (
                        <Grid2 items xs={12} sm={6} md={4} key={movie.id}>
                            <MovieCard movie={movie} onRemove={() => handleOpenDialog(movie.id)} />
                        </Grid2>
                    ))}
                </Grid2>
            )}
            <ConfirmationDialog open={dialogOpen} onClose={handleCloseDialog} onConfirm={handleRemoveFromFavorites}
                title="Eliminar Película" message="Esta película se eliminará de tu lista de favoritas, ¿está seguro de que quiere eliminarla?" />
            <Grid2 sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                <BackButton />
            </Grid2>
        </Container>
    )
}