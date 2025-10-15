import React from "react";
import "./Footer.css";

const Footer = () => {
  const authorImg = `${import.meta.env.BASE_URL}yo.png`;
  const rightImg = `${import.meta.env.BASE_URL}lyr.png`;

  return (
    <footer
      className="site-footer"
      role="contentinfo"
      aria-label="Créditos del autor"
    >
      <div className="footer-inner">
        <figure className="author-figure" aria-label="Imagen del autor">
          <img
            src={authorImg}
            alt="Autor - estilo Los Simpson"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.replaceWith(
                Object.assign(document.createElement("div"), {
                  className: "author-fallback",
                  innerText: "Tu foto aquí",
                  role: "img",
                  ariaLabel: "Foto del autor no disponible",
                })
              );
            }}
          />
        </figure>

        <div className="author-meta">
          <h3 className="author-title">Fuentes y autor</h3>
          <p className="author-note">
            Proyecto académico inspirado en el universo de Los Simpson y
            dedicado a mi novia linda que me ayudó en las ideas creativas del
            diseño y la motivación.
          </p>
          <ul className="author-links">
            <li>
              <a
                href="https://portafolio-five-eosin-43.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                title="Portafolio"
              >
                Portafolio
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Ronny2321"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ronny-silva-correa-307a29270/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <figure
          className="author-figure"
          aria-label="Imagen del autor (derecha)"
        >
          <img
            src={rightImg}
            alt="Autor (derecha) - estilo Los Simpson"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.replaceWith(
                Object.assign(document.createElement("div"), {
                  className: "author-fallback",
                  innerText: "Tu foto aquí",
                  role: "img",
                  ariaLabel: "Foto del autor no disponible",
                })
              );
            }}
          />
        </figure>
      </div>
    </footer>
  );
};

export default Footer;
