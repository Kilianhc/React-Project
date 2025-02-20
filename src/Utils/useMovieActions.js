import {deleteMovie, updateMovie} from "../Utils/api"

export default function useMovieActions() {
    const handleRemoveMovie = async (movieId, onSuccess) => {
        try {
            await deleteMovie(movieId);
            onSuccess();
        } catch (error) {
            console.error("Error al eliminar la película:", error);
        }
    };

    const handleUpdateMovie = async (movieId, updatedFields, onSuccess) => {
        try {
            await updateMovie(movieId, updatedFields);
            onSuccess();
        } catch (error) {
            console.error("Error al actualizar la película:", error);
        }
    };

    return {
        handleRemoveMovie,
        handleUpdateMovie
    };
}