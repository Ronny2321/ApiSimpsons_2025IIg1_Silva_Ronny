import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <ul>                
        <li><Link to="/characters">Personajes</Link></li>
        <li> <Link to="/locations">Lugares</Link></li>
        <li> <Link to="/episodes">Episodios</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar