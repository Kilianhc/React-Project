import { Card, CardMedia, CardContent, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function MovieCard({movie, showRemoveButton = false, onRemove}) {
    return (
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
            <Stack direction="row" spacing={2}>
            <Button component={Link} to={`movie/${movie.id}`} variant="contained" sx={{ textAlign:"center", height:"45px", bgcolor:"accent.main"}}>
                Ver Detalles
            </Button>
            {showRemoveButton && (
                <Button variant="contained" sx={{bgcolor: "red", height:"45px"}} onClick={() =>onRemove(movie.id)}>
                🗑️ Eliminar de la lista 
                </Button>
            )}
            </Stack>
        </CardContent>
    </Card>
    )
}