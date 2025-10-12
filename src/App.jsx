import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Main from './Components/Main/Main'
import NavBar from './Components/NavBar/NavBar'
import Header from './Components/Header/Header'

import CharactersPage from './Pages/Characters/CharactersPage'
import LocationsPage from './Pages/Locations/LocationsPage'
import EpisodesPage from './Pages/Episodes/EpisodesPage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Header />
      <div id='container-body'>
        <NavBar />
        <Routes>
          <Route path='/characters' element={<CharactersPage />} />
          <Route path='/locations' element={<LocationsPage />} />
          <Route path='/episodes' element={<EpisodesPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
