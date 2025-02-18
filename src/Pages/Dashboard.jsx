import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Pagination, Card, CardMedia, CardContent, Typography, Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import MovieCard from "../Components/MovieCard";

const API_URL = import.meta.env.VITE_API_URL

export default function Dashboard() {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const moviesPerPage = 9

    useEffect(() => {
        axios
            .get(`${API_URL}/movies`)
            .then((res) => setMovies(res.data))
    }, [])

    const handleRemoveFromAll = (movieId) => {
        axios
        .delete(`${API_URL}/movies/${movieId}`)
        .then(() => {
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId))
        })
        .catch((error) => console.error("Error al eliminar la película:", error))
    }

    const handleChangePage = (event, value) => setPage(value)

    return (
        <Container sx={{bgcolor:"secondary.main"}}>
            <Grid2 justifyContent="center" container spacing={6} sx={{ pt: 15 }}>
                {movies.slice((page - 1) * moviesPerPage, page * moviesPerPage).map((movie) => (
                    <Grid2 item xs={12} sm={6} md={4} key={movie.id}>
                        <MovieCard movie={movie} showRemoveButton={true} onRemove={handleRemoveFromAll} />
                    </Grid2>
                ))}
            </Grid2>
            <Pagination count={Math.ceil(movies.length / moviesPerPage)} page={page} onChange={handleChangePage} sx={{ pt: 3, pb: 8, "& .MuiPaginationItem-root":{color: "white"}}} />
        </Container>
    )
}