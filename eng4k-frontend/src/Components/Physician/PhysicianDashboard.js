import { Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PhysicianPatientList from "./PhysicianPatientList";
import PhysicianNavBar from "./notification/PhysicianNavbar";
import Header from "../Nurse/Header";

import Navigation from "../NavBar/NavBar.js";
import Sbar from "../Sbar/Sbar.js";
import HistoryTable from "./physicianHistoryTable.js";
import DialogTest from "./../Nurse/notify/DialogBox";

import { Button, createMuiTheme, MuiThemeProvider } from "@material-ui/core/";

import ViewSbar from "../Sbar/ViewSbar/ViewSbar.js";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#33bbb3",
    },
  },
});

const PhysicianDashBoard = (props) => {
  const [physicianId, setPhysicianId] = useState("");
  const [physician_name, setPhysicianName] = useState("");
  let temp2 = [];

  useEffect(() => {
    fetch(`/physician/getId/${props.userToken}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad, phys id");
        }
      })
      .then((result) => {
        if (result !== undefined && result.length !== 0) {
          setPhysicianId(result[0].physician_id);
          setPhysicianName(`Dr. ${result[0].physician_name}`);
          console.log("here", physicianId);
        }
      });
  }, [props.userToken]);

  console.log("phys id:", physicianId);
  return (
    <div>
      <PhysicianNavBar
        search={props.search}
        setSearch={props.setSearch}
        setAuthenticate={props.setAuthenticate}
        physicianID={physicianId}
      />
      <Switch>
        <Route exact path="/physician">
          <Header title={physician_name} />
          <MuiThemeProvider theme={theme}>
            <PhysicianPatientList
              search={props.search}
              physicianID={physicianId}
            />
          </MuiThemeProvider>
        </Route>

        <Route path="/physician/SBARhistory/:patientName">
          <Header title={`SBAR History of ${props.location.patientName}`} />
          <MuiThemeProvider theme={theme}>
            <div className="historyContainer" style={{ width: "100%" }}>
              <HistoryTable
                search={props.search}
                nurseId={physicianId}
                patientName={props.location.patientName}
                patientId={props.location.patientId}
              />
            </div>
          </MuiThemeProvider>
        </Route>

        <Route path="/physician/viewSBAR">
          <ViewSbar
            nurseName={props.location.nurseName}
            patientId={props.location.patientId}
            patientName={props.location.patientName}
            dateCreated={props.location.dateCreated}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default PhysicianDashBoard;
