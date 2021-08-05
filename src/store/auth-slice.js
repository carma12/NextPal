import {createSlice} from "@reduxjs/toolkit";

const initialAuthSlice = {
    isLogin: false,
    isLoading: false,
    token: localStorage.getItem('token'),
    logoutTimer: null,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthSlice,
    reducers: {
        setLoadingState(state, action) {
            state.isLoading = action.payload; // true || false
            // state.isLoading = !state.isLoading;
        },
        setIsLoginState(state, action) {
            state.isLogin = action.payload; // true || false
            //  state.isLogin = !state.isLogin;
        },
        setToken(state, action) {
            state.token = action.payload; // null || <Code>
        },
        checkUserStatus(state, action) {
            if (!!state.token) { // truthy
                state.isLogin = true;
            }
        },
        setLogoutTimer(state, action) {
            state.logoutTimer = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;
