import React, { useState, Fragment } from "react";
import { useIntl, FormattedDate, FormattedDateParts, FormattedMessage } from "react-intl";
import useFetchDays16Forecast from "../../hooks/UseFetchDays16Forecast";

import {
    Backdrop,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Modal,
    Tooltip,
    Typography
} from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";
import ClearIcon from '@material-ui/icons/Clear';

const Item = styled(Box)(({ theme }) => ({
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

const weatherTextStyle = makeStyles({
    root: {
        fontSize: 14
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

function convertDegreesToCardinalDir(deg) {
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    var degrees = deg * 16 / 360;
    degrees = Math.round(degrees, 0);
    degrees = (degrees + 16) % 16;
    return directions[degrees];
}

const detailsModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
    maxWidth: 700,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
};

const Days16ForecastResults = (props) => {
    const intl = useIntl();
    const input = props.input;
    const forecastDays = 8;
    const weatherImg = weatherIcon();
    const weatherText = weatherTextStyle();
    const month = monthContainer();
    const day = dayContainer();
    const { data, loading, error } = useFetchDays16Forecast({ input, forecastDays });
    const [openModalDetails, setOpenModalDetails] = useState({
        open: false,
        modalIndex: null
    });
    const handleOpenModalDetails = (index) => setOpenModalDetails({ open: true, modalIndex: index });
    const handleCloseModalDetails = () => setOpenModalDetails({ open: false });

    return (
        <Fragment>
            {!error && !loading && (
                <Fragment>
                    <Grid container justifyContent="center" spacing={1}>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Typography>
                                    <FormattedMessage tagName="strong" id="days_16_forecasts_accordion_cards_heading" />
                                </Typography>
                            </Box>
                        </Grid>
                        {data?.list?.slice(1).map((list, index) => (
                            <Grid item xs key={list.sunrise + "-card"}>
                                <Card>
                                    <CardActionArea onClick={() => handleOpenModalDetails(index)}>
                                        <CardContent style={{ fontSize: 16, textAlign: "center" }}>
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
                                                <Tooltip title={intl.formatMessage({ id: "current_weather_search_temp_max_min" })} placement="top">
                                                    <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "thermometer_max_min.png"} alt="thermometer_max_min" />
                                                </Tooltip>
                                                <Typography component="div">{round(list.temp.max, 1)} &deg;C</Typography>
                                                <Typography component="div">{round(list.temp.min, 1)} &deg;C</Typography>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </Grid>
                        ))}
                    </Grid>
                    <Modal
                        aria-labelledby="details-modal-title"
                        aria-describedby="details-modal-description"
                        open={openModalDetails.open}
                        onClose={() => handleCloseModalDetails()}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                    >
                        <Box sx={detailsModalStyle}>
                            <Grid container id="transition-modal-description" spacing={1}>
                                <Grid item xs={10}>
                                    <Typography id="transition-modal-title" variant="h6">
                                        {data?.city?.name} - <FormattedDate
                                            value={new Date(parseInt(data?.list[openModalDetails.modalIndex + 1]?.dt + "000"))}
                                            year="numeric"
                                            month="long"
                                            day="2-digit"
                                        />
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Grid container id="transition-modal-description" justifyContent="flex-end" spacing={1}>
                                        <Grid>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => handleCloseModalDetails()}
                                            >
                                                <ClearIcon size="small" />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container id="transition-modal-description" alignItems="center" justifyContent="center" spacing={1}>
                                <Grid item xs={4}>
                                    <Item>
                                        <Tooltip title={data?.list[openModalDetails.modalIndex + 1]?.weather[0]?.description} placement="bottom">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + data?.list[openModalDetails.modalIndex + 1]?.weather[0]?.icon + ".png"} alt={data?.list[openModalDetails.modalIndex + 1]?.weather[0]?.icon} />
                                        </Tooltip>
                                    </Item>
                                </Grid>
                                <Grid item xs={8}>
                                    <Item>
                                        <FormattedMessage id="current_weather_search_weather" values={{ value: data?.list[openModalDetails.modalIndex + 1]?.weather[0]?.description }} />
                                    </Item>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <Typography>
                                            <FormattedMessage tagName="strong" id="days_16_forecasts_details_temperatures" />
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Item>
                                        <Tooltip title={intl.formatMessage({ id: "current_weather_search_temp_day" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "thermometer_day.png"} alt="thermometer_day" />
                                        </Tooltip>
                                        <Typography className={weatherText.root} component="div">{round(data?.list[openModalDetails.modalIndex + 1]?.temp?.day, 1)} &deg;C</Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={3}>
                                    <Item>
                                        <Tooltip title={intl.formatMessage({ id: "current_weather_search_temp_night" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "thermometer_night.png"} alt="thermometer_night" />
                                        </Tooltip>
                                        <Typography className={weatherText.root} component="div">{round(data?.list[openModalDetails.modalIndex + 1]?.temp?.night, 1)} &deg;C</Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={3}>
                                    <Item>
                                        <Tooltip title={intl.formatMessage({ id: "current_weather_search_temp_max" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "thermometer_max.png"} alt="thermometer_max" />
                                        </Tooltip>
                                        <Typography className={weatherText.root} component="div">{round(data?.list[openModalDetails.modalIndex + 1]?.temp?.max, 1)} &deg;C</Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={3}>
                                    <Item>
                                        <Tooltip title={intl.formatMessage({ id: "current_weather_search_temp_min" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "thermometer_min.png"} alt="thermometer_min" />
                                        </Tooltip>
                                        <Typography className={weatherText.root} component="div">{round(data?.list[openModalDetails.modalIndex + 1]?.temp?.min, 1)} &deg;C</Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <Typography>
                                            <FormattedMessage tagName="strong" id="days_16_forecasts_details_misc" />
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>
                                        <Tooltip title={intl.formatMessage({ id: "days_16_forecasts_details_weather_sunrise" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "sunrise.png"} alt="sunrise" />
                                        </Tooltip>
                                        {data && openModalDetails.modalIndex + 1 && (
                                            <Typography className={weatherText.root} component="div">{intl.formatTime(new Date(parseInt(data?.list[openModalDetails.modalIndex + 1]?.sunrise + "000")))}</Typography>
                                        )}
                                    </Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>
                                        <Tooltip title={intl.formatMessage({ id: "days_16_forecasts_details_weather_sunset" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "sunset.png"} alt="sunset" />
                                        </Tooltip>
                                        {data && openModalDetails.modalIndex + 1 && (
                                            <Typography className={weatherText.root} component="div">{intl.formatTime(new Date(parseInt(data?.list[openModalDetails.modalIndex + 1]?.sunset + "000")))}</Typography>
                                        )}
                                    </Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>
                                        <Tooltip title={intl.formatMessage({ id: "current_weather_search_pressure" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "pressure.png"} alt="pressure" />
                                        </Tooltip>
                                        {data && openModalDetails.modalIndex + 1 && (
                                            <Typography className={weatherText.root} component="div">{round(data?.list[openModalDetails.modalIndex + 1]?.pressure)} mb</Typography>
                                        )}
                                    </Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>
                                        <Tooltip title={intl.formatMessage({ id: "current_weather_search_humidity" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "humidity.png"} alt="humidity" />
                                        </Tooltip>
                                        {data && openModalDetails.modalIndex + 1 && (
                                            <Typography className={weatherText.root} component="div">{round(data?.list[openModalDetails.modalIndex + 1]?.humidity)}%</Typography>
                                        )}
                                    </Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>
                                        <Tooltip title={intl.formatMessage({ id: "current_weather_search_wind_speed" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "wind_speed.png"} alt="wind_speed" />
                                        </Tooltip>
                                        {data && openModalDetails.modalIndex + 1 && (
                                            <Typography className={weatherText.root} component="div">{round(data?.list[openModalDetails.modalIndex + 1]?.speed, 1)} km/h</Typography>
                                        )}
                                    </Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>
                                        <Tooltip title={intl.formatMessage({ id: "current_weather_search_wind_degrees" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "wind_degrees.png"} alt="wind_degrees" />
                                        </Tooltip>
                                        {data && openModalDetails.modalIndex + 1 && (
                                            <Typography className={weatherText.root} component="div">{convertDegreesToCardinalDir(data?.list[openModalDetails.modalIndex + 1]?.deg)}</Typography>
                                        )}
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </Fragment >
            )}
        </Fragment >
    )
}

export default Days16ForecastResults;
