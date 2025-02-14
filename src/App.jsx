import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import NavBar from './Components/Navbar'
import AsideBar from './Components/AsideBar'
import Dashboard from './Pages/Dashboard'
import Footer from './Components/Footer'


export default function App() {
  
  return (
    <>
    <div>
      <NavBar />
      <div>
        <AsideBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
    </div>  
    </>
  )
}


