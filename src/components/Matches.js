import React, {useEffect, useState} from 'react';
import axios from "axios";
import MapView from "./MapView";

const API_KEY = process.env.REACT_APP_API_KEY;

const WeatherInfo = ({capital}) => {

    if (capital === 'Washington, D.C.') { // if we query for washington dc we get washington, aruba... ???
        capital = 'Washington';
    }

    const [weather, setWeather] = useState(
        {
                    "observation_time": NaN,
                    "temperature": NaN,
                    "weather_icon": "",
                    "wind_speed": NaN,
                    "wind_direction": "",
                    "coords": [],
            }
    );

    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`;
    const hook = () => {
        axios.get(url).then(response => {
            console.log("CHECK HERE", response.data);
            console.log("Coords: ", [response.data.location.lat, response.data.location.lon])
            const weatherInfo = {
                    "observation_time": response.data.current.observation_time,
                    "temperature": response.data.current.temperature,
                    "weather_icon": response.data.current.weather_icons[0],
                    "wind_speed": response.data.current.wind_speed,
                    "wind_direction": response.data.current.wind_dir,
                    "coords": [response.data.location.lat, response.data.location.lon],
            }
            setWeather(weatherInfo);
        });
    }

    useEffect(hook, []);

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <h4>Observed time: {weather.observation_time}</h4>
            <p><strong>Temperature: </strong>{weather.temperature} celsius</p>
            <img src={weather.weather_icon} alt=""/>
            <p><strong>Wind: </strong>{weather.wind_speed} mph direction {weather.wind_direction}</p>
            {console.log("coords in return", weather.coords.length)}
            {weather.coords.length === 0 ? null : <MapView coords={weather.coords} capital={capital}/>}
        </div>
    );
}

const Matches = ({countries, onClick, onBack}) => {

    if (countries.length === 0) {
        return <div><p>Search for countries</p></div>
    } else if (countries.length > 10){
        return <div><p>Too many matches, specify another filter</p></div>
    } else if (countries.length === 1) {

        const singleCountry = countries[0];
        const languages = singleCountry.languages;

        return (
          <div>
              <button onClick={onBack}>Back to matches</button>
              <h1>{singleCountry.name} ({singleCountry.alpha3Code})</h1>
              <p>Capital: {singleCountry.capital}</p>
              <p>Population: {singleCountry.population}</p>
              <h3>Languages</h3>
              {languages.map(language => <p key={language.iso639_2}>{language.name}</p>)}
              <img src={singleCountry.flag} width="50%" height="50%" alt={singleCountry.name}/>
              <WeatherInfo capital={singleCountry.capital}/>
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