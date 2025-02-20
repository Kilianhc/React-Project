import { useState, useEffect } from "react";
import { Container, Typography, Grid2 } from "@mui/material";
import MovieCard from "../Components/MovieCard";
import ConfirmationDialog from "../Components/ConfirmationDialog";
import useMovieActions from "../Utils/useMovieActions";
import useConfirmationDialog from "../Utils/useConfirmationDialog";
import BackButton from "../Components/BackButton";
import { getMovies } from "../Utils/api";
import PushPinIcon from "@mui/icons-material/PushPin";

export default function WatchList() {

    const [watchList, setWatchList] = useState([])

    const { dialogOpen, selectedMovieId, handleOpenDialog, handleCloseDialog } = useConfirmationDialog()

    const { handleUpdateMovie } = useMovieActions()

    useEffect(() => {
        const fetchWatchList = async () => {
            try {
                const movies = await getMovies();
                const watchListMovies = movies.filter((movie) => movie.wantWatch);
                setWatchList(watchListMovies);
            } catch (error) {
                console.error("Error al obtener las películas por ver:", error);
            }
        };

        fetchWatchList();
    }, []);

    const handleRemoveFromWatchList = () => {
        if (selectedMovieId) {
            handleUpdateMovie(
                selectedMovieId, { wantWatch: false }, () => {
                    setWatchList((prevMovies) => prevMovies.filter((movie) => movie.id !== selectedMovieId))
                    handleCloseDialog()
                }
            )
        }
    }

    return (
        <Container sx={{ mt: 15, mb: 10, maxWidth: "100%", px: { xs: 2, sm: 3 }  }}>
            <Typography textAlign="center" variant="h4" color="white" gutterBottom sx={{mb:5, display:"flex", justifyContent:"center" }}><PushPinIcon fontSize="large"/>Películas por Ver</Typography>
            {watchList.length === 0 ? (
                <Typography textAlign="center" color="white" sx={{ mb: 5 }}>No hay películas en la lista</Typography>
            ) : (
                <Grid2 justifyContent="center" container spacing={3} sx={{ width: "100%", margin: 0 }}>
                    {watchList.map((movie) => (
                        <Grid2 items xs={12} sm={6} md={4} key={movie.id}>
                            <MovieCard movie={movie} onRemove={() => handleOpenDialog(movie.id)} />
                        </Grid2>
                    ))}
                </Grid2>
            )}
            <ConfirmationDialog open={dialogOpen} onClose={handleCloseDialog} onConfirm={handleRemoveFromWatchList}
                title="Eliminar Película" message="Esta película se eliminará de tu lista de películas por ver, ¿está seguro de que quiere eliminarla?" />
            <Grid2 sx={{ mt: 1 }} display="flex" justifyContent="center">
                <BackButton />
            </Grid2>
        </Container>
    )

}