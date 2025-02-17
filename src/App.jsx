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


export default function App() {

  const [asidebarOpen, setAsidebarOpen] = useState(false)
  const toggleAsideBar = () => setAsidebarOpen(!asidebarOpen)
  
  return (
    <>
    <div>
      <NavBar toggleAsideBar={toggleAsideBar} />
      <div>
        <AsideBar open={asidebarOpen} toggleAsideBar={toggleAsideBar} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/watchlist' element={<WatchList />} />
          <Route path='/watched' element={<WatchedMovies />} />
          <Route path='/favorites' element={<FavoriteMovies />} />
        </Routes>
      </div>
      <Footer />
    </div>  
    </>
  )
}


