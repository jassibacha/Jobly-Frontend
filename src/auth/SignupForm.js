import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoblyApi from '../api/api';

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
        <form onSubmit={handleSignup}>
            <label>
                Username
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </label>
            <label>
                First Name
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Last Name
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>

            {/* Make an alert div later */}
            {formErrors.length ? (
                <div className="alert">{formErrors}</div>
            ) : null}

            <button type="submit" className="btn btn-success">
                Sign Up
            </button>
        </form>
    );
}

export default SignupForm;
