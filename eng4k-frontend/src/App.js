import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import styles
import './Styles/app.scss';
//import components
import Navigation from './Components/NavBar/NavBar.js';
import Login from './Components/Login/Login.js';
import NursePage from './Components/Nurse/NursePage.js';
import CreatePatient from './Components/CreatePatient/CreatePatient';
import PhysicianDashBoard from './Components/Physician/PhysicianDashboard';

function App() {
  const [search, setSearch] = useState('');

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/nurse">
            <Navigation serach={search} setSearch={setSearch} />
            <NursePage search={search} />
          </Route>
          <Route path="/physicianDash">
           {/* <PhysicianPage search={search} /> */}
           <Navigation serach={search} setSearch={setSearch} />
           <PhysicianDashBoard />
          </Route>

          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
