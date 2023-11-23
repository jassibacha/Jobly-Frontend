import React, { useState, useEffect } from 'react';
import AppRoutes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import JoblyApi from './api/api';
import LoadingSpinner from './common/LoadingSpinner';
import { jwtDecode } from 'jwt-decode';
import UserContext from './auth/UserContext';

// Setup our token storage ID for localStorage
const TOKEN_STORAGE_ID = 'jobly-token';

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);

    console.debug(
        `App // infoLoaded=${infoLoaded}, 
        currentUser=${currentUser}, 
        token=${token}`
    );

    // Load user info from API. Until a user is logged in and they have a token,
    // this should not run. It only needs to re-run when a user logs out, so
    // the value of the token is a dependency for this effect.

    useEffect(
        function loadUserInfo() {
            console.debug('App useEffect loadUserInfo', 'token=', token);

            async function getCurrentUser() {
                if (token) {
                    try {
                        let { username } = jwtDecode(token);
                        console.log(
                            'Getting current user',
                            'token=',
                            token,
                            'username=',
                            username
                        );
                        // put the token on the Api class so it can use it to call the API.
                        JoblyApi.token = token;

                        let currentUser = await JoblyApi.getUser(username);
                        setCurrentUser(currentUser);
                    } catch (err) {
                        console.error('App loadUserInfo: problem loading', err);
                        setCurrentUser(null);
                    }
                }
                setInfoLoaded(true); // Set infoLoaded to true after the API call
            }

            // set infoLoaded to false while async getCurrentUser runs; once the
            // data is fetched (or even if an error happens!), this will be set back
            // to false to control the spinner.
            setInfoLoaded(false);
            getCurrentUser();
        },
        [token]
    );

    /** Handles site-wide logout. */
    function logout() {
        setCurrentUser(null);
        setToken(null);
    }

    /**
     * Sign up a user with the provided signup data.
     * */
    async function signup(signupData) {
        console.log('Signup data:', signupData);
        try {
            // Call the signup API and get the token
            let token = await JoblyApi.signup(signupData);

            // Set the obtained token
            setToken(token);

            // Return success status
            return { success: true };
        } catch (errors) {
            // Log the error and return the error response
            console.error('Signup Failed', errors);
            return { success: false, errors };
        }
    }

    /**
     * Logs in a user using the provided login data.
     */
    async function login(loginData) {
        try {
            // Call the login method of the JoblyApi and retrieve the token
            let token = await JoblyApi.login(loginData);

            // Set the token in the application state
            setToken(token);

            // Return an object indicating the success of the login operation
            return { success: true };
        } catch (errors) {
            // Log the error message if the login operation fails
            console.error('Login Failed', errors);

            // Return an object indicating the failure of the login operation along with the error message
            return { success: false, errors };
        }
    }

    if (!infoLoaded) return <LoadingSpinner />;

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <div className="App">
                <AppRoutes login={login} signup={signup} logout={logout} />
                {token ? <p>Token: {token}</p> : <p>No token found</p>}
            </div>
        </UserContext.Provider>
    );
}

export default App;
