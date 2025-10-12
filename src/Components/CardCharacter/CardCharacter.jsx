import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const CardCharacter = ({data}) => {
  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={`https://cdn.thesimpsonsapi.com/500${data.portrait_path}`}
          alt="green iguana"
          style={{objectFit: 'contain'}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}<br />
            <p style={{height: '4rem', objectFit: 'cover' ,overflow: 'scroll', backgroundColor: '#dadadaff'}}>{data.occupation}</p>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardCharacter;
