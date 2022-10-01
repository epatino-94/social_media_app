import React, { useEffect } from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

    const [selectedFile, setSelectedFile] = useState()
    const [caption, setCaption] = useState()
    const [preview, setPreview] = useState()
    const navigate = useNavigate();
    const { username } = useSelector((state) => state.app);


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', selectedFile)
            const uploadRes = await axios.post('/api/upload', formData);
            const date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            const res = await axios.post('/api/posts/add', { caption: caption, imgurl: uploadRes.data, date: date, username: username })
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Card sx={{ border: '1px solid lightgray', minWidth: 375, minHeight: 400, maxWidth: 375 }}>
            <CardContainer>
                <StyledForm onSubmit={(e) => (handleSubmit(e))}>
                    <IconWrapper>{preview && (<StyledDiscardButton variant="outlined" color="error" onClick={() => setSelectedFile(null)}>DISCARD</StyledDiscardButton>)}</IconWrapper>
                    <ImageContainer>
                        {preview && (<img src={preview} />)}
                        {!preview && (
                            <StyledButton preview={preview ? 'true' : 'false'} variant="contained" component='label'>
                                <input value={preview} onChange={onSelectFile} type="file" hidden />
                                Upload a Image
                            </StyledButton>
                        )}
                    </ImageContainer>
                    <StyledTextField value={caption} onChange={(e) => setCaption(e.target.value)} label='Caption' multiline id="caption" type="text" />
                    <Button disabled={selectedFile && caption ? false: true} preview={preview ? 'true' : 'false'} variant="contained" component='label'>
                        <input type='submit' hidden></input>
                        POST
                    </Button>
                </StyledForm>
            </CardContainer>
        </Card>
    );
}

const StyledForm = styled.form`
    height:100%; 
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    padding-bottom: 20px;
  

`

const StyledTextField = styled(TextField)`
    width: 90%;
    margin: 10px 0px 20px 0px !important;
`

const IconWrapper = styled.div`
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
`

const StyledDiscardButton = styled(Button)`
    margin-left: 15px !important;
`

const StyledButton = styled(Button)`
    position: absolute !important;
`


const ImageContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    width: 100%;
    height: 350px;
    position: relative;

    img{
        height: 350px;
        width: 100%;
        object-fit: cover;
    }
`

const CardContainer = styled.div`
    padding: 10px 0px;
    width: 100%;
    height: 100%;
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content:center;
`


export default CreatePost;