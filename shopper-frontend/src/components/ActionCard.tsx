import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
interface Shop {
    _id: string;
    name: string;
    bio: string;
    // Add more properties as needed
  }
  
  interface MultiActionAreaCardProps {
    shop?: Shop;
  }
  
const MultiActionAreaCard: React.FC<MultiActionAreaCardProps>=(props)=> {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={`/shop/${props?.shop?._id}`}>
        <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1506617420156-8e4536971650?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3JvY2VyeXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props?.shop?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {props?.shop?.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
export default MultiActionAreaCard;