
import SignUp from './Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Weather_container from './Weather_container';
import Signin from './Signin';
import Preferences from './Preferences';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = '/home'  element = {<Weather_container/>} />
        <Route path = '/Signup' element = {<SignUp/>} />
        <Route path = '/Signin' element = {<Signin/>} />
        <Route path = '/Preferences' element = {<Preferences/>} />
      </Routes>
    </Router>
  );
}

export default App;
