import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../auth/UserContext';

/**
 * Component for rendering a protected route.
 * React Router V6 made this a pain in the ass compared to the solution
 *  */
function ProtectedRoute({ element }) {
    const { currentUser } = useContext(UserContext);

    // If the user is not logged in, redirect to the login page
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    // If the user is logged in, render the specified component
    return element;
}

export default ProtectedRoute;
