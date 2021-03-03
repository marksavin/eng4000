import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import Navigation from "../NavBar/NavBar.js";
import PatientTable from "./PatientTable.js";
import Header from "./Header";
import Sbar from "../Sbar/Sbar.js";
// import CreatePatient from "../CreatePatient/CreatePatient.js";
import ContactPhysicanCard from "./ContactPhysicianCard.js";
import HistoryTable from "./HistoryTable.js";

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
      <Navigation
        search={props.search}
        setSearch={props.setSearch}
        setAuthenticate={props.setAuthenticate}
      />
      <Switch>
        <Route exact path="/nurse">
          <Header title="Wing Hospital Name" />
          <MuiThemeProvider theme={theme}>
            <PatientTable search={props.search} />
          </MuiThemeProvider>
        </Route>

        <Route path="/nurse/SBARhistory">
          <Header title={`SBAR History of ${props.location.patientName}`} />
          <MuiThemeProvider theme={theme}>
            <HistoryTable
              search={props.search}
              patientName={props.location.patientName}
              patientId={props.location.patientId}
            />
          </MuiThemeProvider>
        </Route>

        <Route exact path="/nurse/contactPhysician">
          {/* ------------------ Temporarily routed here -------------------------*/}
          <ContactPhysicanCard
            pname="Dr. Geneva"
            specialty="Neurology"
            availability="Away on vacation"
          />
        </Route>
        {/* <Route exact path="/nurse/add-patient">
          <CreatePatient />
        </Route> */}

        <Route path="/nurse/:patientName/:patientId">
          <Sbar nurseID="1" nurseName="Mark Apple" />
        </Route>
      </Switch>
    </div>
  );
};

export default NursePage;
