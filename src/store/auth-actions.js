import {authActions} from "./auth-slice";

const LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOlPcwmVrbztUP0PCTHLwbsNxNR3UoHsY';
const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOlPcwmVrbztUP0PCTHLwbsNxNR3UoHsY';

export const logIn = (userData) => {

    const calculateRemainingTime = (expirationTime) => {
        const currentTime = new Date().getTime(); // now
        const adjExpirationTime = new Date(expirationTime).getTime();

        // Remaining duration:
        return adjExpirationTime - currentTime;
    };

    return async dispatch => {
        const logInRequest = async () => {
            const response = await fetch(LOGIN_URL,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: userData.email,
                        password: userData.password,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            return response.json();
        };

        try {
            dispatch(authActions.setLoadingState(true));
            const data = await logInRequest();

            if (data.error) {
                dispatch(authActions.setError(data.error.message));
                alert(data.error.message);
            } else {
                dispatch(authActions.setIsLoginState(true));
                dispatch(authActions.setToken(data.idToken));
                localStorage.setItem('token', data.idToken);

                // Calculate remaining time
                localStorage.setItem('expirationTime', data.expiresIn) // default: 3600s = 1h
                const expirationTime = new Date(
                    new Date().getTime() + (+data.expiresIn * 1000)
                );
                const remainingTime = calculateRemainingTime(expirationTime);
                const logoutTimer = setTimeout(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('expirationTime');
                    dispatch(authActions.setToken(null));
                    dispatch(authActions.setIsLoginState(false));
                },remainingTime);
                dispatch(authActions.setLogoutTimer(logoutTimer));
            }

            dispatch(authActions.setError(null));
            dispatch(authActions.setLoadingState(false));


        } catch (error) {
            alert('ERROR: ' + error);
        }
    }
};

export const signUp = (userData) => {
    return async dispatch => {
        const signUpRequest = async () => {
            const response = await fetch(SIGNUP_URL,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: userData.email,
                        password: userData.password,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            if (!response.ok) {
                throw new Error('Cannot register email. Error trying to send data to Firebase.');
            }
        };

        try {
            dispatch(authActions.setLoadingState(true));
            await signUpRequest();
            // dispatch(authActions.setIsLoginState(true));
            dispatch(authActions.setLoadingState(false));
        } catch (error) {
            console.log('ERROR (logIn) -> ' + error);
        }
    }
};
