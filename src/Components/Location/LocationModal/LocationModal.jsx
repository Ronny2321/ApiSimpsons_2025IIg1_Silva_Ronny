import React, { useEffect, useState } from "react";
import "./LocationModal.css";

const LocationModal = ({ isOpen, onClose, locationId }) => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && locationId) {
      console.log("ID recibido en LocationModal:", locationId);
      const fetchLocationData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `https://thesimpsonsapi.com/api/locations/${locationId}`
          );
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
          const data = await response.json();
          setLocationData(data);
        } catch (err) {
          console.error("Error al obtener los datos del lugar:", err);
          setError("No se pudo cargar la información del lugar.");
        } finally {
          setLoading(false);
        }
      };

      fetchLocationData();
    }
  }, [isOpen, locationId]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {loading ? (
          <p>Cargando información...</p>
        ) : error ? (
          <p className="modal-error">{error}</p>
        ) : locationData ? (
          <>
            <img
              className="modal-image"
              src={`https://cdn.thesimpsonsapi.com/500${locationData.image_path}`}
              alt={locationData.name || "Imagen del lugar"}
            />
            <h2>{locationData.name}</h2>
            <p className="modal-description">
              {locationData.description || "Sin descripción disponible."}
            </p>
          </>
        ) : (
          <p>No hay información disponible.</p>
        )}
      </div>
    </div>
  );
};

export default LocationModal;
