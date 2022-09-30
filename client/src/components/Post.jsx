import React, { useEffect } from 'react';
import styled  from 'styled-components';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';


const Post = (props) => {
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const { uid, imgurl, caption } = props

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/avatar/${uid}`);
        setAvatarUrl(res.data?.img)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [])


  return (
    <Card sx={{ minWidth: 345, minHeight: 400  }}>
      <StyledCardHeader
        avatar={
          <Avatar src={avatarUrl ? avatarUrl : "/broken-image.jpg"} />
        }
        title={uid}
      />
      <CardMedia
        component="img"
        height="194"
        image={`http://192.168.1.3:8080${imgurl}`}
        alt="Paella dish"
      />
      <StyledCardContent>
        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>
      </StyledCardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <DatePosted>Now</DatePosted>
      </CardActions>
    </Card>
  );
}

const DatePosted = styled.div`

`

const StyledCardHeader = styled(CardHeader)`
  .MuiCardHeader-title{
    font-weight: bold !important;
    text-align: left !important;
  }
`

const StyledCardContent = styled(CardContent)`
  text-align: left !important;
`

export default Post;