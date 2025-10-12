import React, { useEffect, useState } from 'react';
import './PowerModal2.css';

const AdditionalInfoModal = ({ characterId, isOpen, onClose }) => {
  const [characterDetails, setCharacterDetails] = useState(null);

  useEffect(() => {
    console.log('Estado del modal:', isOpen);
    console.log('ID del personaje:', characterId);

    if (isOpen && characterId) {
      const fetchCharacterDetails = async () => {
        try {
          console.log('Fetching details for character ID:', characterId);
          const response = await fetch(`https://thesimpsonsapi.com/api/characters/${characterId}`);
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
          const data = await response.json();
          console.log('Datos obtenidos de la API:', data);
          setCharacterDetails(data);
        } catch (error) {
          console.error('Error fetching character details:', error);
        }
      };

      fetchCharacterDetails();
    } else {
      setCharacterDetails(null); 
    }
  }, [isOpen, characterId]);

  if (!isOpen || !characterDetails) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="power-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✖</button>

        <div className="modal-header">
          <div className="character-avatar">
            <img
              src={characterDetails.image || `https://cdn.thesimpsonsapi.com/500${characterDetails.portrait_path}`}
              alt={characterDetails.name}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,#f4d03f,#f39c12);color:#000;font-weight:bold;font-size:1.1rem;">Sin imagen</div>';
              }}
            />
          </div>
          <div className="character-title">
            <h2>{characterDetails.name}</h2>
          </div>
        </div>

        <div className="modal-content">
          {characterDetails.phrases && characterDetails.phrases.length > 0 && (
            <div className="power-phrases">
              <h3>Frases</h3>
              <ul>
                {characterDetails.phrases.map((phrase, index) => (
                  <li key={index}>{phrase}</li>
                ))}
              </ul>
            </div>
          )}

          {characterDetails.first_appearance_ep && (
            <div className="first-appearance">
              <h3>Primera Aparición (Episodio)</h3>
              <img
                src={`https://cdn.thesimpsonsapi.com/500${characterDetails.first_appearance_ep.image_path}`}
                alt={characterDetails.first_appearance_ep.name}
              />
              <p><strong>{characterDetails.first_appearance_ep.name}</strong></p>
              <p>{characterDetails.first_appearance_ep.description}</p>
            </div>
          )}

          {characterDetails.first_appearance_sh && (
            <div className="first-appearance">
              <h3>Primera Aparición (Corto)</h3>
              <img
                src={`https://cdn.thesimpsonsapi.com/500${characterDetails.first_appearance_sh.image_path}`}
                alt={characterDetails.first_appearance_sh.name}
              />
              <p><strong>{characterDetails.first_appearance_sh.name}</strong></p>
              <p>{characterDetails.first_appearance_sh.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoModal;