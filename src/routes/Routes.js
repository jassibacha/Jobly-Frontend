import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyList from '../companies/CompanyList';
import Homepage from '../homepage/Homepage';
import Navigation from './Navigation';

function AppRoutes() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/companies" element={<CompanyList />} />
                <Route path="/companies/:handle" element={<Homepage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
