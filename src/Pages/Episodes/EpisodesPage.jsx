import React, { useEffect, useState } from "react";
import CardEpisodes from "../../Components/Episodes/CardEpisodes/CardEpisodes";
import Loader from "../../Components/Loader/Loader";
import "./EpisodesPage.css";

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchAllEpisodes = async () => {
      setLoading(true);
      try {
        let allEpisodes = [];
        let nextPage = "https://thesimpsonsapi.com/api/episodes";

        while (nextPage) {
          const response = await fetch(nextPage);
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
          const data = await response.json();
          allEpisodes = [...allEpisodes, ...data.results];
          nextPage = data.next;
        }

        setEpisodes(allEpisodes);
        setFilteredEpisodes(allEpisodes);

        const uniqueSeasons = [
          ...new Set(allEpisodes.map((ep) => ep.season)),
        ].sort((a, b) => a - b);
        setSeasons(uniqueSeasons);
        setTotalPages(Math.ceil(allEpisodes.length / itemsPerPage));
      } catch {
        setError("No se pudieron cargar los episodios. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllEpisodes();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSeasonChange = (event) => {
    const season = event.target.value;
    setSelectedSeason(season);
    if (season === "") {
      setFilteredEpisodes(episodes);
      setTotalPages(Math.ceil(episodes.length / itemsPerPage));
    } else {
      const filtered = episodes.filter((ep) => ep.season === parseInt(season));
      setFilteredEpisodes(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setCurrentPage(1);
    }
  };

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredEpisodes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <Loader message="Cargando episodios..." />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="episodes-container">
      <div className="filter-container">
        <label htmlFor="season-select">Filtrar por temporada:</label>
        <select
          id="season-select"
          value={selectedSeason}
          onChange={handleSeasonChange}
        >
          <option value="">Todas las temporadas</option>
          {seasons.map((season) => (
            <option key={season} value={season}>
              Temporada {season}
            </option>
          ))}
        </select>
      </div>
      <div className="episodes-grid">
        {currentItems.map((episode) => (
          <CardEpisodes key={episode.id} episode={episode} />
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

export default EpisodesPage;
