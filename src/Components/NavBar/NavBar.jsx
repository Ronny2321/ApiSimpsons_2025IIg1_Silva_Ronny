import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ isOpen, onClose }) => {
  return (
    <nav
      className={`app-nav ${isOpen ? "open" : ""}`}
      aria-label="Navegación principal"
    >
      <button className="nav-close" aria-label="Cerrar menú" onClick={onClose}>
        ✖
      </button>

      <ul className="nav-list">
        <li>
          <NavLink to="/characters" className="nav-link" onClick={onClose}>
            Personajes
          </NavLink>
        </li>
        <li>
          <NavLink to="/locations" className="nav-link" onClick={onClose}>
            Lugares
          </NavLink>
        </li>
        <li>
          <NavLink to="/episodes" className="nav-link" onClick={onClose}>
            Episodios
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
