import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/**
 * Component for the signup form.
 */
function SignupForm({ signup }) {
    const navigate = useNavigate();

    // Define the initial form state
    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    };

    // Set up state variables for form data and form errors
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);

    /**
     * Handle form submission.
     */
    async function handleSignup(evt) {
        evt.preventDefault();

        // Call the signup function with the form data
        let result = await signup(formData);
        if (result.success) {
            // If signup was successful, redirect to the login page
            navigate('/companies');
        } else {
            setFormErrors(result.errors);
        }
    }

    /**
     * Handle form field change.
     */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    }

    return (
        <form className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3 text-center">Sign Up</h2>

                <div className="card text-left">
                    <div className="card-body text-left">
                        <form onSubmit={handleSignup}>
                            <div className="form-group mb-3">
                                <label
                                    htmlFor="username"
                                    className="form-label"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label
                                    htmlFor="firstName"
                                    className="form-label"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="form-control"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {formErrors.length ? (
                                <div className="alert alert-danger">
                                    {formErrors}
                                </div>
                            ) : null}

                            <button
                                type="submit"
                                className="btn btn-success w-100 mb-3"
                            >
                                Sign Up
                            </button>

                            <div className="text-center">
                                <Link to="/login">
                                    Already have an account? Log in.
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SignupForm;
