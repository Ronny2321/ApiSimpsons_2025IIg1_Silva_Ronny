import React from "react";
import "./CardLocation.css";

const CardLocation = ({ location }) => {
  return (
    <div className="location-card">
      <img
        src={`https://cdn.thesimpsonsapi.com/500${location.image_path}`}
        alt={location.name}
        className="location-image"
        onError={(e) => {
          e.currentTarget.replaceWith(
            Object.assign(document.createElement("div"), {
              className: "image-fallback",
              innerText: "Sin imagen",
            })
          );
        }}
      />
      <div className="location-details">
        <h3>{location.name}</h3>
        <p><strong>Ciudad:</strong> {location.town}</p>
        <p><strong>Uso:</strong> {location.use}</p>
      </div>
    </div>
  );
};

export default CardLocation;