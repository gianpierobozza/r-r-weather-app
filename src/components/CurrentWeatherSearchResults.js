import React from "react";
import { useIntl, FormattedMessage } from "react-intl";

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Button,
	ButtonGroup,
	Grid,
	Paper,
	Tooltip,
	Typography
} from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReplayIcon from '@material-ui/icons/Replay';

const ItemPaper = styled(Paper)(({ theme }) => ({
	fontSize: 16,
	padding: theme.spacing(1),
	textAlign: "center",
}));

const Item = styled(Box)(({ theme }) => ({
	fontSize: 16,
	padding: theme.spacing(1),
	textAlign: "center",
}));

function convertDegreesToCardinalDir(deg) {
	const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
	var degrees = deg * 16 / 360;
	degrees = Math.round(degrees, 0);
	degrees = (degrees + 16) % 16;
	return directions[degrees];
}

function round(value, precision) {
	var multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}

const mainIcon = makeStyles({
	root: {
		border: 0,
		borderRadius: 3,
		margin: 8,
		width: 48,
		height: 48
	},
});

const weatherIcon = makeStyles({
	root: {
		border: 0,
		borderRadius: 3,
		margin: 4,
		width: 32,
		height: 32
	},
});

const CurrentWeatherSearchResults = (props) => {
	const intl = useIntl();
	const mainImg = mainIcon();
	const weatherImg = weatherIcon();
	var data = props.data;

	return (
		<Box>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<ItemPaper>
						<Typography variant="h3" component="div">{data?.name}</Typography>
						<Tooltip title={data?.weather[0]?.description} placement="bottom">
							<img onContextMenu={(e) => e.preventDefault()} className={mainImg.root} src={process.env.PUBLIC_URL + data?.weather[0]?.icon + ".png"} alt={data?.weather[0]?.icon} />
						</Tooltip>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<ButtonGroup variant="contained" aria-label="outlined primary button group">
									<Button
										variant="contained"
										onClick={props.handleCurrentWeatherRefreshClick}
									>
										<ReplayIcon />
									</Button>
									<Button
										variant="contained"
										onClick={props.handleClearWeatherClick}
									>
										<ClearIcon />
									</Button>
								</ButtonGroup>
							</Grid>
						</Grid>
					</ItemPaper>
				</Grid>
				<Grid item xs={12}>
					<ItemPaper>
						<FormattedMessage tagName="strong" id="current_weather_search_weather" values={{ value: data?.weather[0]?.description }} />
					</ItemPaper>
				</Grid>
				<Grid item xs={3}>
					<Item>
						<Tooltip title={intl.formatMessage({ id: "current_weather_search_temp" })} placement="top">
							<img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "thermometer.png"} alt="thermometer" />
						</Tooltip>
						<Typography component="div">{round(data?.main?.temp, 1)}&deg;C</Typography>
					</Item>
				</Grid>
				<Grid item xs={3}>
					<Item>
						<Tooltip title={intl.formatMessage({ id: "current_weather_search_temp_feels_like" })} placement="top">
							<img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "thermometer_feels_like.png"} alt="thermometer" />
						</Tooltip>
						<Typography component="div">{round(data?.main?.feels_like, 1)}&deg;C</Typography>
					</Item>
				</Grid>
				<Grid item xs={3}>
					<Item>
						<Tooltip title={intl.formatMessage({ id: "current_weather_search_temp_min" })} placement="top">
							<img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "thermometer_min.png"} alt="thermometer_min" />
						</Tooltip>
						<Typography component="div">{round(data?.main?.temp_min, 1)}&deg;C</Typography>
					</Item>
				</Grid>
				<Grid item xs={3}>
					<Item>
						<Tooltip title={intl.formatMessage({ id: "current_weather_search_temp_max" })} placement="top">
							<img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "thermometer_max.png"} alt="thermometer_max" />
						</Tooltip>
						<Typography component="div">{round(data?.main?.temp_max, 1)}&deg;C</Typography>
					</Item>
				</Grid>
				<Grid item xs={3}>
					<Item>
						<Tooltip title={intl.formatMessage({ id: "current_weather_search_pressure" })} placement="top">
							<img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "pressure.png"} alt="pressure" />
						</Tooltip>
						<Typography component="div">{round(data?.main?.pressure)}mb</Typography>
					</Item>
				</Grid>
				<Grid item xs={3}>
					<Item>
						<Tooltip title={intl.formatMessage({ id: "current_weather_search_humidity" })} placement="top">
							<img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "humidity.png"} alt="humidity" />
						</Tooltip>
						<Typography component="div">{round(data?.main?.humidity)}%</Typography>
					</Item>
				</Grid>
				<Grid item xs={3}>
					<Item>
						<Tooltip title={intl.formatMessage({ id: "current_weather_search_wind_speed" })} placement="top">
							<img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "wind_speed.png"} alt="wind_speed" />
						</Tooltip>
						<Typography component="div">{round(data?.wind?.speed, 1)}km/h</Typography>
					</Item>
				</Grid>
				<Grid item xs={3}>
					<Item>
						<Tooltip title={intl.formatMessage({ id: "current_weather_search_wind_degrees" })} placement="top">
							<img onContextMenu={(e) => e.preventDefault()} className={weatherImg.root} src={process.env.PUBLIC_URL + "wind_degrees.png"} alt="wind_degrees" />
						</Tooltip>
						<Typography component="div">{convertDegreesToCardinalDir(data?.wind?.deg)}</Typography>
					</Item>
				</Grid>
			</Grid>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="seven-days-forecasts-content"
					id="seven-days-forecasts-header"
				>
					<Typography><FormattedMessage id={"seven_days_forecasts_accordion_title"} /></Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						WIP
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	)
};

export default CurrentWeatherSearchResults;
