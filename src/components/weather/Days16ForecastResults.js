import React, { Fragment } from "react";
import { useIntl, FormattedDateParts } from "react-intl";
import useFetchDays16Forecast from "../../hooks/UseFetchDays16Forecast";

import {
    Box,
    Grid,
    Paper,
    Tooltip,
    Typography
} from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";

const ItemPaper = styled(Paper)(({ theme }) => ({
    fontSize: 16,
    padding: theme.spacing(1),
    textAlign: "center",
}));

const weatherIcon = makeStyles({
    root: {
        margin: 4,
        width: 32,
        height: 32
    },
});

const monthContainer = makeStyles({
    root: {
        backgroundColor: "crimson",
        borderTop: "1px solid crimson",
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        color: "whitesmoke",
        fontWeight: "bold",
        width: 60,
        height: 25,
        margin: "auto"
    }
});

const dayContainer = makeStyles({
    root: {
        backgroundColor: "whitesmoke",
        borderTop: "1px solid whitesmoke",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        color: "black",
        fontWeight: "bold",
        width: 60,
        height: 30,
        margin: "auto",
        marginBottom: 8
    }
});

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

const Days16ForecastResults = (props) => {
    const intl = useIntl();
    const input = props.input;
    const forecastDays = 8;
    const weatherImg = weatherIcon();
    const month = monthContainer();
    const day = dayContainer();
    const { data, loading, error } = useFetchDays16Forecast({ input, forecastDays })

    return (
        <Fragment>
            {!error && !loading && (
                <Grid container justifyContent="center" spacing={1}>
                    {data?.list?.slice(1).map((list) => (
                        <Grid item xs key={list.sunrise + "-gridItem"}>
                            <ItemPaper>
                                <Box>
                                    <Box display="flex" alignItems="center" justifyContent="center" className={month.root}>
                                        <FormattedDateParts
                                            value={new Date(parseInt(list.dt + "000"))}
                                            year="numeric"
                                            month="short"
                                            day="2-digit"
                                        >
                                            {parts => (
                                                <>
                                                    {parts[2].value.toUpperCase()}
                                                </>
                                            )}
                                        </FormattedDateParts>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center" className={day.root}>
                                        <FormattedDateParts
                                            value={new Date(parseInt(list.dt + "000"))}
                                            year="numeric"
                                            month="short"
                                            day="2-digit"
                                        >
                                            {parts => (
                                                <>
                                                    {parts[0].value}
                                                </>
                                            )}
                                        </FormattedDateParts>
                                    </Box>
                                    <Box>
                                        <Tooltip title={list.weather[0]?.description} placement="top">
                                            <img
                                                onContextMenu={(e) => e.preventDefault()}
                                                className={weatherImg.root}
                                                src={process.env.PUBLIC_URL + list.weather[0]?.icon + ".png"}
                                                alt={list.weather[0]?.icon}
                                            />
                                        </Tooltip>
                                    </Box>
                                    <Box>
                                        <Tooltip title={intl.formatMessage({ id: "current_weather_search_temp_max" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "thermometer_max.png"} alt="thermometer_max" />
                                        </Tooltip>
                                        <Typography component="div">{round(list.temp.max, 1)}&deg;C</Typography>
                                    </Box>
                                    <Box>
                                        <Tooltip title={intl.formatMessage({ id: "current_weather_search_temp_min" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "thermometer_min.png"} alt="thermometer_min" />
                                        </Tooltip>
                                        <Typography component="div">{round(list.temp.min, 1)}&deg;C</Typography>
                                    </Box>
                                </Box>
                            </ItemPaper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Fragment>
    )
}

export default Days16ForecastResults;
