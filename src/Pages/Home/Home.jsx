import React from "react";
import { Link } from "react-router-dom";
import ImageTitleTheSimpsons from "../../assets/ImageTitleTheSimpsons.png";
import "./Home.css";

const Home = () => {
  return (
    <main className="home-container">
      <section className="home-hero">
        <h1 className="home-title">BIENVEN!DOH!</h1>

        <p className="home-subtitle">
          ¡Explora el universo de Springfield! Conoce a tus personajes
          favoritos, sus lugares y cada episodio de esta icónica serie.
        </p>
      </section>

      <section className="home-grid">
        <Link to="/characters" className="home-card">
          <h2>Personajes</h2>
          <p>
            Descubre información sobre los ciudadanos de Springfield, desde
            Homero hasta el Sr. Burns.
          </p>
        </Link>

        <Link to="/locations" className="home-card">
          <h2>Lugares</h2>
          <p>
            Visita la Taberna de Moe, la Planta Nuclear o la Escuela Primaria de
            Springfield.
          </p>
        </Link>

        <Link to="/episodes" className="home-card">
          <h2>Episodios</h2>
          <p>
            Revive los momentos más graciosos, icónicos y emotivos de la serie
            animada.
          </p>
        </Link>
      </section>

      <footer className="home-footer">
        <p>
          Hecho con amor por
          <br />
          <br />
          <strong>Ronny Silva Correa</strong>
          <br />
          <br />
          2025 ©
        </p>
      </footer>
    </main>
  );
};

export default Home;
