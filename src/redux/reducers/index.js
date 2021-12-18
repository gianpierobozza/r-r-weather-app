import { ADD_OPENWEATHER_APIKEY } from "../constants/action-types";

const initialState = {
	openWeatherApiKey: ""
};

function rootReducer(state = initialState, action) {
	if (action.type === ADD_OPENWEATHER_APIKEY) {
		return Object.assign({}, state, {
			openWeatherApiKey: state.openWeatherApiKey.concat(action.payload)
		});
	}
	return state;
};

export default rootReducer;
