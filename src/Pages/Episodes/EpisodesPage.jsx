import React, { useEffect, useState } from "react";
import CardEpisodes from "../../Components/CardEpisodes/CardEpisodes";
import "./EpisodesPage.css";

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8; 

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
        setTotalPages(Math.ceil(allEpisodes.length / itemsPerPage));
      } catch {
        setError("No se pudieron cargar los episodios. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllEpisodes();
  }, []);

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
  const currentItems = episodes.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <div>Cargando episodios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="episodes-container">
      <h1>Episodios de Los Simpsons</h1>
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
