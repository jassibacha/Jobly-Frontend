import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import JoblyApi from '../api/api';
import JobsCard from './JobsCard';
import SearchForm from '../common/SearchForm';

function JobsList() {
    console.debug('JobsList');

    const [jobs, setJobs] = useState(null);

    useEffect(function getJobsOnMount() {
        console.debug('JobsList useEffect getJobsOnMount');
        search();
    }, []);

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return <LoadingSpinner />;

    return (
        <div className="JobsList">
            <div className="bg-light p-5 rounded-lg mb-5">
                <h1 className="display-4">Find Jobs</h1>
                <p className="lead">
                    Search through our extensive job listings
                </p>
                <SearchForm searchFor={search} />
            </div>
            {jobs.length ? (
                <div className="JobList-list row">
                    {jobs.map((job) => (
                        <div className="col-lg-6" key={job.id}>
                            <JobsCard
                                title={job.title}
                                salary={job.salary}
                                equity={job.equity}
                                companyName={job.companyName}
                                companyHandle={job.companyHandle}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="lead">No results found!</p>
            )}
        </div>
    );
}

export default JobsList;
