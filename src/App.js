import React, { useState, useEffect } from 'react';
import AppRoutes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import JoblyApi from './api/api';
import LoadingSpinner from './common/LoadingSpinner';
import { jwtDecode } from 'jwt-decode';
import UserContext from './auth/UserContext';
import useLocalStorage from './hooks/useLocalStorage';

// Setup our token storage ID for localStorage
const TOKEN_STORAGE_ID = 'jobly-token';

/** Jobly application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage via useLocalStorage hook.
 *
 * App -> Routes
 */

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

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
                        let { username } = jwtDecode(token); // Decode username from token
                        console.log(
                            'Getting current user',
                            'token=',
                            token,
                            'username=',
                            username
                        );
                        JoblyApi.token = token; // Set token in API class for future requests
                        let currentUser = await JoblyApi.getUser(username); // Fetch user data
                        setCurrentUser(currentUser); // Set user data in state
                    } catch (err) {
                        console.error('App loadUserInfo: problem loading', err);
                        setCurrentUser(null); // Reset user data on error
                    }
                }
                setInfoLoaded(true); // Indicate loading is complete
            }

            setInfoLoaded(false); // Reset loading state before API call
            getCurrentUser(); // Trigger user data loading
        },
        [token]
    );

    // Function to handle logout
    function logout() {
        setCurrentUser(null); // Clear current user
        setToken(null); // Clear token and remove from localStorage
    }

    /**
     * Sign up a user with the provided signup data.
     * */
    async function signup(signupData) {
        console.log('Signup data:', signupData);
        try {
            let token = await JoblyApi.signup(signupData); // Call signup API
            setToken(token); // Set received token
            return { success: true };
        } catch (errors) {
            console.error('Signup Failed', errors);
            return { success: false, errors };
        }
    }

    /**
     * Logs in a user using the provided login data.
     */
    async function login(loginData) {
        try {
            let token = await JoblyApi.login(loginData); // Call login API
            setToken(token); // Set received token
            return { success: true };
        } catch (errors) {
            console.error('Login Failed', errors);
            return { success: false, errors };
        }
    }

    // Show spinner while loading user data
    if (!infoLoaded) return <LoadingSpinner />;

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <div className="App">
                <AppRoutes login={login} signup={signup} logout={logout} />
            </div>
        </UserContext.Provider>
    );
}

export default App;
