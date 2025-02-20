import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, TextField, Button, Checkbox, FormControlLabel, Typography, Grid2 } from "@mui/material";
import BackButton from "../Components/BackButton";
import AddIcon from "@mui/icons-material/Add";
import { addMovie } from "../Utils/api";

export default function AddMovie() {

    const [title, setTitle] = useState(" ")
    const [year, setYear] = useState(" ")
    const [director, setDirector] = useState(" ")
    const [mainActors, setMainActors] = useState(" ")
    const [genre, setGenre] = useState(" ")
    const [sinopsis, setSinopsis] = useState(" ")
    const [rate, setRate] = useState(" ")
    const [watched, setWatched] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [watchList, setWatchList] = useState(false)
    const [image, setImage] = useState(" ")
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target
        switch (name) {
            case "title": setTitle(value); break;
            case "year": setYear(value); break;
            case "director": setDirector(value); break;
            case "mainActors": setMainActors(value); break;
            case "genre": setGenre(value); break;
            case "sinopsis": setSinopsis(value); break;
            case "rate": setRate(value); break;
            case "watched": setWatched(e.target.checked); break;
            case "favorite": setFavorite(e.target.checked); break;
            case "watchList": setWatchList(e.target.checked); break;
            case "image": setImage(value); break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !year || !director || !mainActors || !genre || !sinopsis || !rate || !image) {
            setError("Todos los campos son obligatorios")
            return
        }

        const newMovie = {
            title,
            year,
            director,
            mainActors,
            genre,
            sinopsis,
            rate,
            isWatched: watched,
            isFavorite: favorite,
            wantWatch: watchList,
            image
        }

        try {
            await addMovie(newMovie)
            navigate("/")
        } catch (error) {
            console.error("Error al añadir la película:", error)
            setError("Hubo un problema al añadir la película. Inténtelo de nuevo.")
        }
    }

    return (
        <Container sx={{ mt: "70px", color: "white", mt: 11, mb: 8 }}>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField label="Título" name="title" value={title} onChange={handleInput} fullWidthmargin="normal" required sx={{
                    input: { color: "white", bgcolor:"primary.main" }, label: { color: "white" }, "& .MuiInputLabel-root": { color: "white" }
                }} />
                <TextField label="Año" name="year" value={year} onChange={handleInput} fullWidth margin="normal" required sx={{
                    input: { color: "white", bgcolor:"primary.main" }, label: { color: "white" }, "& .MuiInputLabel-root": { color: "white" }
                }} />
                <TextField label="Director" name="director" value={director} onChange={handleInput} fullWidth margin="normal" required sx={{
                    input: { color: "white", bgcolor:"primary.main" }, label: { color: "white" }, "& .MuiInputLabel-root": { color: "white" }
                }} />
                <TextField label="Actores" name="mainActors" value={mainActors} onChange={handleInput} fullWidth margin="normal" required sx={{
                    input: { color: "white", bgcolor:"primary.main" }, label: { color: "white" }, "& .MuiInputLabel-root": { color: "white" }
                }} />
                <TextField label="Género" name="genre" value={genre} onChange={handleInput} fullWidth margin="normal" required sx={{
                    input: { color: "white", bgcolor:"primary.main" }, label: { color: "white" }, "& .MuiInputLabel-root": { color: "white" }
                }} />
                <TextField label="Sinopsis" name="sinopsis" value={sinopsis} onChange={handleInput} fullWidth margin="normal" multiline rows={3} required sx={{
                    "& .MuiInputBase-input": { color: "white", bgcolor:"primary.main" }, "& .MuiInputLabel-root": { color: "white" }
                }} />
                <TextField label="Calificación" name="rate" value={rate} onChange={handleInput} fullWidth margin="normal" required sx={{
                    input: { color: "white", bgcolor:"primary.main" }, label: { color: "white" }, "& .MuiInputLabel-root": { color: "white" }
                }} />
                <FormControlLabel control={<Checkbox name="watched" checked={watched} onChange={handleInput} sx={{ color: "white", "&.Mui-checked": { color: "white" } }} />} label="Vista" />
                <FormControlLabel control={<Checkbox name="favorite" checked={favorite} onChange={handleInput} sx={{ color: "white", "&.Mui-checked": { color: "white" } }} />} label="Favorita" />
                <FormControlLabel control={<Checkbox name="watchList" checked={watchList} onChange={handleInput} sx={{ color: "white", "&.Mui-checked": { color: "white" } }} />} label="Por Ver" />
                <TextField label="URL de la Imagen" name="image" value={image} onChange={handleInput} fullWidth margin="normal" required sx={{
                    input: { color: "white", bgcolor:"primary.main" }, label: { color: "white" }, "& .MuiInputLabel-root": { color: "white" }
                }} />
                <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} startIcon={<AddIcon />}>Añadir Película</Button>
                    <BackButton />
                </Grid2>
            </form>
        </Container>
    )

}