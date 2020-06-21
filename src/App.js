import React, { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import CountrySearch from "./components/CountrySearch";
import Matches from "./components/Matches";


function App() {

    const [countries, setCountries] = useState([]);
    const [countriesToDisplay, setCountriesToDisplay] = useState([]);
    const [newCountrySearch, setNewCountrySearch] = useState('');

    const handleNewCountrySearch = (event) => {
        setNewCountrySearch(event.target.value);
        if (event.target.value === "") {
            setCountriesToDisplay([]);
        } else {
            setCountriesToDisplay(countries.filter(country => country.name.toUpperCase().includes(event.target.value.toUpperCase())));
        }
    }

    const handleCountryButtonClick = (event) => {
        console.log('handleClick', event.target.value);
        setCountriesToDisplay(countries.filter(country => country.alpha3Code === event.target.value));
    };

    const handleBackToMatchesButton = (event) => {
        console.log('back to matches')
        setCountriesToDisplay(countries.filter(country => country.name.toUpperCase().includes(newCountrySearch.toUpperCase())));
    };

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                const countries = response.data;
                //console.log(countries);
                setCountries(countries);
                //setCountriesToDisplay(countries);
            });
    };

    useEffect(hook, []);

    return (
        <div className="App">
            <header className="App-header">
                <CountrySearch
                    onChange={handleNewCountrySearch}
                    value={newCountrySearch}
                />
                <Matches
                    countries={countriesToDisplay}
                    onClick={handleCountryButtonClick}
                    onBack={handleBackToMatchesButton}
                />
            </header>
        </div>
    );
}

export default App;
