import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function AddMovie() {


    const [title, setTitle] = useState()
    const [year, setYear] = useState()
    const [director, setDirector] = useState()
    const [actors, setActors] = useState()
    const [genre, setGenre] = useState()
    const [sinopsis, setSinopsis] = useState()
    const [rate, setRate] = useState()
    const [watched, setWatched] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [watchList, setWatchList] = useState(false)
    const [image, setImage] = useState()

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
            case "watched": setWatched(value); break;
            case "favorite": setFavorite(value); break;
            case "watchList": setWatchList(value); break;
            case "image": setImage(value); break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newMovie = {title, year, director, actors, genre, sinopsis, rate, watched, favorite, watchList, image}
        
    }
    
}