import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";

import { TextField, Button, Collapse, IconButton } from "@material-ui/core";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import { Button, createMuiTheme, MuiThemeProvider } from "@material-ui/core/";

import Navigation from "../NavBar/NavBar.js";
import DashboardButton from "./DashboardButton";
import PatientTable from "../Nurse/PatientTable.js";
import CreateNurse from "../CreatePatient/CreateNurse.js";
import CreatePhysician from "../CreatePatient/CreatePhysician.js";
import CreatePatient from "../CreatePatient/CreatePatient.js";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5bc8c2",
      main: "#33bbb3",
      dark: "#23827d",
    },
  },
});

const Admin = (props) => {
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (e) => {
    setRemarks(e.target.value);
    console.log(remarks);
  };

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [remarks, setRemarks] = useState("");

  return (
    <div>
      <Navigation
        search={props.search}
        setSearch={props.setSearch}
        setAuthenticate={props.setAuthenticate}
      />
      <Switch>
        <Route exact path="/admin">
          <Link to="/admin/add-patient">
            <Button
              variant="contained"
              color="primary"
              className="add_patient_button"
              style={{ fontSize: "1.5rem" }}
            >
              Add Patient
            </Button>
          </Link>
          <Link to="/admin/add-nurse">
            <Button
              variant="contained"
              color="primary"
              className="add_patient_button"
              style={{ fontSize: "1.5rem" }}
            >
              Add Nurse
            </Button>
          </Link>

          <Link to="/admin/add-physician">
            <Button
              variant="contained"
              color="primary"
              className="add_patient_button"
              style={{ fontSize: "1.5rem" }}
            >
              Add Physician
            </Button>
          </Link>

          <MuiThemeProvider theme={theme}>
            <PatientTable search={props.search} />
          </MuiThemeProvider>
        </Route>

        <Route exact path="/admin/add-patient">
          <CreatePatient />
        </Route>

        <Route exact path="/admin/add-nurse">
          <CreateNurse />
        </Route>

        <Route exact path="/admin/add-physician">
          <CreatePhysician />
        </Route>
      </Switch>
      <div className="AdminButtons">
        <DashboardButton title="Doctor" count="30" />
        <DashboardButton title="Nurse" count="50" />
        <DashboardButton title="Patient" count="200" />
        <DashboardButton title="Visitor" count="320" />
      </div>

      <div className="adminTable">
        <MuiThemeProvider theme={theme}>
          <PatientTable search={props.search} />
        </MuiThemeProvider>
      </div>
    </div>
  );
};

export default Admin;
