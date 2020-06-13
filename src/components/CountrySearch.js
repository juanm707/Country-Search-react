import React from 'react';

const CountrySearch = (props) => {
    return (
        <div>
            find countries <input value={props.newCountrySearch} onChange={props.onChange}/>
        </div>
    );
}

export default CountrySearch;