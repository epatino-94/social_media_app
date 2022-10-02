import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import ProfileView from '../components/ProfileView';
import { useLocation } from 'react-router-dom';

const Profile = () => {

    let location = useLocation();

    const [params,setParams] = React.useState(location.pathname.split('/')[2] || null)

    React.useEffect(()=>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        setParams(location.pathname.split('/')[2]);
    },[location])


    return (
        <ProfileContainer>
            <CssBaseline />
            <Container maxWidth={false}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <ProfileView user={params} />
                </Box>
            </Container>
        </ProfileContainer>
    )
}


const ProfileContainer = styled.div`
    background-color: #white;
    margin: 80px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    display: flex;
    align-items: start;
    justify-content: center;
`


export default Profile