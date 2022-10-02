import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styled from 'styled-components'
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../reducers/appState';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Pix '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const LogIn = (props) => {

  const dispatch = useDispatch();
  const [username,setUsername] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [error,setError] = React.useState(null);
  const navigate = useNavigate();

  const {registered} = useSelector((state)=>state.app);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {username: username,password:password};

    try {
      const res = await axios.post('/api/auth/login',(data),{withCredentials: true});
      dispatch(login(res.data));
      localStorage.setItem('userdata',JSON.stringify(res.data));
      navigate('/');
    } catch (error) {
      setError(error.response.data)
    }
  };



  return (
    <LoginContainer>
      <FormWrapper>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <StyledTypography component="h1" variant="h5">
              Pix
            </StyledTypography>
            {registered && !error && <StyledMuiAlert severity="success">Successfully created account!</StyledMuiAlert>}
            {error && <StyledMuiAlert severity="error">{error}</StyledMuiAlert>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <StyledRouterLink to='/register'>
                    {"Don't have an account? Sign Up"}
                  </StyledRouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </FormWrapper>
    </LoginContainer>
  );
}

const StyledMuiAlert = styled(MuiAlert)`
  width: 100% !important;
`

const StyledRouterLink = styled(RouterLink)`
  color: blue;
`

const StyledTypography = styled(Typography)`
  font-style: italic;
  font-size: 40px;
  margin: 10px 0px !important;
`

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items:center;
  justify-content:center;
  background-color: white;
`

const FormWrapper = styled.div`
  border: 1px solid white;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`


export default LogIn;