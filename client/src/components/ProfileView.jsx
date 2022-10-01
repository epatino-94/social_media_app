import React from 'react'
import styled from 'styled-components'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card'
import { Avatar } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';

const ProfileView = (props) => {
    const {user} = props;
    const [userData,setUserData] = React.useState(null);
    const [userPosts,setUserPosts] = React.useState([]);

    console.log(user)

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

    

    return (
        <Card sx={{ border: '1px solid lightgray', minWidth: 375, minHeight: 400, maxWidth: 375 }}>
            <Grid container >
                <Grid item xs={12}>
                    <ProfileHeader>
                        <Avatar src={userData?.img ? userData?.img : ""} />
                        <h1>@{userData?.username}</h1> {userData?.firstname} {userData?.lastname}
                    </ProfileHeader>
                </Grid>
                <Grid item xs={12}>
                    <BioWrapper>
                        <h4>Bio</h4>
                        <p>{userData?.bio}</p>
                    </BioWrapper>
                </Grid>
                {userPosts.length > 0 && 
                    userPosts.map(user=>(
                        <Grid key={user.id} item xs={4}>
                            <StyledImage src={`http://192.168.1.3:8080${user?.imgurl}`} />
                        </Grid>
                    ))
                }
            </Grid>
        </Card>
    )
}

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


const ProfileHeader = styled.div`
    display: flex;
    padding: 10px;
    align-items:center;
    h1{
        font-size: 18px;
        padding: 0px 5px;
    }
`

const StyledImage = styled.img`
    width: 120px;
    height: 150px;
    object-fit: cover;
    border: 1px solid black;

`


export default ProfileView