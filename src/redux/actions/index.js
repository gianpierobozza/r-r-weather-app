import { ADD_OPENWEATHER_APIKEY } from "../constants/action-types";

export function addOpenWeatherApiKey(payload) {
	return { type: ADD_OPENWEATHER_APIKEY, payload }
};
