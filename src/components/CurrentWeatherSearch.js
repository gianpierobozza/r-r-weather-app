import React, { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import { useIntl, FormattedMessage } from "react-intl";
import useFetchCurrentWeather from "../hooks/UseFetchCurrentWeather";

import {
    Box,
    Button,
    ButtonGroup,
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
import ClearIcon from '@material-ui/icons/Clear';

var debounceLoading = false;
var refreshing = false;

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

    const debouncedCurrentWeatherFetch = useCallback(
        debounce((debouncedSearch) => {
            setDebouncedInput(debouncedSearch);
            debounceLoading = false;
        }, 1000), []
    );

    const handleCurrentWeatherOnChange = (e) => {
        e.preventDefault();
        debounceLoading = true;
        setInput(e.currentTarget.value);
        debouncedCurrentWeatherFetch(e.currentTarget.value);
    };

    const debouncedCurrentWeatherRefresh = useCallback(
        debounce((input) => {
            refresh(input);
            setDebouncedInput(input);
            refreshing = false;
            debounceLoading = false;
        }, 1000), []
    );

    const handleCurrentWeatherRefreshClick = (e) => {
        e.preventDefault();
        refreshing = true;
        debounceLoading = true;
        setDebouncedInput("");
        debouncedCurrentWeatherRefresh(debouncedInput);
    }

    const img = useStyles();

    return (
        <Box sx={{ margin: 16 }}>
            <Container maxWidth="md">
                <Card sx={{ minWidth: 400 }}>
                    <CardContent>
                        {(data === null || error !== null || debouncedInput === "") && !refreshing && (
                            <Box
                                component="form"
                                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="search-city"
                                    value={input}
                                    onChange={handleCurrentWeatherOnChange}
                                    variant="standard"
                                    margin="dense"
                                    label={intl.formatMessage({ id: "city_search_placeholder" })}
                                />
                            </Box>
                        )}
                        <Box sx={{ padding: 16 }}>
                            {(loading || debounceLoading) && (
                                <Box sx={{ margin: 16 }}>
                                    <Grid container justifyContent="center">
                                        <CircularProgress />
                                    </Grid>
                                </Box>
                            )}
                            {(error && !debounceLoading) && (
                                <Box sx={{ margin: 16, padding: 4 }}>
                                    <Grid container justifyContent="center">
                                        <Typography variant="h5" component="div">{error.message}</Typography>
                                    </Grid>
                                </Box>
                            )}
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
                                            <Grid item md={4}>
                                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleCurrentWeatherRefreshClick}
                                                    >
                                                        <ReplayIcon />
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => {
                                                            setInput("");
                                                            setDebouncedInput("");
                                                        }}
                                                    >
                                                        <ClearIcon />
                                                    </Button>
                                                </ButtonGroup>
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
