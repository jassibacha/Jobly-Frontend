import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyCard.css';

function CompanyCard({ handle, name, description, numEmployees, logoUrl }) {
    // Use the company logo or a placeholder if the logo isn't available
    // We're gonna override this because none of the logos are actually there
    //const logoSrc = logoUrl || '/img/placeholder-logo.png';
    const logoSrc = '/img/placeholder-logo.png';

    return (
        <div className="card mb-3">
            <div className="card-body card-body-flex">
                <img
                    src={logoSrc}
                    className="card-img-left"
                    alt={`${name} Logo`}
                />
                <div className="text-left">
                    <h5 className="card-title">
                        <Link to={`/companies/${handle}`}>{name}</Link>
                    </h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">
                        <small className="text-muted">
                            Employees: {numEmployees}
                        </small>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CompanyCard;
