import {Button, TextField} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Header from './NavBar.js';

function App() {
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
