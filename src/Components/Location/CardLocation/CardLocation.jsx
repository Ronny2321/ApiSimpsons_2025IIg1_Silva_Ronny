import React, { useState } from "react";
import LocationModal from "../LocationModal/LocationModal";
import "./CardLocation.css";

const CardLocation = ({ location }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const town = location?.town || "—";
  const useLabel = location?.use || "—";
  const imgSrc = location?.image_path
    ? `https://cdn.thesimpsonsapi.com/500${location.image_path}`
    : null;

  const toggleModal = () => {
    console.log("ID del lugar:", location.id); // Log para verificar el ID del lugar
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <article
        className="location-card"
        role="button"
        tabIndex={0}
        onClick={toggleModal}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleModal();
          }
        }}
        aria-label={`Lugar: ${location?.name || "Desconocido"}`}
      >
        {/* Cinta y badge */}
        <div className="loc-ribbon" aria-hidden>
          <span>Ciudad</span>
        </div>
        <div
          className="loc-badge"
          title={`Ciudad: ${town}`}
          aria-label={`Ciudad: ${town}`}
        >
          <span className="pin" aria-hidden></span> {town}
        </div>

        {/* Imagen */}
        <figure className="location-figure">
          {imgSrc ? (
            <img
              className="location-image"
              src={imgSrc}
              alt={location?.name || "Lugar"}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.replaceWith(
                  Object.assign(document.createElement("div"), {
                    className: "image-fallback",
                    innerText: "Sin imagen",
                  })
                );
              }}
            />
          ) : (
            <div className="image-fallback">Sin imagen</div>
          )}
          <figcaption className="visually-hidden">{location?.name}</figcaption>
        </figure>

        {/* Contenido */}
        <div className="location-body">
          <h3 className="location-title">{location?.name || "Lugar"}</h3>
          <div className="location-meta">
            <div className="chip">
              <strong>Uso:</strong> {useLabel}
            </div>
          </div>
        </div>
      </article>

      <LocationModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        locationId={location.id} // Pasar el ID del lugar al modal
        image={imgSrc}
        description={location?.description}
      />
    </>
  );
};

export default CardLocation;
