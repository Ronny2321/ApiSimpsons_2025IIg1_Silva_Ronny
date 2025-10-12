import React, { useState } from "react";
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

  return (
    <>
      <Card className="episode-card">
        <div className="episode-image">
          <img
            src={`https://cdn.thesimpsonsapi.com/500${episode.image_path}`}
            alt={episode.name}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML =
                '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,#f4d03f,#f39c12);color:#000;font-weight:bold;font-size:1.1rem;">Sin imagen</div>';
            }}
          />
        </div>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="episode-title"
          >
            {episode.name}
          </Typography>
          <Typography variant="body2" className="episode-info">
            <strong>Fecha de emisión:</strong> {episode.airdate}
          </Typography>
          <Typography variant="body2" className="episode-info">
            <strong>Número de episodio:</strong> {episode.episode_number}
          </Typography>
          <Typography variant="body2" className="episode-info">
            <strong>Temporada:</strong> {episode.season}
          </Typography>
          <Button
            size="small"
            className="details-button"
            onClick={handleOpenModal}
          >
            Ver detalles
          </Button>
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