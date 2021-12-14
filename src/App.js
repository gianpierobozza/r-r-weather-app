import { useAsync } from 'react-async-hook';

// import {Button, TextField} from '@material-ui/core';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Header from './NavBar.js';

const fetchWeather = async (
  apiKey,
  abortSignal
) => {
  const result = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Opava&appid="+apiKey+"&units=metric", {
    signal: abortSignal,
  });
  if (result.status !== 200) {
    throw new Error('bad status = ' + result.status);
  }
  //console.log(result);
  return result.json();
};

const WeatherOpava = (apiKey) => {
  console.log(apiKey['apiKey'])
  const asyncWeather = useAsync(fetchWeather, [apiKey['apiKey']]);
  return (
    <div>
      {asyncWeather.loading && <div>Loading</div>}
      {asyncWeather.error && <div>Error: {asyncWeather.error.message}</div>}
      {asyncWeather.result && (
        <div>
          <div>Success!</div>
          <div>Name: {asyncWeather.result.name}</div>
          <div>Temp: {asyncWeather.result.main.temp} C</div>
          <div>
            Actual: {asyncWeather.result.weather[0].description}
            <img src={`https://openweathermap.org/img/wn/${asyncWeather.result.weather[0].icon}.png`} alt={asyncWeather.result.weather[0].icon} />
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  var apiKey = null;
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === "development") {
    apiKey = process.env.REACT_APP_OPENWEATHER_TEST_API_KEY;
  } else if (process.env.NODE_ENV === "production") {
    apiKey = process.env.OPENWEATHER_PROD_API_KEY;
  }

  return(
    <WeatherOpava apiKey={apiKey} />
  );

  // return (
  //   <div className="App">
  //   <br/>
  //      <Header/>
  //     <Button color="primary" variant="contained">Press me</Button> 
  //     <br/><br/>
  //     <TextField id="outlined-basic" label="Name" variant="outlined" />
  //     <br/><br/>
  //     <AccountCircle/>
  //   </div>
  // );
}

export default App;
