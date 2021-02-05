import React from "react";
import { Switch, Route, Link } from "react-router-dom";


import PatientTable from "./PatientTable.js";
import Header from "./Header";
import Sbar from "../Sbar/Sbar.js";
import CreatePatient from "../CreatePatient/CreatePatient.js";

import { Button, createMuiTheme, MuiThemeProvider } from "@material-ui/core/";


const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5bc8c2",
      main: "#33bbb3",
      dark: "#23827d",
    },
  },
})
//console.log("Hello World");
const SbarHistory = (props) => {
    return (
        <div>
        <Switch>
        <Route path="/history">
          <Header title="Insert Patient Name" />
          <MuiThemeProvider theme={theme}>
            <p>Hello World</p>
            console.log("Hello World");
          </MuiThemeProvider>
        </Route>
      </Switch>
      </div>
    )
}
export default SbarHistory;