import { Card, CardMedia, CardContent, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MovieCard({ movie, onRemove }) {
    return (
        <Card sx={{
            bgcolor: "black", width: "320px", height: "400px", borderRadius: "15px", border: "5px solid", borderColor: "primary.main",
            boxShadow: 3,
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
                boxShadow: 6,
                transform: "scale(1.02)",
            },
        }}>
            <CardMedia component="img" height="300" width="300" image={movie.image} alt={movie.title} sx={{ width: "100%", height: "250px", objectFit: "cover" }} />
            <CardContent >
                <Typography variant="h6" sx={{ pb: "15px", color: "white" }}>
                    {movie.title} ({movie.year})
                </Typography>
                <Stack sx={{ bgcolor: "black", justifyContent: "center" }} direction="row" spacing={2}>
                    <Button component={Link} to={`/movie/${movie.id}`} variant="contained" sx={{ textAlign: "center", height: "35px", bgcolor: "background.main", "&:hover": { transform: "scale(1.05)" } }}
                        startIcon={<VisibilityIcon />}> Detalles
                    </Button>
                    <Button variant="contained" sx={{ bgcolor: "accent.main", height: "35px", "&:hover": { transform: "scale(1.05)" } }} onClick={() => onRemove(movie.id)}
                        startIcon={<DeleteIcon />}> Eliminar
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    )
}