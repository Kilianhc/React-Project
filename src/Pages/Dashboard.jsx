import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Pagination, Card, CardMedia, CardContent, Typography, Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import MovieCard from "../Components/MovieCard";
import ConfirmationDialog from "../Components/ConfirmationDialog";
import useConfirmationDialog from "../Utils/useConfirmationDialog";
import useMovieActions from "../Utils/useMovieActions";

const API_URL = import.meta.env.VITE_API_URL

export default function Dashboard() {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const moviesPerPage = 9

    const { dialogOpen, selectedMovieId, handleOpenDialog, handleCloseDialog } = useConfirmationDialog()

    const { handleRemoveMovie } = useMovieActions()

    useEffect(() => {
        axios
            .get(`${API_URL}/movies`)
            .then((res) => setMovies(res.data))
            .catch((error) => console.error("Error al obtener las películas:", error))
    }, [])

    const handleRemoveMovieConfirm = () => {
        if (selectedMovieId) {
            handleRemoveMovie(selectedMovieId, () => {
                setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== selectedMovieId))
                handleCloseDialog()
            })
        }
    }

    const handleChangePage = (event, value) => setPage(value)

    return (
        <Container sx={{ bgcolor: "secondary.main" }}>
            <Grid2 justifyContent="center" container spacing={6} sx={{ pt: 15 }}>
                {movies.slice((page - 1) * moviesPerPage, page * moviesPerPage).map((movie) => (
                    <Grid2 item xs={12} sm={6} md={4} key={movie.id}>
                        <MovieCard movie={movie} onRemove={() => handleOpenDialog(movie.id)} />
                    </Grid2>
                ))}
            </Grid2>
            <ConfirmationDialog open={dialogOpen} onClose={handleCloseDialog} onConfirm={handleRemoveMovieConfirm}
                title="Eliminar Película" message="Esta película se eliminará completamente, ¿está seguro de que quiere eliminar esta película?" />
            <Pagination count={Math.ceil(movies.length / moviesPerPage)} page={page} onChange={handleChangePage} sx={{ pt: 3, pb: 8, "& .MuiPaginationItem-root": { color: "white" } }} />
        </Container>
    )
}