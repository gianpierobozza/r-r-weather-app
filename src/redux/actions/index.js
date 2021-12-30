import { ADD_OPENWEATHER_APIKEY, ADD_OPENCAGE_APIKEY } from "../constants/action-types";

export function addOpenWeatherApiKey(payload) {
	return { type: ADD_OPENWEATHER_APIKEY, payload }
};

export function addOpenCageApiKey(payload) {
	return { type: ADD_OPENCAGE_APIKEY, payload }
};