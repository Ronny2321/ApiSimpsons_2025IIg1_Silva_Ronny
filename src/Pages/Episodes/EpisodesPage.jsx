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
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    const norm = (v) => (v || "").toString().toLowerCase();
    const term = norm(searchTerm).trim();

    let filtered = episodes;
    if (selectedSeason) {
      filtered = filtered.filter(
        (ep) => ep.season === parseInt(selectedSeason)
      );
    }
    if (term) {
      filtered = filtered.filter((ep) => norm(ep.name).includes(term));
    }

    setFilteredEpisodes(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  }, [episodes, selectedSeason, searchTerm]);

  const handleSeasonChange = (event) => {
    const season = event.target.value;
    setSelectedSeason(season);
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
    <div className="episodes-page">
      <div
        className="filter-container"
        role="search"
        aria-label="Filtrar episodios por nombre y temporada"
      >
        <label htmlFor="episode-search">Buscar episodio</label>
        <input
          id="episode-search"
          type="search"
          placeholder="Bart the Genius, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label htmlFor="season-select">Temporada</label>
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
      {searchTerm.trim().length === 0 &&
        filteredEpisodes.length > 0 &&
        totalPages > 1 && (
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

export default EpisodesPage;
