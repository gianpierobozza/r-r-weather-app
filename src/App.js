import {Button, TextField} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Header from './NavBar.js';
import { DataStore } from '@aws-amplify/datastore';
import { OpenWeatherModel } from './models';

function App() {
  var getApiKey = () => {
    if (process.env.NODE_ENV === "development") {
      console.log("it's development - " + process.env.NODE_ENV);
      return process.env.REACT_APP_OPENWEATHER_TEST_API_KEY;
    } else if (process.env.NODE_ENV === "production") {
      console.log("it's production - get from db");
      const models = await DataStore.query(OpenWeatherModel);
      console.log(models);
    } else {
      console.log("what is it? - " + process.env.NODE_ENV);
    }
  }
  console.log(getApiKey());

  return (
    <div className="App">
    <br/>
       <Header/>
      <Button color="primary" variant="contained">Press me</Button> 
      <br/><br/>
      <TextField id="outlined-basic" label="Name" variant="outlined" />
      <br/><br/>
      <AccountCircle/>
    </div>
  );
}

export default App;
