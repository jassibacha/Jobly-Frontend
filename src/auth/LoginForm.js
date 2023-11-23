import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginForm({ login }) {
    const navigate = useNavigate();

    const INITIAL_STATE = {
        username: '',
        password: '',
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);

    /**
     * Handle form submission.
     */
    async function handleSubmit(evt) {
        evt.preventDefault();

        let result = await login(formData);
        console.log('Login handleSubmit Result', result);
        if (result.success) {
            console.log('Result success, redirecting to /companies');
            // Navigate is having issues with redirect, might be a state issue
            // We might need to set a timeout here
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
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3 text-center">Login</h2>

                <div className="card text-start">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
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

                            <div className="form-group mb-4">
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

                            {formErrors.length ? (
                                <div className="alert alert-danger">
                                    {formErrors}
                                </div>
                            ) : null}

                            <button
                                type="submit"
                                className="btn btn-primary w-100 mb-4"
                            >
                                Login
                            </button>

                            <div className="text-center">
                                <Link to="/signup">No account? Sign up.</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
