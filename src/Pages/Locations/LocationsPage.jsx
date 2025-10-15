import React, { useEffect, useState } from "react";
import CardLocation from "../../Components/Location/CardLocation/CardLocation";
import Loader from "../../Components/Loader/Loader";
import "./LocationsPage.css";

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
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
        setError("No se pudieron cargar las lugares. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const norm = (v) => (v || "").toString().toLowerCase();
  const term = norm(searchTerm).trim();
  const filtered = term
    ? locations.filter(
        (loc) => norm(loc.name).includes(term) || norm(loc.town).includes(term)
      )
    : locations;

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

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

  if (loading) return <Loader message="Cargando lugares..." />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="locations-page">
      <form
        className="location-search"
        role="search"
        aria-label="Buscar ubicaciones por nombre o ciudad"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="locationSearch">Buscar por nombre o ciudad</label>
        <input
          id="locationSearch"
          type="search"
          placeholder="Springfield, Shelbyville, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-controls="locationsGrid"
        />
      </form>
      <div className="locations-container" id="locationsGrid">
        {currentItems.length > 0 ? (
          currentItems.map((location) => (
            <CardLocation key={location.id} location={location} />
          ))
        ) : (
          <p className="no-results">No se encontraron resultados</p>
        )}
      </div>
      {term.length === 0 && filtered.length > 0 && totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationsPage;
