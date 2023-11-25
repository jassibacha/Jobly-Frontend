import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
    return (
        <div className="row">
            <div className="col-md-6">
                <h1>Explore and secure top job opportunities with Jobly</h1>
                <p>
                    Uncover exciting new career paths and apply discreetly with
                    our one-click application feature. Gain insight into
                    comprehensive compensation details, including salary and
                    equity, before you apply.
                </p>
                <Link to="/signup" className="btn btn-primary mb-3 mx-2">
                    Sign Up
                </Link>
                <Link to="/login" className="btn btn-secondary mb-3 mx-2">
                    Login
                </Link>
                <p>
                    For a hands-on experience of our platform's capabilities,
                    you're welcome to log in using the demo credentials:
                    username 'testuser' and password 'password'.
                </p>
            </div>

            <div className="col-md-6 d-flex align-items-center">
                <img
                    src="/img/homepage-img.png"
                    alt="Homepage"
                    class="img-fluid"
                />
            </div>
        </div>
    );
}
