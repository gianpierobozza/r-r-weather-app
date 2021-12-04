import {Button, TextField} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Header from './NavBar.js';

function App() {
  var getApiKey = () => {
    if (process.env.NODE_ENV === "development") {
      return process.env.REACT_APP_OPENWEATHER_TEST_API_KEY;
    } else if (process.env.NODE_ENV === "production") {
      return process.env.OPENWEATHER_PROD_API_KEY;
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
