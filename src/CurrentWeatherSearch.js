import React, { useState } from 'react';
import { useAsyncAbortable } from 'react-async-hook';
import useConstant from 'use-constant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { Input } from '@material-ui/core';

var globalApiKey;

const fetchWeather = async (userInput, abortSignal) => {
    if (userInput !== '') {
        const result = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + globalApiKey + "&units=metric", {
            signal: abortSignal,
        });
        if (result.status !== 200) {
            switch (result.status) {
                case 404:
                    throw new Error('Sorry, city not found');
                default:
                    throw new Error('Server returned error ' + result.status);
            }
        }
        //console.log(result);
        return result.json();
    }
};

const useFetchWeather = () => {
    const [inputText, setInputText] = useState('');

    const debouncedFetchWeather = useConstant(() =>
        AwesomeDebouncePromise(fetchWeather, 500)
    );

    const search = useAsyncAbortable(
        async (abortSignal, text) => {
            if (text.length !== 0) {
                return debouncedFetchWeather(text, abortSignal);
            }
        },
        [inputText]
    );
    return {
        inputText,
        setInputText,
        search,
    };
};

const CurrentWeatherSearch = ({ apiKey }) => {
    globalApiKey = apiKey;

    const { inputText, setInputText, search } = useFetchWeather();

    const handleChange = (e) => {
        e.preventDefault();
        setInputText(e.currentTarget.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input id="search-city" value={inputText} onChange={handleChange} placeholder='Enter City...' />
            </form>
            <div>
                {search.loading && <div>Loading</div>}
                {search.error && <div>Error: {search.error.message}</div>}
                {search.result && (
                    <div>
                        <div>Success!</div>
                        <div>City: {search.result.name}</div>
                        <div>Temp: {search.result.main.temp} C</div>
                        <div>Weather: {search.result.weather[0].description}</div>
                        <div><img src={`https://openweathermap.org/img/wn/${search.result.weather[0].icon}.png`} alt={search.result.weather[0].icon} /></div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default CurrentWeatherSearch;