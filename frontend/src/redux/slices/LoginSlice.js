import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const refreshUser = createAsyncThunk(
    'LoginSlice/refresh',
    async () => {
        await axios.post('http://localhost:5000/auth/refresh', {}, {
            headers: {
                'Authorization': sessionStorage.getItem('refresh_token')
            }
        }).then(value => {
                sessionStorage.setItem('refresh_token', value.data.refresh_token)
                sessionStorage.setItem('access_token', value.data.access_token)
            }
        )
    }
)

export const registrationAuth = createAsyncThunk(
    'Login/Slice/registration',
    async (data) => {
        await axios.post('http://localhost:5000/auth/registration', data)
    }
)

export const loginAuth = createAsyncThunk(
    'LoginSlice/login',
    async (data) => {
        await axios.post('http://localhost:5000/auth/login', data).then(value => {
                sessionStorage.setItem('access_token', value.data.access_token)
                sessionStorage.setItem('refresh_token', value.data.refresh_token)
            }
        )
    }
)

export const checkIsAccessToken = createAsyncThunk(
    'LoginSlice/checkToken',
    async () => {
        await axios.post('http://localhost:5000/auth/checkToken', {}, {
            headers: {
                'Authorization': sessionStorage.getItem('refresh_token')
            }
        })

    }
)

export const setforgotPassword = createAsyncThunk(
    'LoginSlice/forgotPassword',
    async (data) => {
        await axios.post('http://localhost:5000/auth/forgot-pass', data)
    }
)

export const setNewPassword = createAsyncThunk(
    'LoginSlice/setNewPassword',
    async (data,) => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const token = params.get('token');
        await axios.post(`http://localhost:5000/auth/set_new_password?token=${token}`, data).catch(error => {
            console.log(error);
        })
    }
)

export const LoginSlice = createSlice({
    name: 'LoginSlice',
    initialState: {
        loginStatus: false,
        refreshStatus: false,
        accessTokenStatus: false,
        actionTokenStatus: null,
        setForgotPassStatus: false,
        registrationAuthStatus: null
    },
    reducers: {
        test: (state, action) => {
            state.test = action.payload
        }
    },
    extraReducers: {
        [loginAuth.fulfilled]: (state, action) => {
            state.loginStatus = true
        },
        [refreshUser.fulfilled]: (state, action) => {
            state.refreshStatus = true
        },
        [checkIsAccessToken.fulfilled]: (state, action) => {
            state.accessTokenStatus = true
        },
        [setforgotPassword.fulfilled]: (state, action) => {
            state.actionTokenStatus = 'positive'
        },
        [setforgotPassword.rejected]: (state, action) => {
            state.actionTokenStatus = 'negative'
        },
        [setNewPassword.fulfilled]: (state, action) => {
            state.setForgotPassStatus = true
        },
        [registrationAuth.fulfilled]: (state, action) => {
            state.registrationAuthStatus = true
        },
        [registrationAuth.rejected]: (state, action) => {
            state.registrationAuthStatus = false
        }
    }
})

export const LoginReducer = LoginSlice.reducer
export const Test = LoginSlice.actions.test
