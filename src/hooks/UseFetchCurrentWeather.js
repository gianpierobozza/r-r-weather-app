import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { APIContext } from "../contexts/APIContext";

const useFetchCurrentWeather = (props) => {
    const intl = useIntl();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { currentWeatherUrl } = useContext(APIContext)

    var city = props.debouncedInput;

    function fetchCurrentWeather(isRefresh) {
        if (!isRefresh) {
            setData(null);
            setError(null);
        }
        if (city !== "") {
            setLoading(true);
            axios.get(
                currentWeatherUrl.replace("%city", city)
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
        fetchCurrentWeather(false);
    }, [city, intl]);

    const refresh = (refreshCity) => {
        city = refreshCity;
        fetchCurrentWeather(true);
    };

    return { data, loading, error, refresh };
}

export default useFetchCurrentWeather;
