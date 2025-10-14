import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <nav
      className={`top-nav ${open ? "is-open" : ""}`}
      aria-label="Navegación principal"
    >
      <button
        className="nav-toggle"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="primary-nav-list"
        onClick={toggle}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <ul id="primary-nav-list" className="top-nav-list" onClick={close}>
        <li>
          <NavLink to="/" className="top-link">
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/characters" className="top-link">
            Personajes
          </NavLink>
        </li>
        <li>
          <NavLink to="/locations" className="top-link">
            Lugares
          </NavLink>
        </li>
        <li>
          <NavLink to="/episodes" className="top-link">
            Episodios
          </NavLink>
        </li>
      </ul>

      <div className="nav-overlay" onClick={close} aria-hidden />
    </nav>
  );
};
export default NavBar;
