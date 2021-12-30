import React, { createContext } from "react";
import myWeatherGlobalsStore from "../redux/store"; import { LOCALES } from "../i18n/locales.js";

function getLocale() {
	const savedLocale = localStorage.getItem("locale");
	return savedLocale || LOCALES.ENGLISH;
}

export const APIContext = createContext();

const APIContextProvider = (props) => {
	const locale = getLocale().split(/[-_]/)[0];
	const openWeatherApiKey = myWeatherGlobalsStore.getState()["openWeatherApiKey"];
	const openCageApiKey = myWeatherGlobalsStore.getState()["openCageApiKey"];

	const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=%city&appid=" + openWeatherApiKey + "&units=metric&lang=" + locale;
	const hourlyForecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=%lat&lon=%lon&exclude=current,minutely,daily,alerts&appid=" + openWeatherApiKey + "&units=metric&lang=" + locale;
	const days16ForecastUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=%city&cnt=%days&appid=" + openWeatherApiKey + "&units=metric&lang=" + locale;
	const openCageForwardGeoLocUrl = "https://api.opencagedata.com/geocode/v1/json?q=%city&key=" + openCageApiKey + "&pretty=1&no_annotations=1&language=" + locale;

	// DEV OVERRIDES
	//const currentWeatherUrl = "https://localhost.com/%city"; // uncomment in case don't want to risk multiple calls to api, blocks because of throttling
	//const hourlyForecastUrl = "https://localhost.com/%lat%lon;" // uncomment in case don't want to risk multiple calls to api, blocks because of throttling
	//const days16ForecastUrl = "https://localhost.com/%city%days"; // uncomment in case don't want to risk multiple calls to api, blocks because of throttling
	//const openCageForwardGeolocUrl = "https://localhost.com?q=%city"; // uncomment in case don't want to risk multiple calls to api, blocks because of throttling

	return (
		<APIContext.Provider
			value={{ currentWeatherUrl, hourlyForecastUrl, days16ForecastUrl, openCageForwardGeoLocUrl }}>
			{props.children}
		</APIContext.Provider>
	)
}

export default APIContextProvider;
