import { useState, useEffect } from "react";
import { Container, Typography, Card, CardMedia, CardContent, Grid2 } from "@mui/material";
import axios from "axios";
import MovieCard from "../Components/MovieCard";
import ConfirmationDialog from "../Components/ConfirmationDialog";
import useMovieActions from "../Utils/useMovieActions";
import useConfirmationDialog from "../Utils/useConfirmationDialog";

const API_URL = import.meta.env.VITE_API_URL

export default function WatchList() {

    const [watchList, setWatchList] = useState([])

    const { dialogOpen, selectedMovieId, handleOpenDialog, handleCloseDialog } = useConfirmationDialog()

    const { handleUpdateMovie } = useMovieActions()

    useEffect(() => {
        axios
            .get(`${API_URL}/movies?wantWatch=true`)
            .then((res) => setWatchList(res.data))
            .catch((error) => console.error("Error al obtener las películas favoritas:", error));
    }, []);

    const handleRemoveFromWatchList = () => {
        if(selectedMovieId) {
            handleUpdateMovie(
                selectedMovieId, {wantWatch: false}, () => {
                    setWatchList((prevMovies) => prevMovies.filter((movie) => movie.id !== selectedMovieId))
                    handleCloseDialog()
                }
            ) 
        }
    }

    return (
        <Container sx={{ mt: 15 }}>
            <Typography variant="h4" color="white" gutterBottom>📌 Películas por Ver</Typography>
            {watchList.length === 0 ? (
                <Typography color="white">No hay películas en la lista</Typography>
            ) : (
                <Grid2 container spacing={3}>
                    {watchList.map((movie) => (
                        <Grid2 items xs={12} sm={6} md={4} key={movie.id}>
                            <MovieCard movie={movie} onRemove={() => handleOpenDialog(movie.id)} />
                        </Grid2>
                    ))}
                </Grid2>
            )}
            <ConfirmationDialog open={dialogOpen} onClose={handleCloseDialog} onConfirm={handleRemoveFromWatchList}
                                            title="Eliminar Película" message="Esta película se eliminará de tu lista de películas por ver, ¿está seguro de que quiere eliminarla?" />
        </Container>
    )

}