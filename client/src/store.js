import {configureStore} from '@reduxjs/toolkit';
import appReducer from './reducers/appState';


export const store = configureStore({
    reducer: {
        app: appReducer
    },
})

