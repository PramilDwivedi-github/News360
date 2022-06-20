import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import './card.css'
import { useNavigate } from 'react-router';



export default function ActionAreaCard({article}) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 1000 }} onClick={()=>navigate("/newspage",{state:article})}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          src={article.urlToImage}
          alt="Image Goes Here"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {
                article.title
            }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {
                article.description
            }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
