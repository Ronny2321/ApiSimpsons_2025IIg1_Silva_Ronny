import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="top-nav" aria-label="Navegación principal">
      <ul className="top-nav-list">
        <li><NavLink to="/"           className="top-link">Inicio</NavLink></li>
        <li><NavLink to="/characters" className="top-link">Personajes</NavLink></li>
        <li><NavLink to="/locations"  className="top-link">Lugares</NavLink></li>
        <li><NavLink to="/episodes"   className="top-link">Episodios</NavLink></li>
      </ul>
    </nav>
  );
};
export default NavBar;
