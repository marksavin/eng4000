import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
//import styles
import "./Styles/app.scss";
//import components
import Navigation from "./Components/NavBar/NavBar.js";
import Login from "./Components/Login/Login.js";
import NursePage from "./Components/Nurse/NursePage.js";
import ProtectedRoute from "./Components/Routes/ProtectedRoute.js";
import ProtectedLogin from "./Components/Routes/ProtectedLogin.js";
import Physician from "./Components/Physician/PhysicianDashboard.js";
import Admin from "./Components/Admin/Admin.js";

function App() {
  const [search, setSearch] = useState("");
  const [accountType, setAccountType] = useState("");
  const [authenticate, setAuthenticate] = useState(false);

  const readLoginCookie = () => {
    const token = Cookies.get("token");
    if (token) {
      setAuthenticate(true);
      setAccountType(token);
    } else {
      setAuthenticate(false);
    }
  };

  useEffect(() => {
    readLoginCookie();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <ProtectedRoute path="/nurse" authenticate={authenticate}>
            <Navigation search={search} setSearch={setSearch} />
            <NursePage search={search} />
          </ProtectedRoute> */}
          <ProtectedRoute
            path="/nurse"
            component={NursePage}
            search={search}
            setSearch={setSearch}
            authenticate={authenticate}
            setAuthenticate={setAuthenticate}
          />
          <ProtectedRoute
            path="/physican"
            component={Physician}
            search={search}
            setSearch={setSearch}
            authenticate={authenticate}
            setAuthenticate={setAuthenticate}
          />

          <ProtectedRoute
            path="/admin"
            component={Admin}
            search={search}
            setSearch={setSearch}
            authenticate={authenticate}
            setAuthenticate={setAuthenticate}
          >
            <Navigation serach={search} setSearch={setSearch} />
            <Admin
              pname="Dr. Geneva"
              specialty="Neurology"
              availability="Away on vacation"
            />
          </ProtectedRoute>

          <ProtectedLogin
            exact
            path="/"
            component={Login}
            authenticate={authenticate}
            setAuthenticate={setAuthenticate}
            accountType={accountType}
            setAccountType={setAccountType}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
