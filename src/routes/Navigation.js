import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav>
            <NavLink className="text-white me-3" to="/">
                Home
            </NavLink>
            <NavLink className="text-white" to="/companies">
                Companies
            </NavLink>
        </nav>
    );
}
