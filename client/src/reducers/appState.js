import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    username: null,
    img: null,
    bio: null,
    registered: null,
    firstname: null,
    lastname: null
}

export const appState = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        login: (state,action) =>{
           state.username = action.payload?.username;
           state.img = action.payload?.img;
           state.bio = action.payload?.bio;
           state.firstname = action.payload?.firstname,
           state.lastname = action.payload?.lastname
        },
        registered:(state)=>{
            state.registered = true;
        }
    }
})


export const {login,registered} = appState.actions;

export default appState.reducer;