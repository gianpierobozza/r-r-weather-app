import React, { useState } from "react";
import { useAsyncAbortable } from "react-async-hook";
import useConstant from "use-constant";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { Input, CircularProgress } from "@material-ui/core";
import myWeatherGlobalsStore from "../redux/store";
import { useIntl, FormattedMessage } from "react-intl";
import { LOCALES } from "../i18n/locales.js";

const fetchWeather = async (userInput, abortSignal) => {
    if (userInput !== "") {
        const result = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + myWeatherGlobalsStore.getState()["openWeatherApiKey"] + "&units=metric&lang=" + getLocale().split(/[-_]/)[0], {
            signal: abortSignal,
        });
        if (result.status !== 200) {
            switch (result.status) {
                case 404:
                    throw new Error("current_weather_search_city_not_found");
                default:
                    throw new Error("Server returned error " + result.status);
            }
        }
        console.log(result);
        return result.json();
    }
};

const useFetchWeather = () => {
    const [inputText, setInputText] = useState("");

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

function getLocale() {
    const savedLocale = localStorage.getItem("locale");
    return savedLocale || LOCALES.ENGLISH;
}

const CurrentWeatherSearch = () => {
    const intl = useIntl();
    
    const { inputText, setInputText, search } = useFetchWeather();

    const handleChange = (e) => {
        e.preventDefault();
        setInputText(e.currentTarget.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const now = intl.formatDate(Date.now(), {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    return (
        <div className="container hero">
            <p><FormattedMessage id="start_today" values={{ date: now }} /></p>
            <form onSubmit={handleSubmit}>
                <Input id="search-city" value={inputText} onChange={handleChange} placeholder={intl.formatMessage({ id: "city_search_placeholder" })} />
            </form>
            <div>
                {search.loading && <div style={{ padding: 16 }}><CircularProgress /></div>}
                {search.error && <div>{intl.formatMessage({ id: search.error.message })}</div>}
                {search.result && (
                    <div>
                        <div><FormattedMessage id="current_weather_search_temp" values={{ value: search.result.main.temp }} />&deg;</div>
                        <div>
                            <FormattedMessage id="current_weather_search_weather" values={{ value: search.result.weather[0].description }} />
                            <img src={`https://openweathermap.org/img/wn/${search.result.weather[0].icon}.png`} alt={search.result.weather[0].icon} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default CurrentWeatherSearch;