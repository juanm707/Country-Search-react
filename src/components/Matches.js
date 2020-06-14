import React from 'react';

const Matches = ({countries, onClick}) => {
    if (countries.length === 0) {
        return <div><p>Search for countries</p></div>
    } else if (countries.length > 10){
        return <div><p>Too many matches, specify another filter</p></div>
    } else if (countries.length === 1) {

        const singleCountry = countries[0];
        const languages = singleCountry.languages;

        return (
          <div>
              <h1>{singleCountry.name} ({singleCountry.alpha3Code})</h1>
              <p>Capital: {singleCountry.capital}</p>
              <p>Population: {singleCountry.population}</p>
              <h3>Languages</h3>
              {languages.map(language => <p key={language.iso639_2}>{language.name}</p>)}
              <img src={singleCountry.flag} width="50%" height="50%" alt={singleCountry.name}/>
          </div>
        );
    } else {
        return (
            <div>
                <h2>Matched Countries</h2>
                {countries.map(country => {
                    //console.log(country);
                    return (
                        <div key={country.name}>
                            <p key={country.alpha3Code}>{country.name}</p>
                            <button
                                key={country.alpha3Code + 'button'}
                                onClick={onClick}
                                value={country.alpha3Code}>
                                show
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Matches;