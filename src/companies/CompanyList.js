import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import JoblyApi from '../api/api';

export default function CompanyList() {
    console.debug('CompanyList');

    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOnMount() {
        console.debug('CompanyList useEffect getCompaniesOnMount');
        search();
    }, []);

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <LoadingSpinner />;

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            {companies.length ? (
                <div className="CompanyList-list">
                    {companies.map((c) => (
                        <div key={c.handle}>
                            <h4>
                                <a href={`/companies/${c.handle}`}>{c.name}</a>
                            </h4>
                            <div className="CompanyCard">
                                <p>Desc: {c.description}</p>
                                <p>Employees: {c.numEmployees}</p>
                                <p>Logo: {c.logoUrl}</p>
                            </div>
                        </div>
                        // <CompanyCard
                        //     key={c.handle}
                        //     handle={c.handle}
                        //     name={c.name}
                        //     description={c.description}
                        //     numEmployees={c.num_employees}
                        //     logoUrl={c.logo_url}
                        // />
                    ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
        </div>
    );
}
