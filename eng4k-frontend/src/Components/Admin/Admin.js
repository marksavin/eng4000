import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";

// import {  } from "@material-ui/core";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import {
  TextField,
  Collapse,
  IconButton,
  Button,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/";

import Navigation from "../NavBar/NavBar.js";
import DashboardButton from "./DashboardButton";
import PatientTable from "../Nurse/PatientTable.js";
import CreateNurse from "../createNewUser/CreateNurse.js";
import CreatePhysician from "../createNewUser/CreatePhysician.js";
import CreatePatient from "../createNewUser/CreatePatient.js";

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
          <div className="AdminButtons">
            <Link to="/admin/add-patient">
              <DashboardButton title="Patient" count="200" />
            </Link>
            <Link to="/admin/add-nurse">
              <DashboardButton title="Nurse" count="50" />
            </Link>

            <Link to="/admin/add-physician">
              <DashboardButton title="Doctor" count="30" />
            </Link>

            <Link to="/admin/add-visitor">
              <DashboardButton title="Visitor" count="320" />
            </Link>
          </div>

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
