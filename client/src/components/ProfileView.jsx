import React from 'react'
import styled from 'styled-components'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card'
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Post from './Post'
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {setMobileFullScreen as storeMobileFullScreen, setNavCallback} from '../reducers/appState';

const ProfileView = (props) => {
    const { user } = props;
    const [userData, setUserData] = React.useState(null);
    const [userPosts, setUserPosts] = React.useState([]);
    const [fullscreenPost, setFullScreenPost] = React.useState(null);
    const [mobileFullscreen, setMobileFullScreen] = React.useState(false);
    const [mobilePostRefId , setMobilePostRefId] = React.useState(null);
    const mobileScrollRef = useRef(null);
    const dispatch = useDispatch();
    const { username, viewport, mobileFullScreenEnabled } = useSelector((state) => state.app);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/users/profile/${user}`)
                setUserData(res.data[0][0])
                setUserPosts(res.data[1])
            } catch (err) {
            }
        };
        fetchData();
    }, [user])

    useEffect(()=>{
        setFullScreenPost(null);
        setMobileFullScreen(false);
    },[viewport])

    useEffect(()=>{
        if(!mobileFullScreenEnabled) handleFullScreenClose();
    },[mobileFullScreenEnabled])

    useEffect(()=>{
        if(mobilePostRefId !== null) scrollToMobilePost();
    },[mobilePostRefId])

    const scrollToMobilePost = () => mobileScrollRef.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

    const handleViewPost = (post) => {
        if (viewport !== 'Mobile') setFullScreenPost(post);
        if (viewport !== 'Mobile') document.body.style.overflow = 'hidden';
        if (viewport === 'Mobile'){
            setMobilePostRefId(post?.id);
            setMobileFullScreen(true)
            dispatch(storeMobileFullScreen(true));
        } 
    }

    const handleFullScreenClose = () => {
        if (viewport !== 'Mobile') document.body.style.overflow = 'unset';
        if (viewport !== 'Mobile') setFullScreenPost(null);
        if (viewport === 'Mobile') setMobileFullScreen(false);
        dispatch(storeMobileFullScreen(false))
    }




    return (
        <>
            <Card sx={{ margin: '10px 0px 0px 0px', position: 'relative', border: '1px solid lightgray', maxWidth: '800px', minHeight: mobileFullscreen ? '0px' : '80vh' }}>
                <Grid container spacing={0.2}>
                    {!mobileFullscreen && (
                        <>
                            <Grid item xs={12}>
                                <ProfileHeader>
                                    <InfoWrapper>
                                        <Avatar src={userData?.img ? userData?.img : ""} />
                                        <h1>@{userData?.username}</h1> {userData?.firstname} {userData?.lastname}
                                    </InfoWrapper>
                                    {username === user && (<Button variant="contained">EDIT PROFILE</Button>)}
                                </ProfileHeader>
                            </Grid>
                            <Grid item xs={12}>
                                <BioWrapper>
                                    <h4>Bio</h4>
                                    <p>{userData?.bio}</p>
                                </BioWrapper>
                            </Grid>
                            {userPosts.length > 0 &&
                                userPosts.map(post => (
                                    <StyledGrid key={post.id} item xs={4}>
                                        <StyledImage onClick={() => handleViewPost(post)} src={`http://192.168.1.3:8080${post?.imgurl}`} />
                                    </StyledGrid>
                                ))
                            }
                            {userPosts.length < 1 && (
                                <NoPostsContainer viewport={viewport}>
                                    <h1>😔</h1>
                                    <h2>{`${userData?.username} has no posts`}</h2>
                                </NoPostsContainer>
                            )
                            }
                        </>
                    )}
                    {viewport === 'Mobile' && mobileFullscreen && (
                        <MobileFullScreenContainer viewport={viewport}>
                            {userPosts.map(post => 
                            (
                                <Post scroll={post.id === mobilePostRefId ? mobileScrollRef : null} key={post.id} {...post} />
                            ))}
                        </MobileFullScreenContainer>
                    )}
                </Grid>

            </Card>
            {fullscreenPost && (
                <>
                    <CloseWrapper viewport={viewport} onClick={() => handleFullScreenClose()} />
                    <ProfilePostModal viewport={viewport}>
                        <GoBackWrapper onClick={() => handleFullScreenClose()} />
                        {viewport !== 'Mobile' && (
                            <Post {...fullscreenPost} />
                        )}
                    </ProfilePostModal>
                </>
            )}
        </>
    )
}



const MobileFullScreenContainer = styled.div`
    display: flex;
    justify-content:center;
    flex-direction: column;
    align-items: center;
`

const InfoWrapper = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    gap: 10px;
`

const NoPostsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction:column;
    width: 100%;
    padding: 0px 20px;

`


const GoBackWrapper = styled.div`
    padding: 10px 0px;
    display: flex;
    align-items:center;
    justify-content:center;
`

const CloseWrapper = styled.div`
    position: absolute;
    bottom: 0; 
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 0;
    background-color: ${props => props.viewport === 'Mobile' ? 'white' : 'rgba(0, 0, 0, .5);'};
`

const ProfilePostModal = styled.div`
    position: ${props => props.viewport === 'Mobile' ? 'absolute' : 'fixed'};
    display: flex;
    left: ${props => props.viewport === 'Mobile' ? '50%' : '50%'};
    top: ${props => props.viewport === 'Mobile' ? '80px' : '50%'};
    
    transform: translate(-50%, -50%);
    z-index: 5;
    background-color: transparent;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
`

const BioWrapper = styled.div`
    padding: 10px;
    border: 1px solid lightgray;
    h4{
        line-height: 0;
        font-size: 12px;
    }
    p{
        line-height: 1;
    }
`
const StyledGrid = styled(Grid)`
    margin: 1px 0px 0px 0px !important;
    border: 0.5px solid white !important;
`

const ProfileHeader = styled.div`
    display: flex;
    padding: 10px;
    align-items:center;
    justify-content: space-between;
    width: 100%;
    h1{
        font-size: 18px;
        padding: 0px 5px;
    }
`

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;

`


export default ProfileView