import { Card, CardMedia, CardContent, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function MovieCard({movie, onRemove}) {
    return (
        <Card sx={{ bgcolor:"black", width: "320px", height: "400px", borderRadius:"15px", border:"5px solid", borderColor:"primary.main",
            boxShadow: 3,
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
                boxShadow: 6,
                transform: "scale(1.02)",
            },}}>
        <CardMedia component="img" height="300" width="300" image={movie.image} alt={movie.title} sx={{ width: "100%", height: "250px", objectFit: "cover" }} />
        <CardContent >
            <Typography variant="h6" sx={{ pb: "15px", color:"white" }}>
                {movie.title} ({movie.year})
            </Typography>
            <Stack sx={{bgcolor:"black"}} direction="row" spacing={2}>
            <Button component={Link} to={`/movie/${movie.id}`} variant="contained" sx={{ textAlign:"center", height:"45px", bgcolor:"background.main"}}>
                Ver Detalles
            </Button>
                <Button variant="contained" sx={{bgcolor: "accent.main", height:"45px"}} onClick={() =>onRemove(movie.id)}>
                🗑️ Eliminar de la lista 
                </Button>
            </Stack>
        </CardContent>
    </Card>
    )
}