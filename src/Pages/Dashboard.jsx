import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Pagination, Card, CardMedia, CardContent, Typography, Grid2 } from "@mui/material";
import { Link } from "react-router-dom";

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

    const handleChangePage = (event, value) => setPage(value)

    return (
        <Container>
            <Grid2 container spacing={6} sx={{ mt: 15 }}>
                {movies.slice((page - 1) * moviesPerPage, page * moviesPerPage).map((movie) => (
                    <Grid2 item xs={12} sm={6} md={4} key={movie.id}>
                        <Card sx={{ width: "350px", height: "500px" }}>
                            <CardMedia component="img" height="300" width="300" image={movie.image} alt={movie.title} sx={{ width: "100%", height: "300px", objectFit: "cover" }} />
                            <CardContent>
                                <Typography variant="h6" sx={{ marginBottom: "30px" }}>
                                    {movie.title} ({movie.year})
                                </Typography>
                                <Button component={Link} to={`movie/${movie.id}`} variant="contained" color="primary">
                                    Ver Detalles
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
            <Pagination count={Math.ceil(movies.length / moviesPerPage)} page={page} onChange={handleChangePage} sx={{ mt: 3, mb: 8 }} />
        </Container>
    )
}