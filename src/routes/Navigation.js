import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
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
        </ul>
    );
}
