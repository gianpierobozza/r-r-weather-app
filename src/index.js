import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

import myWeatherGlobalsStore from "./redux/store";
import { addOpenWeatherApiKey } from "./redux/actions";

var openWeatherApiKey;
if (process.env.NODE_ENV === "development") {
	openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_TEST_API_KEY;
} else if (process.env.NODE_ENV === "production") {
	openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_PROD_API_KEY;
}

myWeatherGlobalsStore.dispatch(addOpenWeatherApiKey(openWeatherApiKey));

ReactDOM.render(
	<App />,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
