import React from "react";
import { Switch, Route } from "react-router-dom";

import PatientTable from "./PatientTable.js";
import Header from "./Header";
import Sbar from "../Sbar/Sbar.js";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5bc8c2",
      main: "#33bbb3",
      dark: "#23827d",
    },
  },
});

export default class NursePage extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/nurse">
            <Header title="Wing Hospital Name" />
            <MuiThemeProvider theme={theme}>
              <PatientTable />
            </MuiThemeProvider>
          </Route>

          <Route path="/nurse/:id">
            <Sbar nurseID="1" nurseName="Mark Apple" />
          </Route>
        </Switch>
      </div>
    );
  }
}
