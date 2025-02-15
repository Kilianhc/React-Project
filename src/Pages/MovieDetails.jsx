import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";

const API_URL = "http://localhost:5005/"

export default function MovieDetails() {
    const {id} = useParams()
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        axios
        .get(`${API_URL}movies/${id}`)
        .then((res) => setMovie(res.data))
    }, [id])

    if (!movie) return <Typography>Loading...</Typography>

    return (
        <Container>
            <Typography variant="h3">{movie.title} {movie.director} ({movie.year})</Typography>
            <Typography variant="body1">{movie.mainActors} {movie.genre} {movie.rate}</Typography>
        </Container>
    )
}