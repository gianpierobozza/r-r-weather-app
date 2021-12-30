import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { APIContext } from "../contexts/APIContext";

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

const useFetchHourlyForecast = (props) => {
    const intl = useIntl();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { hourlyForecastUrl } = useContext(APIContext);

    var lat = props.lat;
    var lon = props.lon;

    function fetchHourlyForecast() {
        setData(null);
        setError(null);
        if (lat !== undefined && lon !== undefined && lat !== "" && lon !== "") {
            setLoading(true);
            var url = hourlyForecastUrl.replace("%lat", lat);
            url = url.replace("%lon", lon);
            axios.get(
                url
            ).then((response) => {
                var hourly = [];
                response.data.hourly.slice(0, 24).map((hour) => {
                    var date = new Date(parseInt(hour.dt + "000"));

                    hourly.push({
                        hour: date.getHours(),
                        temp: round(hour.temp, 1),
                        icon: hour.weather[0].icon
                    });
                });
                setData(hourly);
            }).catch((err) => {
                switch (err.response.status) {
                    case 404:
                        err.message = intl.formatMessage({ id: "weather_search_city_not_found" });
                        break;
                    default:
                        err.message = intl.formatMessage({ id: "weather_search_server_error" }, { value: err.response.status });
                }
                setError(err);
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    useEffect(() => {
        fetchHourlyForecast(false);
    }, [lat, lon, intl]);

    return { data, loading, error };
}

export default useFetchHourlyForecast;
