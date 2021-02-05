import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import styles
import "./Styles/app.scss";
//import components
import Navigation from "./Components/NavBar/NavBar.js";
import Login from "./Components/Login/Login.js";
import NursePage from "./Components/Nurse/NursePage.js";
import CreatePatient from "./Components/CreatePatient/CreatePatient";
import SbarHistory from "./Components/Nurse/SbarHistory";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/nurse">
            <Navigation serach={search} setSearch={setSearch} />
            <NursePage search={search} />
          </Route>

          <Route path="/">
            <Login />
          </Route>

          <Route path="/history">
            <SbarHistory />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
