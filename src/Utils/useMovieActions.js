import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function useMovieActions() {
    const handleRemoveMovie = async (movieId, onSuccess) => {
        try {
            await axios.delete(`${API_URL}/movies/${movieId}`)
            onSuccess()
        } catch (error) {
            console.error("Error al eliminar la película:", error)
        }
    } 

    const handleUpdateMovie = async (movieId, updatedFields, onSuccess) => {
        try {
            await axios.patch(`${API_URL}/movies/${movieId}`, updatedFields)
            onSuccess()
        } catch (error) {
            console.error("Error al actualizar la película:", error)
        }
    }

    return {
        handleRemoveMovie, handleUpdateMovie
    }
}