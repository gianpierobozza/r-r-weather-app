import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import debounce from "lodash/debounce";
import CurrentWeatherSearchResults from "./CurrentWeatherSearchResults";
import useFetchCurrentWeather from "../../hooks/UseFetchCurrentWeather";
import ShowWithAnimation from "../../hooks/ShowWithAnimation";

import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";

var debounceLoading = false;
var refreshing = false;

const CurrentWeatherSearch = () => {
    const intl = useIntl();
    const [input, setInput] = useState("");
    const [debouncedInput, setDebouncedInput] = useState("");
    const [resultIsMounted, setResultIsMounted] = useState(false);
    const { data, loading, error, refresh } = useFetchCurrentWeather({ debouncedInput, setDebouncedInput });

    const debouncedCurrentWeatherFetch = useCallback(
        debounce((debouncedSearch) => {
            setResultIsMounted(!resultIsMounted);
            setDebouncedInput(debouncedSearch);
            debounceLoading = false;
        }, 1000), []
    );

    const debouncedCurrentWeatherRefresh = useCallback(
        debounce((input) => {
            setResultIsMounted(!resultIsMounted);
            refresh(input);
            setDebouncedInput(input);
            refreshing = false;
            debounceLoading = false;
        }, 1000), []
    );

    const handleCurrentWeatherOnChange = (e) => {
        e.preventDefault();
        debounceLoading = true;
        setInput(e.currentTarget.value);
        debouncedCurrentWeatherFetch(e.currentTarget.value);
    };

    const handleCurrentWeatherRefreshClick = (e) => {
        e.preventDefault();
        setResultIsMounted(false);
        refreshing = true;
        debounceLoading = true;
        debouncedCurrentWeatherRefresh(debouncedInput);
    }

    const handleClearWeatherClick = (e) => {
        e.preventDefault();
        setResultIsMounted(false);
        setInput("");
        setDebouncedInput("");
    }

    return (
        <Box sx={{ margin: 16 }}>
            <Card>
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
                        {!error && !loading && !debounceLoading && (
                            <ShowWithAnimation isMounted={resultIsMounted}>
                                <CurrentWeatherSearchResults
                                    data={data?.weather}
                                    geoloc={data?.geoloc}
                                    handleCurrentWeatherRefreshClick={handleCurrentWeatherRefreshClick}
                                    handleClearWeatherClick={handleClearWeatherClick}
                                    setInput={setInput}
                                    setDebouncedInput={setDebouncedInput}
                                    input={input}
                                />
                            </ShowWithAnimation>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
};

export default CurrentWeatherSearch;
