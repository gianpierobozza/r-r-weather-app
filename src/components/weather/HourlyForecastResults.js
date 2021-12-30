import React, { Fragment } from "react";
import useFetchHourlyForecast from "../../hooks/UseFetchHourlyForecast";

import {
    VictoryAxis,
    VictoryChart,
    VictoryLine,
    VictoryTooltip,
    VictoryVoronoiContainer
} from "victory";

import {
    Box,
    Grid,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const weatherIcon = makeStyles({
    root: {
        margin: 4,
        width: 18,
        height: 18
    },
});

const tooltipBoxStyle = makeStyles({
    root: {
        backgroundColor: "gray",
        border: "1px solid black",
        borderRadius: 4,
        paddingTop: 4
    },
});

const WeatherTooltip = (props) => {
    const weatherImg = weatherIcon();
    const tooltipBox = tooltipBoxStyle();

    return (
        <g style={{ pointerEvents: "none" }}>
            <foreignObject x={props.x - 30} y={props.y - 30} width="40" height="200">
                <Box className={tooltipBox.root}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={0}>
                        <Grid item>
                            <Typography style={{ fontSize: 10 }}>{props.datum.hour}:00</Typography>
                        </Grid>
                        <Grid item>
                            <Typography style={{ fontSize: 10 }}>{props.datum.temp}&deg;C</Typography>
                        </Grid>
                        <Grid item >
                            <img className={weatherImg.root} src={process.env.PUBLIC_URL + props.datum.icon + ".png"} alt={props.datum.icon} />
                        </Grid>
                    </Grid>
                </Box>
            </foreignObject>
        </g >
    )
}

const HourlyForecastResults = (props) => {
    const lat = props.geoloc?.results[0]?.geometry?.lat;
    const lon = props.geoloc?.results[0]?.geometry?.lng;
    const { data, loading, error } = useFetchHourlyForecast({ lat, lon });

    return (
        <Fragment>
            {!error && !loading && (
                <Grid container justifyContent="center" spacing={1}>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            {data && (
                                <VictoryChart
                                    domainPadding={{ y: 10 }}
                                    containerComponent={<VictoryVoronoiContainer voronoiDimension="x" />}
                                >
                                    <VictoryAxis
                                        dependentAxis
                                        label=""
                                    />
                                    <VictoryLine
                                        data={data}
                                        style={{ data: { stroke: "indianred", strokeWidth: 3 } }}
                                        labels={() => ' '}
                                        labelComponent={<VictoryTooltip flyoutComponent={<WeatherTooltip />} />}
                                        x={0}
                                        y="temp"
                                    />
                                </VictoryChart>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Fragment >
    )
}

export default HourlyForecastResults;
