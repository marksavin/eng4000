import React, { useState } from "react";

import Navigation from "../NavBar/NavBar.js";
import PatientTable from "../Nurse/PatientTable.js";
import { Switch, Route, Link } from "react-router-dom";
import { Button, createMuiTheme, MuiThemeProvider } from "@material-ui/core/";
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
    </div>
  );
};

export default Admin;
