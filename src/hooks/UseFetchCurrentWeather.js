import axios from "axios";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { LOCALES } from "../i18n/locales.js";
import myWeatherGlobalsStore from "../redux/store";

function getLocale() {
    const savedLocale = localStorage.getItem("locale");
    return savedLocale || LOCALES.ENGLISH;
}

const useFetchCurrentWeather = (props) => {
    const intl = useIntl();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const city = props.debouncedInput;

    function fetchCurrentWeather() {
        setData(null);
        setError(null);
        if (city !== "") {
            setLoading(true);
            axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myWeatherGlobalsStore.getState()["openWeatherApiKey"] + "&units=metric&lang=" + getLocale().split(/[-_]/)[0]
            ).then((response) => {
                setData(response.data);
            }).catch((err) => {
                switch (err.response.status) {
                    case 404:
                        err.message = intl.formatMessage({ id: "current_weather_search_city_not_found" });
                        break;
                    default:
                        err.message = intl.formatMessage({ id: "current_weather_search_server_error" }, { value: err.response.status });
                }
                setError(err);
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    useEffect(() => {
        fetchCurrentWeather();
    }, [city, intl]);

    const refresh = () => {
        fetchCurrentWeather();
    };

    return { data, loading, error, refresh };
}

export default useFetchCurrentWeather;
