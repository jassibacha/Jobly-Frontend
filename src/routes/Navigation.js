import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../auth/UserContext';

export default function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);
    return (
        <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/">
                    Home
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/companies">
                    Companies
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/jobs">
                    Jobs
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                    Signup
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                    Login
                </NavLink>
            </li>
            {currentUser && (
                <button onClick={logout} className="btn btn-danger">
                    Logout
                </button>
            )}
        </ul>
    );
}
