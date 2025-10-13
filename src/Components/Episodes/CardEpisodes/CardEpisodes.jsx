import React, { useState, useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EpisodeModal from "../EpisodeModal/EpisodeModal";
import "./CardEpisodes.css";

const CardEpisodes = ({ episode }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const airdate = useMemo(() => {
    return episode?.airdate ? episode.airdate : "Fecha desconocida";
  }, [episode?.airdate]);

  const code = useMemo(() => {
    const s = String(episode?.season ?? "").padStart(2, "0");
    const e = String(episode?.episode_number ?? "").padStart(2, "0");
    return s && e ? `T${s}·E${e}` : "";
  }, [episode]);

  return (
    <>
      <Card
        className="episode-card"
        role="button"
        tabIndex={0}
        onClick={handleOpenModal}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && handleOpenModal()
        }
      >
        <div className="ep-top">
          {!!code && <span className="ep-code">{code}</span>}

          <div className="season-ribbon">
            <span>Temporada {episode?.season ?? "—"}</span>
          </div>

          <div className="episode-image" aria-hidden="true">
            {episode?.image_path ? (
              <img
                src={`https://cdn.thesimpsonsapi.com/500${episode.image_path}`}
                alt=""
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
          </div>
        </div>

        <CardContent className="ep-body">
          <Typography component="h3" className="episode-title">
            {episode?.name || "Episodio"}
          </Typography>

          <div className="date"><strong>Fecha emisión:</strong> {airdate} </div>

          <div className="ep-cta">
            <Button
              size="small"
              className="details-button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal();
              }}
            >
              Ver detalles
            </Button>
          </div>
        </CardContent>
      </Card>

      {isModalOpen && (
        <EpisodeModal
          episode={episode}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default CardEpisodes;
