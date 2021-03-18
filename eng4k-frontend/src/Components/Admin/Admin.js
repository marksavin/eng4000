import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "../NavBar/NavBar.js";
import DashboardButton from "./DashboardButton";
import PatientTable from "../Nurse/PatientTable.js";
import CreateNurse from "../createNewUser/CreateNurse.js";
import CreatePhysician from "../createNewUser/CreatePhysician.js";
import CreatePatient from "../createNewUser/CreatePatient.js";
import UnlockAccount from "../createNewUser/UnlockAccount.js";

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
          <section className="page">
            <div className="admin-button">
              <DashboardButton title="Patient" count="200" />
              <DashboardButton title="Nurse" count="50" />
              <DashboardButton title="Physician" count="30" />
              <DashboardButton title="Visitor" count="320" />
              <DashboardButton title="Unlock" count="-" />
            </div>
            {/* <div className="admin-table">
              <MuiThemeProvider theme={theme}>
                <PatientTable search={props.search} />
              </MuiThemeProvider>
            </div> */}
          </section>
        </Route>
        <MuiThemeProvider theme={theme}>
          <Route exact path="/admin/Patient">
            <CreatePatient />
          </Route>

          <Route exact path="/admin/Nurse">
            <CreateNurse />
          </Route>

          <Route exact path="/admin/Physician">
            <CreatePhysician />
          </Route>

          <Route exact path="/admin/unlock">
            <UnlockAccount />
          </Route>
        </MuiThemeProvider>
      </Switch>
    </div>
  );
};

export default Admin;
