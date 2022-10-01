import React, { useEffect } from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const Post = (props) => {
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const {username} = useSelector((state)=>state.app);
  const { uid, imgurl, caption, date, id } = props
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try{
      const res = await axios.post(`/api/posts/delete/${id}`);
      location.reload();
    }catch(err){
      console.log(err);
    }
  }


  return (
    <Card sx={{ border: '1px solid lightgray', backgroundColor: 'white', minWidth: 375, minHeight: 400, maxWidth: 375 }}>
      <StyledCardHeader
        avatar={
          <Avatar src={avatarUrl ? avatarUrl : ""} />
        }
        title={uid}
      action={(username === uid) ? <Button onClick={handleDelete} variant="outlined" color="error">DELETE</Button> : <></>
      }
      />
      <CardMedia
        component="img"
        height="350"
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
        <DatePosted>{moment(date).fromNow()}</DatePosted>
      </CardActions>
    </Card>
  );
}

const DatePosted = styled.div`

`

const StyledCardHeader = styled(CardHeader)`

  display: flex;
  align-items: center;

  .MuiCardHeader-title{
    font-weight: bold !important;
    text-align: left !important;
  }
`

const StyledCardContent = styled(CardContent)`
  text-align: left !important;
`

export default Post;