import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';

function CompanyDetails() {
    const [company, setCompany] = useState(null);
    const { handle } = useParams();

    useEffect(() => {
        async function getCompanyDetails() {
            try {
                let company = await JoblyApi.getCompany(handle);
                setCompany(company);
            } catch (err) {
                console.error('Error loading company details', err);
            }
        }

        getCompanyDetails();
    }, [handle]);

    if (!company) return <LoadingSpinner />;

    return (
        <div>
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            <p>Number of Employees: {company.numEmployees}</p>
            {company.logoUrl && (
                <img src={company.logoUrl} alt={`${company.name} Logo`} />
            )}
            <div className="job-listings">
                <h3>Job Listings</h3>
                {company.jobs && company.jobs.length > 0 ? (
                    <ul>
                        {company.jobs.map((job) => (
                            <li key={job.id}>
                                <h4>{job.title}</h4>
                                <p>Salary: {job.salary}</p>
                                <p>Equity: {job.equity}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No job listings available.</p>
                )}
            </div>
        </div>
    );
}

export default CompanyDetails;
