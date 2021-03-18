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
// import "./Components/firebase/firebase.js";

function App() {
  const [search, setSearch] = useState("");
  const [accountType, setAccountType] = useState("");
  const [authenticate, setAuthenticate] = useState(false);
  const [userToken, setUserToken] = useState("");

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
          setAccountType(result.path);
          setAuthenticate(true);
          setUserToken(result.user);
        } else {
          setAuthenticate(false);
          setAccountType("/");
          setUserToken("");
        }
      });
  }, [accountType, authenticate]);

  const themes = createMuiTheme({
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
              userToken={userToken}
            />
            <ProtectedRoute
              path="/physician"
              component={Physician}
              search={search}
              setSearch={setSearch}
              authenticate={authenticate}
              setAuthenticate={setAuthenticate}
              accountType={accountType}
              userToken={userToken}
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
              setUserToken={setUserToken}
            />
          </Switch>
        ) : (
          <div className={classes.root}>
            <MuiThemeProvider theme={themes}>
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
