import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../auth/UserContext';

export default function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);
    return (
        <ul className="navbar-nav ms-auto">
            {currentUser ? (
                <>
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
                        <NavLink className="nav-link" to="/profile">
                            Profile
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <button onClick={logout} className="btn btn-danger">
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li className="nav-item">
                        <NavLink className="btn btn-success me-2" to="/signup">
                            Signup
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="btn btn-primary" to="/login">
                            Login
                        </NavLink>
                    </li>
                </>
            )}
        </ul>
    );
}
