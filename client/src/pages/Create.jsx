import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import styledComponent from 'styled-components';
import CreatePost from '../components/CreatePost';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    margin: '10px 0px',
    textAlign: 'center',
    flex: 1,
    color: theme.palette.text.secondary,
}));



const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    return (
        <div>
            <input type='file' onChange={onSelectFile} />
            {selectedFile && <img src={preview} />}
        </div>
    )
}

const Create = () => {



    return (
        <CreateContainer>
            <CssBaseline />
            <Container maxWidth={false}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CreatePost />
                </Box>
            </Container>
        </CreateContainer>
    )
}


const CreateContainer = styledComponent.div`
    background-color: #white;
    height: 100vh;
    display: flex;
    align-items: center;
`



export default Create