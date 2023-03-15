import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const getter = createAsyncThunk(
    'getter',
    async () => {
        const result = await axios.get('https://jsonplaceholder.typicode.com/users').then(value => value.data)
        return result
    }
)


export const OneProductSlice = createSlice({
    name: "OneProduct",
    initialState: {
        oneProduct: [],
        users: {}
    },
    reducers: {
        getOneUser: (state, action) => {
            state.users = {...action.payload}
        }
    },
    extraReducers: {
        [getter.fulfilled]: (state, action) => {
            state.users = action.payload
        }
    }
})

export const getOneUser = OneProductSlice.actions.getOneUser

export const OneProductReducer = OneProductSlice.reducer
