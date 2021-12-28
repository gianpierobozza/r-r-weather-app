import React, { createContext } from "react";
import myWeatherGlobalsStore from "../redux/store"; import { LOCALES } from "../i18n/locales.js";

function getLocale() {
	const savedLocale = localStorage.getItem("locale");
	return savedLocale || LOCALES.ENGLISH;
}

export const APIContext = createContext();

const APIContextProvider = (props) => {
	const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=%city&appid=" + myWeatherGlobalsStore.getState()["openWeatherApiKey"] + "&units=metric&lang=" + getLocale().split(/[-_]/)[0];
	const days16ForecastUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=%city&cnt=%days&appid=" + myWeatherGlobalsStore.getState()["openWeatherApiKey"] + "&units=metric&lang=" + getLocale().split(/[-_]/)[0];
	//const currentWeatherUrl = "localhost.com/%city"; // uncomment in case don't want to risk multiple calls to api, blocks because of throttling
	//const days16ForecastUrl = "localhost.com/%city%days"; // uncomment in case don't want to risk multiple calls to api, blocks because of throttling

	return (
		<APIContext.Provider
			value={{ currentWeatherUrl, days16ForecastUrl }}>
			{props.children}
		</APIContext.Provider>
	)
}

export default APIContextProvider;
