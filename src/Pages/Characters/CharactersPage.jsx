import { useEffect, useState, useCallback, useRef } from "react";
import CardCharacter from "../../Components/Character/CardCharacter/CardCharacter";
import Loader from "../../Components/Loader/Loader";
import PowerModal from "../../Components/Character/CharacterModal/CharacterModal";
import "./CharactersPage.css";

const BASE_URL = "https://thesimpsonsapi.com/api";
const PAGE_SIZE = 8;

const normalizeCharacter = (c, idx = 0) => {
  return {
    id: c.id ?? c._id ?? idx,
    name:
      (c.name ?? [c.firstName, c.lastName].filter(Boolean).join(" ")) ||
      "Sin nombre",
    image:
      c.image ??
      c.imageUrl ??
      (c.portrait_path
        ? `https://cdn.thesimpsonsapi.com/500${c.portrait_path}`
        : ""),
    occupation: c.occupation ?? c.job ?? "No especificada",
    gender: c.gender ?? c.sex ?? "No especificado",
    age: c.age ?? null,
    birthdate: c.birthdate ?? null,
    status: c.status ?? "Desconocido",
    first_appearance_ep_id: c.first_appearance_ep_id ?? null,
    first_appearance_sh_id: c.first_appearance_sh_id ?? null,
  };
};

const CharactersPage = () => {
  const [characterData, setCharacterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const pageCacheRef = useRef(new Map());
  const [searchTerm, setSearchTerm] = useState("");
  const [allCharacters, setAllCharacters] = useState([]);
  const [isFetchingAll, setIsFetchingAll] = useState(false);
  const [filteredResults, setFilteredResults] = useState(null);

  const fetchJSON = async (url, { signal } = {}) => {
    const res = await fetch(url, {
      signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} - ${text || "Error de red"}`);
    }
    try {
      return await res.clone().json();
    } catch (parseErr) {
      const text = await res.text().catch(() => "");
      throw new Error(`Respuesta no JSON: ${parseErr.message} ${text}`);
    }
  };

  const fetchCharacters = useCallback(async (page = 1) => {
    setLoading(true);
    setErrorMsg("");

    if (pageCacheRef.current.has(page)) {
      const cached = pageCacheRef.current.get(page);
      setCharacterData(cached.results);
      setTotalPages(cached.totalPages);
      setLoading(false);
      return;
    }

    try {
      const url = `${BASE_URL}/characters?limit=${PAGE_SIZE}&page=${page}`;
      const data = await fetchJSON(url);

      let pageResults = [];
      let pages = 1;

      if (Array.isArray(data)) {
        const all = data;
        pages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
        const start = (page - 1) * PAGE_SIZE;
        const paged = all.slice(start, start + PAGE_SIZE);
        pageResults = paged.map((c, idx) => normalizeCharacter(c, start + idx));
      } else {
        const results = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : [];
        const pageSlice = results.slice(0, PAGE_SIZE);
        const pagesFromInfo = Number(data?.info?.pages);
        const totalCount =
          Number(
            data?.info?.count ?? data?.totalCount ?? data?.total ?? data?.count
          ) || NaN;
        pages =
          !Number.isNaN(pagesFromInfo) && pagesFromInfo > 0
            ? pagesFromInfo
            : Number(data?.totalPages) ||
              (!Number.isNaN(totalCount) && totalCount > 0
                ? Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
                : Number.isFinite(Number(data?.pages))
                ? Number(data.pages)
                : 1);
        const startIndex = (page - 1) * PAGE_SIZE;
        pageResults = pageSlice.map((c, idx) =>
          normalizeCharacter(c, startIndex + idx)
        );
      }

      setTotalPages(Math.max(1, pages || 1));
      setCharacterData(pageResults);

      pageCacheRef.current.set(page, {
        results: pageResults,
        totalPages: Math.max(1, pages || 1),
      });
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudieron cargar los personajes. Intenta de nuevo.");
      setCharacterData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllCharacters = useCallback(async () => {
    if (isFetchingAll || allCharacters.length > 0) return;
    setIsFetchingAll(true);
    try {
      let all = [];
      let nextPage = `${BASE_URL}/characters`;
      while (nextPage) {
        const data = await fetchJSON(nextPage);
        const results = Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : [];
        const normalized = results.map((c, idx) => normalizeCharacter(c, idx));
        all = all.concat(normalized);
        nextPage = data?.next || null;
      }
      setAllCharacters(all);
    } catch (err) {
      console.error("Error al cargar todos los personajes para búsqueda", err);
    } finally {
      setIsFetchingAll(false);
    }
  }, [allCharacters.length, isFetchingAll]);

  useEffect(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) {
      setFilteredResults(null);
      return;
    }
    if (allCharacters.length === 0 && !isFetchingAll) {
      fetchAllCharacters();
    }
    const source = allCharacters.length > 0 ? allCharacters : characterData;
    const filtered = source.filter((c) =>
      (c.name || "").toLowerCase().includes(q)
    );
    setFilteredResults(filtered);
  }, [
    searchTerm,
    allCharacters,
    characterData,
    fetchAllCharacters,
    isFetchingAll,
  ]);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage, fetchCharacters]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleShowPower = (character) => {
    setSelectedCharacter(character);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCharacter(null);
  };

  if (loading) return <Loader message="Cargando personajes..." />;
  if (errorMsg) return <div className="error-message">{errorMsg}</div>;

  return (
    <div className="characters-page">
      <div className="character-search" role="search">
        <label htmlFor="character-search-input">Buscar personaje:</label>
        <input
          id="character-search-input"
          type="text"
          inputMode="search"
          placeholder="Homero, Bart, Lisa, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar personaje por nombre"
        />
      </div>

      <div className="character-grid">
        {(filteredResults ?? characterData).map((character) => (
          <CardCharacter
            key={character.id}
            user={character}
            onShowPower={handleShowPower}
          />
        ))}
      </div>
      {/* Ocultar paginación cuando hay búsqueda activa */}
      {!searchTerm && (
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

      <PowerModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CharactersPage;
