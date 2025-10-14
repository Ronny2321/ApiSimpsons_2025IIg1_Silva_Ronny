import React, { useEffect, useState } from "react";
import CardLocation from "../../Components/Location/CardLocation/CardLocation";
import "./LocationsPage.css";

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        let allLocations = [];
        let nextPage = "https://thesimpsonsapi.com/api/locations";

        while (nextPage) {
          const response = await fetch(nextPage);
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
          const data = await response.json();
          allLocations = [...allLocations, ...data.results];
          nextPage = data.next;
        }

        setLocations(allLocations);
      } catch {
        setError("No se pudieron cargar las locaciones. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const totalPages = Math.ceil(locations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = locations.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading)
    return <div className="loading-container">Cargando locaciones...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div>
      <div className="locations-container">
        {currentItems.map((location) => (
          <CardLocation key={location.id} location={location} />
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default LocationsPage;
