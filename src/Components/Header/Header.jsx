import React from "react";
import { NavLink } from "react-router-dom";
import ImageTitleTheSimpsons from "../../assets/ImageTitleTheSimpsons.png";
import Simpfamily from "../../assets/familia.ico";
import "./Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <img
        src={ImageTitleTheSimpsons}
        alt="The Simpsons"
        className="brand-title"
      />

      <nav className="quick-tabs" aria-label="Secciones rápidas">
        <NavLink to="/characters" className="qt-link">
          Personajes
        </NavLink>
        <NavLink to="/locations" className="qt-link">
          Lugares
        </NavLink>
        <NavLink to="/episodes" className="qt-link">
          Episodios
        </NavLink>
      </nav>

      <img src={Simpfamily} alt="Familia Simpson" className="brand-family" />
    </header>
  );
};

export default Header;
