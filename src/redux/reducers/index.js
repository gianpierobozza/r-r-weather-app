import { ADD_OPENWEATHER_APIKEY, ADD_OPENCAGE_APIKEY } from "../constants/action-types";

const initialState = {
	openWeatherApiKey: "",
	openCageApiKey: ""
};

function rootReducer(state = initialState, action) {
	if (action.type === ADD_OPENWEATHER_APIKEY) {
		return Object.assign({}, state, {
			openWeatherApiKey: state.openWeatherApiKey.concat(action.payload)
		});
	}
	if (action.type === ADD_OPENCAGE_APIKEY) {
		return Object.assign({}, state, {
			openCageApiKey: state.openCageApiKey.concat(action.payload)
		});
	}
	return state;
};

export default rootReducer;
