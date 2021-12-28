import React, { useState, Fragment } from "react";
import { useIntl, FormattedDate, FormattedDateParts, FormattedMessage } from "react-intl";
import useFetchDays16Forecast from "../../hooks/UseFetchDays16Forecast";

import {
    Backdrop,
    Box,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Modal,
    Tooltip,
    Typography
} from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";

const Item = styled(Box)(({ theme }) => ({
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

const detailsModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Days16ForecastResults = (props) => {
    const intl = useIntl();
    const input = props.input;
    const forecastDays = 8;
    const weatherImg = weatherIcon();
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
                                                <Typography component="div">{round(list.temp.max, 1)}&deg;C</Typography>
                                                <Typography component="div">{round(list.temp.min, 1)}&deg;C</Typography>
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
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                <FormattedDate
                                    value={new Date(parseInt(data?.list[openModalDetails.modalIndex+1]?.dt + "000"))}
                                    year="numeric"
                                    month="long"
                                    day="2-digit"
                                />
                            </Typography>
                            <Grid container id="transition-modal-description" justifyContent="center" spacing={1}>
                                <Grid item xs={3}>
                                    <Item>
                                        <Tooltip title={intl.formatMessage({ id: "days_16_forecasts_details_weather_sunrise" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "sunrise.png"} alt="sunrise" />
                                        </Tooltip>
                                        {data && openModalDetails.modalIndex+1 && (
                                            <Typography component="div">{intl.formatTime(new Date(parseInt(data?.list[openModalDetails.modalIndex+1]?.sunrise + "000")))}</Typography>
                                        )}
                                    </Item>
                                </Grid>
                                <Grid item xs={3}>
                                    <Item>
                                        <Tooltip title={intl.formatMessage({ id: "days_16_forecasts_details_weather_sunset" })} placement="top">
                                            <img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "sunset.png"} alt="sunset" />
                                        </Tooltip>
                                        {data && openModalDetails.modalIndex+1 && (
                                            <Typography component="div">{intl.formatTime(new Date(parseInt(data?.list[openModalDetails.modalIndex+1]?.sunset + "000")))}</Typography>
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
