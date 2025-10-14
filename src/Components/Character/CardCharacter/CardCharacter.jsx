import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CharacterModal from "../CharacterModal/CharacterModal";
import "./CardCharacter.css";

const CardCharacter = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((v) => !v);

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
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleModal()}
      >
        <div className="character-image">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.innerHTML =
                  '<div class="image-fallback">Sin imagen</div>';
              }}
            />
          ) : (
            <div className="no-image">Sin imagen</div>
          )}

          <div className="char-overlay-btn" aria-hidden="true">
            <button
              className="char-overlay-cta"
              onClick={(e) => {
                e.stopPropagation();
                toggleModal();
              }}
              aria-label={`Ver info de ${user.name || "personaje"}`}
            >
              Ver más...
            </button>
          </div>
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

          <div
            className={`character-status ${
              user.status?.toLowerCase() !== "alive" ? "red" : ""
            }`}
          >
            <span>{user.status || "Desconocido"}</span>
          </div>

          <div
            className="chip chip-birth"
            title={user.birthdate || "Desconocida"}
          >
            <span className="chip-label">Nacimiento:</span>
            <span className="chip-value">
              {user.birthdate || "Desconocida"}
            </span>
          </div>
        </CardContent>

        <div
          className={`character-gender ${
            user.gender?.toLowerCase() === "male"
              ? "male"
              : user.gender?.toLowerCase() === "female"
              ? "female"
              : ""
          }`}
        >
          <span>{user.gender || "No especificado"}</span>
        </div>

        <div
          className={`character-age ${
            user.age && user.age > 0 && user.age <= 10
              ? "red"
              : user.age > 10 && user.age <= 18
              ? "green"
              : user.age > 18 && user.age <= 28
              ? "orange"
              : user.age > 28 && user.age <= 50
              ? "blue"
              : user.age > 50
              ? "purple"
              : ""
          }`}
        >
          <span>{user.age && user.age > 0 ? user.age : "?"}</span>
        </div>
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
