import React from "react";
import { NavLink } from "react-router-dom";
import ImageTitleTheSimpsons from "../../assets/ImageTitleTheSimpsons.png";
import Simpfamily from "../../assets/familia.ico";
import "./Header.css";
import CloudLeft from "../../assets/cloud-left.png";
import CloudRight from "../../assets/cloud-right.png";

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-sky" aria-hidden>
        <img src={CloudLeft} alt="" className="cloud-header cloud1" />
        <img src={CloudRight} alt="" className="cloud-header cloud2" />
        <img src={CloudLeft} alt="" className="cloud-header cloud3" />
        <img src={CloudRight} alt="" className="cloud-header cloud4" />
      </div>
      <div className="header-inner">
        <img
          src={ImageTitleTheSimpsons}
          alt="The Simpsons"
          className="brand-title"
        />
        { <nav className="quick-tabs" aria-label="Secciones rápidas">
        <NavLink to="/" className="qt-link">
          Inicio
        </NavLink>
        <NavLink to="/characters" className="qt-link">
          Personajes
        </NavLink>
        <NavLink to="/locations" className="qt-link">
          Lugares
        </NavLink>
        <NavLink to="/episodes" className="qt-link">
          Episodios
        </NavLink>
      </nav> }

        <img src={Simpfamily} alt="Familia Simpson" className="brand-family" />
      </div>
    </header>
  );
};

export default Header;
