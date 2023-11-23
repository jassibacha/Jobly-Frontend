import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import CompanyDetails from '../companies/CompanyDetails';
import CompanyList from '../companies/CompanyList';
import ProfilePage from '../profiles/ProfilePage';
import Header from '../header/Header';
import Homepage from '../homepage/Homepage';
import JobsList from '../jobs/JobsList';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes({ login, signup, logout }) {
    return (
        <Router>
            <Header logout={logout} />
            <div className="container my-5">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route
                        path="/companies"
                        element={<ProtectedRoute element={<CompanyList />} />}
                    />
                    <Route
                        path="/companies/:handle"
                        element={
                            <ProtectedRoute element={<CompanyDetails />} />
                        }
                    />
                    <Route
                        path="/jobs"
                        element={<ProtectedRoute element={<JobsList />} />}
                    />
                    <Route
                        path="/profile"
                        element={<ProtectedRoute element={<ProfilePage />} />}
                    />
                    <Route
                        path="/signup"
                        element={<SignupForm signup={signup} />}
                    />
                    <Route
                        path="/login"
                        element={<LoginForm login={login} />}
                    />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRoutes;
