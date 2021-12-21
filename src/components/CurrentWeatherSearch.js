import React, { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import { useIntl, FormattedMessage } from "react-intl";
import useFetchCurrentWeather from "../hooks/UseFetchCurrentWeather";

import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Item = styled(Paper)(({ theme }) => ({
    fontSize: 16,
    padding: theme.spacing(1),
    textAlign: "center",
}));

const useStyles = makeStyles({
    root: {
        backgroundColor: "white",
        border: 0,
        borderRadius: 3,
        margin: 12,
    },
});

function convertDegreesToCardinalDir(deg) {
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    var degrees = deg * 16 / 360;
    degrees = Math.round(degrees, 0);
    degrees = (degrees + 16) % 16;
    return directions[degrees];
}

const CurrentWeatherSearch = () => {
    const intl = useIntl();
    const [input, setInput] = useState("");
    const [debouncedInput, setDebouncedInput] = useState("");
    const { data, loading, error, refresh } = useFetchCurrentWeather({ debouncedInput, setDebouncedInput });

    const debounced = useCallback(
        debounce((debouncedSearch) => {
            setDebouncedInput(debouncedSearch);
        }, 1000),
        []
    );

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.currentTarget.value);
        debounced(e.currentTarget.value);
    };

    const now = intl.formatDate(Date.now(), {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });

    const img = useStyles();

    return (
        <Box>
            <Box sx={{ margin: 24 }}>
                <Grid container justifyContent="flex-start">
                    <Grid item md={6}>
                        <Typography variant="h5" component="div">
                            <FormattedMessage id="start_today" values={{ date: now }} />
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Container maxWidth="sm">
                <Card sx={{ minWidth: 300 }}>
                    <CardContent>
                        {(data === null || error !== null || debouncedInput === "") && (
                            <Box
                                component="form"
                                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="search-city"
                                    value={input}
                                    onChange={handleChange}
                                    variant="standard"
                                    margin="dense"
                                    label={intl.formatMessage({ id: "city_search_placeholder" })}
                                />
                            </Box>
                        )}
                        <Box sx={{ padding: 16 }}>
                            {loading && <CircularProgress />}
                            {error && <Typography variant="h6" component="div">{error.message}</Typography>}
                            {debouncedInput !== "" && data && (
                                <Box>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Item>
                                                <Typography variant="h3" component="div">{data.name}</Typography>
                                                <img className={img.root} src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt={data.weather[0].icon} />
                                            </Item>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Item>
                                                <FormattedMessage id="current_weather_search_weather" values={{ value: data.weather[0].description }} />
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item>
                                                <FormattedMessage id="current_weather_search_temp" values={{ value: data.main.temp }} />&deg;C
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item>
                                                <FormattedMessage id="current_weather_search_temp_feels_like" values={{ value: data.main.feels_like }} />&deg;C
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item>
                                                <FormattedMessage id="current_weather_search_temp_min" values={{ value: data.main.temp_min }} />&deg;C&nbsp;
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item>
                                                <FormattedMessage id="current_weather_search_temp_max" values={{ value: data.main.temp_max }} />&deg;C
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item>
                                                <FormattedMessage id="current_weather_search_pressure" values={{ value: data.main.pressure }} />mb&nbsp;
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item>
                                                <FormattedMessage id="current_weather_search_humidity" values={{ value: data.main.humidity }} />%
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item>
                                                <FormattedMessage id="current_weather_search_wind_speed" values={{ value: data.wind.speed }} />km/h&nbsp;
                                            </Item>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Item>
                                                <FormattedMessage id="current_weather_search_wind_degrees" values={{ value: convertDegreesToCardinalDir(data.wind.deg) }} />
                                            </Item>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ marginTop: 16 }}>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item xs={2}>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        refresh();
                                                    }}
                                                ><ReplayIcon /></Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        setInput("");
                                                        setDebouncedInput("");
                                                    }}
                                                ><DeleteForeverIcon /></Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
};

export default CurrentWeatherSearch;
