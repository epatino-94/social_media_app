import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styled from 'styled-components'
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registered } from '../reducers/appState';
import MuiAlert from '@mui/material/Alert';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © InstaPix '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmpassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { username: username, firstName: firstName, lastName: lastName, password: password }
 
    if(confirmpassword !== password) return setError('Passwords do not match!');
    console.log(data);
    try {
      const res = await axios.post('/api/auth/register', (data));
      dispatch(registered());
      navigate('/');
    } catch (error) {
      setError(error.response.data)
    }


  };

  return (
    <RegisterContainer>
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
              InstaPix
            </StyledTypography>
            {error && <StyledMuiAlert severity="error">{error}</StyledMuiAlert>}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value) }}
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value) }}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                    id="confirmpassword"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <StyledRouterLink to='/login'>
                    {"Already have an account? Sign in"}
                  </StyledRouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </FormWrapper>
    </RegisterContainer>
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
  margin: 10px 0px;
`

const RegisterContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items:center;
  justify-content:center;
  background-color: rgba(var(--b3f,250,250,250),1);
`

const FormWrapper = styled.div`
  border: 1px solid white;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

export default Register;