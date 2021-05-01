import './App.css';
import React from "react"
import Home from './Home/Home';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import LandingPage from './LandingPage/LandingPage';
import Enrollment from './Enrollment/Enrollment';
import HospitalSearch from './Search/Hospital-Search';
import HospitalDetails from './HospitalDetails/HospitalMenu'
import InvalidPage from './NotFound/404'
import HospitalLogin from './Login/Hospital-Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/enroll" exact  >
            <Home page={<Enrollment />} title="Hospital Enrollment"/>
          </Route>
          <Route path="/hospitalDetails" exact >
          
          <HospitalDetails />
          </Route>
          <Route path="/hospitalLogin" exact>
            <Home page={<HospitalLogin />} title="Hospital Login"/>
          </Route>
          <Route path="/hospitalSearch" exact>
          <HospitalSearch />
          </Route>
          <Route path="/home" exact>
            <Home page={<LandingPage />} title="Crisis Management"/>
          </Route>
          <Route path="/" exact >
            <Home page={<LandingPage />} title="Crisis Management"/>
          </Route>
          <Route >
            <Home page={<InvalidPage />}/>
          </Route>

        </Switch>
      </Router>

    </div>
  );
}
export default App;
