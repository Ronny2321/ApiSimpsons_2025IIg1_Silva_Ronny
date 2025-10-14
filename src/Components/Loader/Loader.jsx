import React from "react";
import "./Loader.css";

const Loader = ({ message = "Cargando..." }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-message">{message}</p>
    </div>
  );
};

export default Loader;