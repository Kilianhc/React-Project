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
        <Container sx={{bgcolor:"secondary.main"}}>
            <Grid2 justifyContent="center" container spacing={6} sx={{ pt: 15 }}>
                {movies.slice((page - 1) * moviesPerPage, page * moviesPerPage).map((movie) => (
                    <Grid2 item xs={12} sm={6} md={4} key={movie.id}>
                        <Card sx={{ width: "320px", height: "400px", borderRadius:"15px", border:"5px solid", borderColor:"primary.main",
                                boxShadow: 3,
                                transition: "transform 0.2s ease-in-out",
                                "&:hover": {
                                    boxShadow: 6,
                                    transform: "scale(1.02)",
                                },}}>
                            <CardMedia component="img" height="300" width="300" image={movie.image} alt={movie.title} sx={{ width: "100%", height: "250px", objectFit: "cover" }} />
                            <CardContent>
                                <Typography variant="h6" sx={{ marginBottom: "15px" }}>
                                    {movie.title} ({movie.year})
                                </Typography>
                                <Button component={Link} to={`movie/${movie.id}`} variant="contained" sx={{bgcolor:"accent.main"}}>
                                    Ver Detalles
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
            <Pagination count={Math.ceil(movies.length / moviesPerPage)} page={page} onChange={handleChangePage} sx={{ pt: 3, pb: 8, "& .MuiPaginationItem-root":{color: "white"}}} />
        </Container>
    )
}