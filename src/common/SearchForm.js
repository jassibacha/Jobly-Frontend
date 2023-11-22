import React, { useState } from 'react';

function SearchForm({ searchFor }) {
    console.debug('SearchForm', 'searchFor=', typeof searchFor);
    const [searchTerm, setSearchTerm] = useState('');
    function handleSearch(event) {
        event.preventDefault(); // Prevent the default form submit behavior
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
        // Logic to trigger the API call with the current search term
    }
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }
    return (
        <form
            onSubmit={handleSearch}
            className="form-inline d-flex my-2 my-lg-0"
        >
            <input
                className="form-control flex-grow-1 mr-sm-2"
                type="search"
                placeholder="Search companies"
                aria-label="Search"
                value={searchTerm}
                onChange={handleChange}
            />
            <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
            >
                Search
            </button>
        </form>
    );
}

export default SearchForm;
