import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { Container, TextField, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL

export default function AddMovie() {

    const [title, setTitle] = useState(" ")
    const [year, setYear] = useState(" ")
    const [director, setDirector] = useState(" ")
    const [actors, setActors] = useState(" ")
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
        const {name, value} =e.target
        switch (name) {
            case "title": setTitle(value); break;
            case "year": setYear(value); break;
            case "director": setDirector(value); break;
            case "actors": setActors(value); break;
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

        if(!title || !year || !director || !actors || !genre || !sinopsis || !rate || !image) {
            setError("Todos los campos son obligatorios")
            return
        }

        const newMovie = {
            title, 
            year: parseInt(year), 
            director, 
            mainActors: actors.split(",").map(actor => actor.trim()), 
            genre, 
            sinopsis, 
            rate: parseFloat(rate), 
            isWatched: watched, 
            isFavorite: favorite, 
            wantWatch: watchList, 
            image
        }

        try {
            const response = await axios.post(`${API_URL}/movies`, newMovie)
            navigate("/")
        } catch (error) {
            console.error("Error al añadir la película:", error)
            setError("Hubo un problema al añadir la película. Inténtelo de nuevo.")
        }
    }

    return (
        <Container sx={{mt:"70px", color:"white"}}>
            <Typography sx={{textAlign:"center"}}>Añadir Nueva Película</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField label="Título" name="title" value={title} onChange={handleInput} fullWidthmargin="normal" required sx={{}}/>
                <TextField label="Año" name="year" type="number" value={year} onChange={handleInput} fullWidth margin="normal" required/>
                <TextField label="Director" name="director" value={director} onChange={handleInput} fullWidth margin="normal" required/>
                <TextField label="Actores (separados por comas)" name="actors" value={actors} onChange={handleInput} fullWidth margin="normal" required/>
                <TextField label="Género" name="genre" value={genre} onChange={handleInput} fullWidth margin="normal" required/>
                <TextField label="Sinopsis" name="sinopsis" value={sinopsis} onChange={handleInput} fullWidth margin="normal" multiline rows={3} required/>
                <TextField label="Calificación" name="rate" type="number" step="0.1" value={rate} onChange={handleInput} fullWidth margin="normal" required/>
                <FormControlLabel control={<Checkbox name="watched" checked={watched} onChange={handleInput} />} label="Vista"/>
                <FormControlLabel control={<Checkbox name="favorite" checked={favorite} onChange={handleInput} />} label="Favorita"/>
                <FormControlLabel control={<Checkbox name="watchList" checked={watchList} onChange={handleInput} />} label="Por Ver"/>
                <TextField label="URL de la Imagen" name="image" value={image} onChange={handleInput} fullWidth margin="normal" required/>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Añadir Película</Button>
            </form>
        </Container>
    )
    
}