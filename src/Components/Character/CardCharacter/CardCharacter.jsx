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
          <div
            className={`character-status ${
              user.status?.toLowerCase() !== "alive" ? "red" : ""
            }`}
          >
            <span>{user.status || "Desconocido"}</span>
          </div>
          <div
            className="chip chip-birth"
            title={user.birthdate || "0000-00-00"}
          >
            <span className="chip-label">Nacimiento:</span>
            <span className="chip-value">
              {user.birthdate || "0000-00-00"}
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
