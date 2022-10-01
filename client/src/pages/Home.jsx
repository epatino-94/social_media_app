import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AddBox from '@mui/icons-material/AddBox';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import styledComponent from 'styled-components';
import Post from '../components/Post';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    margin: '0px 0px',
    textAlign: 'center',
    flex: 1,
    color: theme.palette.text.secondary,
}));





const Home = () => {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const [attemptload,setLoaded] = useState(false);
    const navigate = useNavigate();
    const { firstname } = useSelector((state) => state.app);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await axios.get(`/api/posts`);
                setPosts(res.data.reverse())
                setLoaded(true)
            } catch (err) {
                console.log(err)
                setError(true);
                setLoaded(true)
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
                    {posts.length < 1 && (
                        <NoPostContainer>
                            {attemptload &&( !error ? <InfoSpan>
                                <h1>{`Hi ${firstname}! 😎`}</h1>
                                <h3>There are no posts currently, be the first to contribute!</h3>
                                <IconButton onClick={()=>navigate('/create')} size="large" aria-label="add a post" color="inherit">
                                    <AddBox />
                                </IconButton>
                            </InfoSpan> : <ErrorSpan><h1>😔</h1><h3>Error Retrieving Posts! Try again later.</h3></ErrorSpan>)}
                        </NoPostContainer>
                    )}
                </Box>
            </Container>
        </HomeContainer>
    )
}


const InfoSpan = styledComponent.span`
    font-weight: bold;
`

const ErrorSpan = styledComponent.span`
    color: red;
    font-weight: bold;
`

const NoPostContainer = styledComponent.div`
    display: flex;
    height: 400px;
    align-items:center;
    text-align:center;
    h1{
        font-size: 48px;
    }

    button{
        background-color: #23395d;
        color: white;
        &:hover{
            background-color: #23395d;
            opacity: 0.8;
        }
    }
    

`

const HomeContainer = styledComponent.div`
    padding: 80px 0px;
    background-color: white;
`



export default Home