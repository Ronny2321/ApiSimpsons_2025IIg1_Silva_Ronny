import React, { useEffect } from "react";
import "./EpisodeModal.css";

const EpisodeModal = ({ episode, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <div className="modal-header">
          <h2>{episode.name}</h2>
        </div>
        <div className="modal-body">
          <img
            src={`https://cdn.thesimpsonsapi.com/500${episode.image_path}`}
            alt={episode.name}
            className="modal-image"
          />
          <p className="modal-synopsis">{episode.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default EpisodeModal;