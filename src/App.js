// import React, { useState } from 'react';
import { useAsync } from 'react-async-hook';

// import {Button, TextField} from '@material-ui/core';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Header from './NavBar.js';

import { DataStore } from '@aws-amplify/datastore';
import { OpenWeatherModel } from './models';
import Amplify from "@aws-amplify/core";
import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);

var apiKey;
var getApiKey = async () => {
  console.log("getApiKey");
  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_OPENWEATHER_TEST_API_KEY;
  } else if (process.env.NODE_ENV === "production") {
    const openWeatherModel = await DataStore.query(OpenWeatherModel);
    if (openWeatherModel.length > 0) {
      return openWeatherModel[0]["OPENWEATHER_PROD_API_KEY"];
    } else { return ""; }
  } else { return ""; }
};

getApiKey().then(
  (value) => {
    console.log("getApiKey().then " + value);
    apiKey = value;
  }
);

const fetchWeather = async (
  apiKey,
  abortSignal
) => {
  const result = await fetch("http://api.openweathermap.org/data/2.5/weather?q=Opava&appid="+apiKey+"&units=metric", {
    signal: abortSignal,
  });
  if (result.status !== 200) {
    throw new Error('bad status = ' + result.status);
  }
  //console.log(result);
  return result.json();
};

const WeatherOpava = () => {
  const asyncWeather = useAsync(fetchWeather, [apiKey]);
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
            <img src={`http://openweathermap.org/img/wn/${asyncWeather.result.weather[0].icon}.png`} />
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return(
    <WeatherOpava />
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
