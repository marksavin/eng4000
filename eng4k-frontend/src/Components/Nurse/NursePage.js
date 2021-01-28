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
});

const NursePage = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/nurse">
          <Link to="/nurse/add-patient">
            <Button
              variant="contained"
              color="primary"
              className="add_patient_button"
              style={{ fontSize: "1.5rem" }}
            >
              Add Patient
            </Button>
          </Link>
          <Header title="Wing Hospital Name" />
          <MuiThemeProvider theme={theme}>
            <PatientTable search={props.search} />
          </MuiThemeProvider>
        </Route>

        <Route exact path="/nurse/add-patient">
          <CreatePatient />
        </Route>

        <Route path="/nurse/:id">
          <Sbar nurseID="1" nurseName="Mark Apple" />
        </Route>
      </Switch>
    </div>
  );
};

export default NursePage;
