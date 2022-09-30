import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import styledComponent from 'styled-components';
import Post from '../components/Post';
import axios from 'axios'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    margin: '10px 0px',
    textAlign: 'center',
    flex: 1,
    color: theme.palette.text.secondary,
}));





const Home = () => {

    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/posts`);
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [])



    return (
        <HomeContainer>
            <CssBaseline />
            <Container maxWidth={false}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {posts.map((post, index) => (
                        <Item key={index}><Post {...post} /></Item>
                    ))}
                </Box>
            </Container>
        </HomeContainer>
    )
}


const HomeContainer = styledComponent.div`
    padding: 80px 0px;
    background-color: #DEE4E7;
`



export default Home