import React from 'react';
import Navigation from '../routes/Navigation';

function Header() {
    return (
        <header className="bg-dark text-white py-3">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="h3 mb-0">Jobly</h1>
                    <Navigation />
                </div>
            </div>
        </header>
    );
}

export default Header;
