import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Autocomplete from './Autocomplete';
import { useSelector } from 'react-redux';



const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const {username} = useSelector((state)=>state.app)

  const logout = async () => {
    try {
      localStorage.clear();
      const res = await axios.post('/api/auth/logout');
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <Box sx={{  flexGrow: 1 }}>
      <AppBar position="fixed" sx={{padding: '10px 0px', backgroundColor: '#23395d'}}>
        <Toolbar>
          <IconButton onClick={() => navigate('/create')} size="large" aria-label="Add a Post" color="inherit">
            <AddBoxIcon />
          </IconButton>
          <Typography onClick={() => navigate('/')}
            variant="h6"
            noWrap
            component="div"
            sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block' } }}
          >
            InstaPix
          </Typography>
          <Autocomplete />


        </Toolbar>
      </AppBar>

    </Box>
  );
}




export default Navbar;