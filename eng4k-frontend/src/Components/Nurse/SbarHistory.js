import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import Header from "./Header";
import PatientTable from "./PatientTable.js";



const SbarHistory = (props) => {
    return (
        <div>
        <Switch>
        <Route exact path="/history">
          <Header title="Insert Patient Name" />
          <MuiThemeProvider theme={theme}>
            <PatientTable search={props.search} />
          </MuiThemeProvider>
        </Route>
      </Switch>
      </div>
    )
}

export default SbarHistory;


