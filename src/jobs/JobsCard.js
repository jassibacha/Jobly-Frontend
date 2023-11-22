import React from 'react';
import { Link } from 'react-router-dom';
import './JobsCard.css';

function JobsCard({ title, salary, equity, companyName, companyHandle }) {
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
            </div>
        </div>
    );
}

export default JobsCard;
