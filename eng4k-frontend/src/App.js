import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import styles
import "./Styles/app.scss";
//import components
import Navigation from "./Components/NavBar/NavBar.js";
import Login from "./Components/Login/Login.js";
import NursePage from "./Components/Nurse/NursePage.js";
import CreatePatient from "./Components/CreatePatient/CreatePatient";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/nurse">
            <Navigation />
            <NursePage />
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
