import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CharacterModal from "../CharacterModal/CharacterModal";
import "./CardCharacter.css";

const CardCharacter = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!user) {
    return (
      <Card className="character-card">
        <CardContent className="character-content">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="character-name"
          >
            Información no disponible
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card
        className="character-card"
        onClick={toggleModal}
        role="button"
        tabIndex={0}
      >
        <div className="character-image">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,#f4d03f,#f39c12);color:#000;font-weight:bold;font-size:1.1rem;">Sin imagen</div>';
              }}
            />
          ) : (
            <div className="no-image">Sin imagen</div>
          )}
        </div>

        <CardContent className="character-content">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="character-name"
          >
            {user.name || "Nombre desconocido"}
          </Typography>
          <Typography variant="body2" className="character-info">
            <strong>Estado: </strong>
            {user.status || "Desconocido"}
          </Typography>
          <Typography variant="body2" className="character-info">
            <strong>Día de nacimiento: </strong>
            {user.birthdate || "Desconocida"}
          </Typography>
          <Typography variant="body2" className="character-info">
            <strong>Edad: </strong>
            {user.age && user.age > 0 ? user.age : "Desconocida"}
          </Typography>
          <Typography variant="body2" className="character-info">
            <strong>Género: </strong>
            {user.gender || "No especificado"}
          </Typography>
        </CardContent>
      </Card>

      <CharacterModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        character={user}
      />
    </>
  );
};

export default CardCharacter;
