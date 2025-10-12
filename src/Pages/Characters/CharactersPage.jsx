import { useEffect, useState } from 'react'
import CardCharacter from '../../Components/CardCharacter/CardCharacter'
import CircularProgress from '@mui/material/CircularProgress';
import './CharactersPage.css'

const CharactersPage = () => {

  const [characterData, setCharacterData] = useState([]);

  useEffect(() => { 
    fetch('https://thesimpsonsapi.com/api/characters')
      .then(response => response.json())
      .then(data => setCharacterData(data.results))
      .catch(error => console.error('Error fetching data:', error));
  }, [])


return (
  <div id='charactersPage'>
    {
      characterData.length > 0 ? (
        characterData.map(character => (          
            <CardCharacter key={character.id} data={character} />          
        ))
      ) : (
        <CircularProgress />
      )
    }
  </div>
)
}

export default CharactersPage