import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';
import JobsCard from '../jobs/JobsCard';
import CompanyCard from './CompanyCard';

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
            <CompanyCard
                handle={company.handle}
                name={company.name}
                description={company.description}
                numEmployees={company.numEmployees}
                logoUrl={company.logoUrl}
                // Add any other props that CompanyCard might need
            />
            <div className="job-listings">
                <h3 className="mb-3">Job Listings</h3>
                <div className="row">
                    {company.jobs && company.jobs.length > 0 ? (
                        company.jobs.map((job) => (
                            <div className="col-lg-6" key={job.id}>
                                <JobsCard
                                    title={job.title}
                                    salary={job.salary}
                                    equity={job.equity}
                                    companyName={company.name}
                                    companyHandle={company.handle}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="lead">No job listings available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CompanyDetails;
