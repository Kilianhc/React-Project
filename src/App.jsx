import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import NavBar from './Components/Navbar'
import AsideBar from './Components/AsideBar'
import Dashboard from './Pages/Dashboard'
import Footer from './Components/Footer'
import MovieDetails from './Pages/MovieDetails'
import WatchList from './Pages/WatchList'
import FavoriteMovies from './Pages/FavoriteMovies'
import WatchedMovies from './Pages/WatchedMovies'
import { ThemeProvider } from "@mui/material/styles"
import theme from './Utils/theme'
import AddMovie from './Pages/AddMovie'


export default function App() {

  const [asidebarOpen, setAsidebarOpen] = useState(false)
  const toggleAsideBar = () => setAsidebarOpen(!asidebarOpen)
  
  return (
    <>
    <div>
      <ThemeProvider theme={theme}>
      <NavBar toggleAsideBar={toggleAsideBar} />
      <div>
        <AsideBar open={asidebarOpen} toggleAsideBar={toggleAsideBar} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/watchlist' element={<WatchList />} />
          <Route path='/watched' element={<WatchedMovies />} />
          <Route path='/favorites' element={<FavoriteMovies />} />
          <Route path='/addmovie' element={<AddMovie />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
        </Routes>
      </div>
      <Footer />
      </ThemeProvider>
    </div>  
    </>
  )
}


