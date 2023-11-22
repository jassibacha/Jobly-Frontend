import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/companies">Companies</Link>
        </nav>
    );
}
