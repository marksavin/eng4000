import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import Cookies from "js-cookie";

import {
  Button,
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
  CircularProgress,
} from "@material-ui/core/";

//import styles
import "./Styles/app.scss";
//import components
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

  console.log(accountType);
  console.log(authenticate);

  useEffect(() => {
    fetch("/isAuthenticated")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad");
        }
      })
      .then((result) => {
        if (result !== "") {
          setAccountType(result);
          setAuthenticate(true);
        } else {
          setAuthenticate(false);
          setAccountType("/");
        }
      });
  }, [accountType, authenticate]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#5bc8c2",
        main: "#33bbb3",
        dark: "#23827d",
      },
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className="App">
      <Router>
        {accountType !== "" ? (
          <Switch>
            <ProtectedRoute
              path="/nurse"
              component={NursePage}
              search={search}
              setSearch={setSearch}
              authenticate={authenticate}
              setAuthenticate={setAuthenticate}
              accountType={accountType}
            />
            <ProtectedRoute
              path="/physician"
              component={Physician}
              search={search}
              setSearch={setSearch}
              authenticate={authenticate}
              setAuthenticate={setAuthenticate}
              accountType={accountType}
            />
            <ProtectedRoute
              path="/admin"
              component={Admin}
              search={search}
              setSearch={setSearch}
              authenticate={authenticate}
              setAuthenticate={setAuthenticate}
              accountType={accountType}
              pname="Dr. Geneva"
              specialty="Neurology"
              availability="Away on vacation"
            />
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
        ) : (
          <div className={classes.root}>
            <MuiThemeProvider theme={theme}>
              <CircularProgress
                style={{ position: "fixed", top: "30%", left: "50%" }}
                size={200}
              />
            </MuiThemeProvider>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
