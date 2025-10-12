import React from 'react';
import AdditionalInfoModal from './AdditionalInfoModal';
import './CharacterModal.css';

const PowerModal = ({ character, isOpen, onClose }) => {
  if (!isOpen || !character) return null;
    
  return (
    <AdditionalInfoModal
      characterId={character.id}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default PowerModal;