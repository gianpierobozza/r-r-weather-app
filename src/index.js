import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

import myWeatherGlobalsStore from "./redux/store";
import { addOpenWeatherApiKey, addOpenCageApiKey } from "./redux/actions";

var openWeatherApiKey;
var openCageApiKey;
if (process.env.NODE_ENV === "development") {
	openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_TEST_API_KEY;
} else if (process.env.NODE_ENV === "production") {
	openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_PROD_API_KEY;
}
openCageApiKey = process.env.REACT_APP_OPENCAGE_API_KEY;

myWeatherGlobalsStore.dispatch(addOpenWeatherApiKey(openWeatherApiKey));
myWeatherGlobalsStore.dispatch(addOpenCageApiKey(openCageApiKey));

ReactDOM.render(
	<App />,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
