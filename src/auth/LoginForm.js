import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        if (result.success) {
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
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
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
                <div className="alert">{formErrors}</div>
            ) : null}
            <button type="submit" className="btn btn-primary">
                Login
            </button>
        </form>
    );
}

export default LoginForm;
