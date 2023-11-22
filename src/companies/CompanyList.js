import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import JoblyApi from '../api/api';
import CompanyCard from './CompanyCard';
import SearchForm from '../common/SearchForm';

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
        <div className="CompanyList">
            <div className="bg-light p-5 rounded-lg mb-5">
                <h1 className="display-4">Find Your Dream Company</h1>
                <p className="lead">
                    Search through our extensive company listings
                </p>
                <SearchForm searchFor={search} />
            </div>
            {companies.length ? (
                <div className="CompanyList-list">
                    {companies.map((c) => (
                        <CompanyCard
                            key={c.handle}
                            handle={c.handle}
                            name={c.name}
                            description={c.description}
                            numEmployees={c.numEmployees}
                            logoUrl={c.logoUrl}
                        />
                    ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
        </div>
    );
}
