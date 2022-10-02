import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Autocomplete from './Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {setMobileFullScreen} from '../reducers/appState';



const Navbar = () => {
  const navigate = useNavigate();
  const {mobileFullScreenEnabled} = useSelector((state) => state.app)
  const [profileView,setProfileView] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(setMobileFullScreen(false)); 
      const pathName = window.location.pathname.split('/');
      pathName[1] === 'profile' ? setProfileView(true) : setProfileView(false);
  }, [window.location.pathname]);




  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ padding: '10px 0px', backgroundColor: '#23395d' }}>
        <Toolbar>
          {mobileFullScreenEnabled && profileView && (
            <IconButton onClick={()=>dispatch(setMobileFullScreen(false))} size="large" aria-label="Add a Post" color="inherit">
              <KeyboardBackspaceIcon />
            </IconButton>
          )}
          <IconButton onClick={() => navigate('/create')} size="large" aria-label="Add a Post" color="inherit">
            <AddBoxIcon />
          </IconButton>

          <Typography onClick={() => navigate('/')}
            variant="h6"
            noWrap
            component="div"
            sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block' } }}
          >
            Pix
          </Typography>
          <Autocomplete />
        </Toolbar>
      </AppBar>

    </Box>
  );
}




export default Navbar;