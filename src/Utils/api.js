import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getMovies = async () => {
    try {
        const response = await axios.get(`${API_URL}/movies`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las películas:", error);
        throw error;
    }
};

export const getMovieById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la película:", error);
        throw error;
    }
};

export const addMovie = async (newMovie) => {
    try {
        const response = await axios.post(`${API_URL}/movies`, newMovie);
        return response.data;
    } catch (error) {
        console.error("Error al añadir la película:", error);
        throw error;
    }
};

export const updateMovie = async (id, updatedFields) => {
    try {
        const response = await axios.patch(`${API_URL}/movies/${id}`, updatedFields);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la película:", error);
        throw error;
    }
};

export const deleteMovie = async (id) => {
    try {
        await axios.delete(`${API_URL}/movies/${id}`);
    } catch (error) {
        console.error("Error al eliminar la película:", error);
        throw error;
    }
};