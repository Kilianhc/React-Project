import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Pagination, TextField, Typography, Grid2 } from "@mui/material";
import MovieCard from "../Components/MovieCard";
import ConfirmationDialog from "../Components/ConfirmationDialog";
import useConfirmationDialog from "../Utils/useConfirmationDialog";
import useMovieActions from "../Utils/useMovieActions";
import BackButton from "../Components/BackButton";
import Fuse from "fuse.js";
import { getMovies, deleteMovie } from "../Utils/api"

export default function Dashboard() {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const moviesPerPage = 9
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const genre = searchParams.get("genre");

    const { dialogOpen, selectedMovieId, handleOpenDialog, handleCloseDialog } = useConfirmationDialog()

    const { handleRemoveMovie } = useMovieActions()

    const filterMoviesByGenre = (movies, genre) => {
        if (genre) {
            const filtered = movies.filter((movie) => movie.genre.includes(genre))
            setFilteredMovies(filtered)
        } else {
            setFilteredMovies(movies)
        }
    }

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovies();
                setMovies(data);
                filterMoviesByGenre(data, genre);
            } catch (error) {
                console.error("Error al obtener las películas:", error);
            }
        };

        fetchMovies();
    }, []);

    const fuseOptions = {
        keys: ["genre"],
        threshold: 0.3
    }

    const fuse = new Fuse(movies, fuseOptions)

    useEffect(() => {
        if (searchTerm) {
            const results = fuse.search(searchTerm).map((result) => result.item)
            setFilteredMovies(results)
        } else if (genre) {
            filterMoviesByGenre(movies, genre)
        } else {
            setFilteredMovies(movies)
        }
    }, [searchTerm, genre, movies])

    const handleRemoveMovieConfirm = async () => {
        if (selectedMovieId) {
            try {
                await deleteMovie(selectedMovieId);
                setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== selectedMovieId));
                handleCloseDialog();
            } catch (error) {
                console.error("Error al eliminar la película:", error);
            }
        }
    };

    const handleChangePage = (event, value) => setPage(value)

    return (
        <Container sx={{ bgcolor: "secondary.main" }}>
            <Grid2 sx={{ display: "flex", justifyContent: "center" }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Buscar por género..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        mt: 15,
                        backgroundColor: "white",
                        borderRadius: 1,
                        width: "100%",
                        maxWidth: 400,
                        mb: 1,
                        "& .MuiOutlinedInput-root": {
                            color: "black",
                            "& fieldset": { border: "none" }
                        }
                    }}
                    slotProps={{
                        input: {
                            style: { color: "black" }, // Cambia el color del texto a negro
                        },
                    }}
                />
            </Grid2>
            <Grid2 justifyContent="center" container spacing={6} sx={{ pt: 5 }}>
                {filteredMovies.slice((page - 1) * moviesPerPage, page * moviesPerPage).map((movie) => (
                    <Grid2 item xs={12} sm={6} md={4} key={movie.id}>
                        <MovieCard movie={movie} onRemove={() => handleOpenDialog(movie.id)} />
                    </Grid2>
                ))}
            </Grid2>
            {filteredMovies.length === 0 && (
                <Typography sx={{ textAlign: "center", mt: 3, color: "white" }}>No hay películas de este género.</Typography>
            )}
            <ConfirmationDialog open={dialogOpen} onClose={handleCloseDialog} onConfirm={handleRemoveMovieConfirm}
                title="Eliminar Película" message="Esta película se eliminará completamente, ¿está seguro de que quiere eliminar esta película?" />
            <Grid2 sx={{ display: "flex", justifyContent: "space-between" }} >
                <Pagination count={Math.ceil(filteredMovies.length / moviesPerPage)} page={page} onChange={handleChangePage} sx={{ pt: 3, pb: 8, "& .MuiPaginationItem-root": { color: "white" } }} />
                <BackButton />
            </Grid2>
        </Container>
    )
}