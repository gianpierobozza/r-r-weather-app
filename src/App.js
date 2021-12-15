// import Header from './NavBar.js';
import CurrentWeatherSearch from './CurrentWeatherSearch';

var apiKey = null;
if (process.env.NODE_ENV === "development") {
	apiKey = process.env.REACT_APP_OPENWEATHER_TEST_API_KEY;
} else if (process.env.NODE_ENV === "production") {
	apiKey = process.env.REACT_APP_OPENWEATHER_PROD_API_KEY;
}

const App = () => {
	return (
		<div className="App">
			<CurrentWeatherSearch apiKey={apiKey} />
		</div>
	);
};

export default App;
