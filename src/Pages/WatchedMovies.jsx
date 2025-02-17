import { useState } from "react";
import { Container, Typography, Card, CardMedia, CardContent, Grid2 } from "@mui/material";

export default function WatchedMovies() {

    const [watchedMovies, setWatchedMovies] = useState([])

    return (
        <Container sx={{mt: 15}}>
            <Typography variant="h4" gutterBottom>✅ Películas vistas</Typography>
            {watchedMovies.length === 0 ? (
                <Typography>No hay películas en la lista</Typography>
            ) : (
                <Grid2 container spacing={3}>
                    {watchedMovies.map((movie) => (
                        <Grid2 items xs={12} sm={6} md={4} key={movie.id}>
                            <Card>
                                <CardMedia component="img" height="300" image={movie.image} alt={movie.title} />
                                <CardContent>
                                    <Typography variant="h6">{movie.title} ({movie.year})</Typography> 
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            )}
        </Container>
    )

}