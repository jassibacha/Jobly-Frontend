import React, { useState, useContext } from 'react';
import JoblyApi from '../api/api';
import UserContext from '../auth/UserContext';
import { Link } from 'react-router-dom';

function Profiles() {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    // Set up state variables for form data and form errors
    const [formData, setFormData] = useState({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: '',
    });
    const [formErrors, setFormErrors] = useState([]);

    // State to trigger display of success or error message
    const [saveConfirmed, setSaveConfirmed] = useState(false);

    console.debug(
        'Profile Page',
        'currentUser=',
        currentUser,
        'formData=',
        formData,
        'formErrors=',
        formErrors,
        'saveConfirmed=',
        saveConfirmed
    );

    /**
     * Handle form submission.
     */
    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.updateUser(username, profileData);
        } catch (err) {
            setFormErrors(err);
            return;
        }

        setFormData((f) => ({ ...f, password: '' }));
        setFormErrors([]);
        setSaveConfirmed(true);

        // Update state across the site
        setCurrentUser(updatedUser);
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
        setFormErrors([]);
    }

    return (
        <div className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3 text-center">Edit Profile</h2>

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
                                    disabled
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

                            <div className="form-group mb-4">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Confirm password to make changes:
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

                            {saveConfirmed ? (
                                <div className="alert alert-success">
                                    Updated successfully.
                                </div>
                            ) : null}

                            <button
                                type="submit"
                                className="btn btn-success w-100"
                            >
                                Update Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profiles;
