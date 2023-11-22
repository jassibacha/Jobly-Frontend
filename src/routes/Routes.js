import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyList from '../companies/CompanyList';
import Header from '../header/Header';
import Homepage from '../homepage/Homepage';

function AppRoutes() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/companies" element={<CompanyList />} />
                <Route path="/companies/:handle" element={<Homepage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
