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

function AppRoutes() {
    return (
        <Router>
            <Header />
            <div className="container my-5">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/companies" element={<CompanyList />} />
                    <Route
                        path="/companies/:handle"
                        element={<CompanyDetails />}
                    />
                    <Route path="/jobs" element={<JobsList />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRoutes;
