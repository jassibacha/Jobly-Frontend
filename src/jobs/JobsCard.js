import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import './JobsCard.css';

function JobsCard({ id, title, salary, equity, companyName, companyHandle }) {
    console.debug('JobsCard');

    // Pull in hasAppliedToJob and applyToJob from App
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    // Set state for whether the current user has applied
    const [applied, setApplied] = useState();

    // Update applied state when hasAppliedToJob changes
    useEffect(() => {
        console.debug(`JobsCard useEffect hasAppliedToJob=${id}`);
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    // Apply for a job
    async function handleApply(evt) {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    <Link to={`/companies/${companyHandle}`}>
                        {companyName}
                    </Link>
                </p>
                {(salary || equity) && (
                    <p className="card-text">
                        {salary && <>Salary: {salary}</>}
                        {equity && salary && '  |  '}
                        {equity && <>Equity: {equity}</>}
                    </p>
                )}
                <button
                    className="btn btn-danger font-weight-bold text-uppercase float-right"
                    onClick={handleApply}
                    disabled={applied}
                >
                    {applied ? 'Applied' : 'Apply'}
                </button>
            </div>
        </div>
    );
}

export default JobsCard;
