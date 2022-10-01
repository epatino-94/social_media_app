import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import Home from '@mui/icons-material/Home'
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Footer = () => {
  const [value, setValue] = React.useState();
  const ref = React.useRef(null);

  const {username} = useSelector((state)=>state.app);

  const navigate = useNavigate();

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
    <Box sx={{ pb: 7 }} ref={ref}>
      <StyledPaper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction onClick={()=>navigate('/')} label="Home" icon={<Home />} />
          <BottomNavigationAction onClick={(()=>navigate(`/profile/${username}`))} label="Account" icon={<AccountBoxIcon />} />
          <BottomNavigationAction onClick={()=>logout()} label="Logout" icon={<Logout />} />
        </BottomNavigation>
      </StyledPaper>
    </Box>
  );
}

const StyledPaper = styled(Paper)`

`

export default Footer;

