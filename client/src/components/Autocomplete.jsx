import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styled from 'styled-components';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const AutocompleteBox = () => {

    const [options,setOptions] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    const [query,setQuery] = React.useState(null);
    const [profile,setProfile] = React.useState(null);
    const navigate = useNavigate();


    const handleOnChange = async () =>{
        if(query === '') return setOptions([]);
        try{
            setLoading(true)
            const res = await axios.get(`/api/users/${query}`);
            setLoading(false)
            const usernames = [];
            res.data.map(user=> usernames.push({label: `@${user.username} - ${user.firstname} ${user.lastname}`, username:user.username}));
            if(usernames.length > 0) setOptions(usernames);

        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        if(query) handleOnChange();
    },[query])

    useEffect(()=>{
        const redirect = profile;
        setProfile(null);
        setOptions([])
        setQuery(null)
        if(profile) navigate(`/profile/${redirect}`)
    },[profile])

    const handleOptionChange = (value) =>{
        setProfile(value.username)
        setQuery('');
        setOptions([]);
    }

    return (
        <StyledAutoComplete
            disablePortal
            id="combo-box-demo"
            options={options}
            loading={loading}
            value={profile}
            clearOnBlur={true}
            blurOnSelect={true}
            noOptionsText='No users found.'
            onChange={(e, value) => handleOptionChange(value)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField value={query} onChange={(e) => setQuery(e.target.value)} {...params} label='Search Users' />}
        />
    )
}




const StyledAutoComplete = styled(Autocomplete)`
    padding-left: 10px !important;
    border: none !important;
    background-color: transparent !important;
    height: 100% !important;

    .MuiFormControl-root{
        border-radius: 4px !important;

    }
    .MuiFormLabel-root{
        color: white !important;
    }

    .MuiOutlinedInput-input{
        color: white !important;
    }
`

export default AutocompleteBox