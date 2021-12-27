import React from "react";
import { FormattedMessage } from "react-intl";

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Button,
	ButtonGroup,
	Grid,
	Paper,
	Typography
} from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReplayIcon from '@material-ui/icons/Replay';

const Item = styled(Paper)(({ theme }) => ({
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

const useStyles = makeStyles({
	root: {
		backgroundColor: "white",
		border: 0,
		borderRadius: 3,
		margin: 12,
	},
});

const CurrentWeatherSearchResults = (props) => {
	const img = useStyles();
	var data = props.data;

	return (
		<Box>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Item>
						<Typography variant="h3" component="div">{data?.name}</Typography>
						<img className={img.root} src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png`} alt={data?.weather[0]?.icon} />
					</Item>
				</Grid>
				<Grid item xs={12}>
					<Item>
						<FormattedMessage tagName="strong" id="current_weather_search_weather" values={{ value: data?.weather[0]?.description }} />
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						<FormattedMessage id="current_weather_search_temp" values={{ value: data?.main?.temp }} />&deg;C
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						<FormattedMessage id="current_weather_search_temp_feels_like" values={{ value: data?.main?.feels_like }} />&deg;C
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						<FormattedMessage id="current_weather_search_temp_min" values={{ value: data?.main?.temp_min }} />&deg;C&nbsp;
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						<FormattedMessage id="current_weather_search_temp_max" values={{ value: data?.main?.temp_max }} />&deg;C
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						<FormattedMessage id="current_weather_search_pressure" values={{ value: data?.main?.pressure }} />mb&nbsp;
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						<FormattedMessage id="current_weather_search_humidity" values={{ value: data?.main?.humidity }} />%
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						<FormattedMessage id="current_weather_search_wind_speed" values={{ value: data?.wind?.speed }} />km/h&nbsp;
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						<FormattedMessage id="current_weather_search_wind_degrees" values={{ value: convertDegreesToCardinalDir(data?.wind?.deg) }} />
					</Item>
				</Grid>
			</Grid>
			<Box sx={{ marginTop: 16, marginBottom: 16 }}>
				<Grid container justifyContent="flex-end">
					<Grid item md={4}>
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
			</Box>
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
