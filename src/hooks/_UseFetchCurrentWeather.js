import { useEffect } from "react";
import { useAsyncAbortable } from "react-async-hook";
import useConstant from "use-constant";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { LOCALES } from "../i18n/locales.js";
import myWeatherGlobalsStore from "../redux/store";

function getLocale() {
    const savedLocale = localStorage.getItem("locale");
    return savedLocale || LOCALES.ENGLISH;
}

const useFetchCurrentWeather = (props) => {
    const { input, setInput } = props;

    const fetchWeather = async (city, abortSignal) => {
        if (city !== "") {
            const result = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myWeatherGlobalsStore.getState()["openWeatherApiKey"] + "&units=metric&lang=" + getLocale().split(/[-_]/)[0], {
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
            //console.log(result);
            return result.json();
        }
    };

    const debouncedFetchWeather = useConstant(() =>
        AwesomeDebouncePromise(fetchWeather, 500)
    );

    const search = useAsyncAbortable(
        async (abortSignal, text) => {
            if (text.length !== 0) {
                return debouncedFetchWeather(text, abortSignal);
            }
        },
        [input]
    );

    useEffect(() => {
        return {
            input,
            setInput,
            search,
        };
    });

    const update = () => {
        console.log("update");
        fetchWeather(input);
    }

    return { search, update };
}

export default useFetchCurrentWeather;
