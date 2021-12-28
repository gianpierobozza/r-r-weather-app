import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { APIContext } from "../contexts/APIContext";

const useFetchDays16Forecast = (props) => {
    const intl = useIntl();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { days16ForecastUrl } = useContext(APIContext);

    var city = props.input;

    function fetchDays16Forecast() {
        setData(null);
        setError(null);
        if (city !== "") {
            setLoading(true);
            var url = days16ForecastUrl.replace("%city", city);
            url = url.replace("%days", props.forecastDays);
            axios.get(
                url
            ).then((response) => {
                setData(response.data);
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
        fetchDays16Forecast(false);
    }, [city, intl]);

    return { data, loading, error };
}

export default useFetchDays16Forecast;
