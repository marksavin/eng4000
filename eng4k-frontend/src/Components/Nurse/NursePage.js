import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Navigation from "../NavBar/NavBar.js";
import PatientTable from "./PatientTable.js";
import Header from "./Header";
import Sbar from "../Sbar/Sbar.js";

import ContactPhysicanCard from "./ContactPhysicianCard.js";
import HistoryTable from "./HistoryTable.js";
import DialogTest from "./notify/DialogBox";

import {createMuiTheme, MuiThemeProvider } from "@material-ui/core/";

import ViewSbar from "../Sbar/ViewSbar/ViewSbar.js";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#33bbb3",
    },
  },
});

const NursePage = (props) => {
  const [nurseId, setNurseId] = useState("");
  const [nurseName, setNurseName] = useState("");
  const [showDialog, setShowDialog] = useState(false);


  useEffect(() => {
    fetch(`/nurse/getId/${props.userToken}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad");
        }
      })
      .then((result) => {
        if (result !== undefined && result.length !== 0) {
          setNurseId(result[0].nurse_id);
          setNurseName(result[0].nurse_name);
        }
      });
  }, [props]);

  function handleDialogChange(e) {

    setShowDialog(e);
  }

  return (
    <div>
      <Navigation
        search={props.search}
        setSearch={props.setSearch}
        setAuthenticate={props.setAuthenticate}
        nurseId={nurseId}
      />
      <Switch>
        <Route exact path="/nurse">
          <Header title={`Hi ${nurseName}`} />
          <MuiThemeProvider theme={theme}>
            <PatientTable search={props.search} nurseId={nurseId} />
          </MuiThemeProvider>
        </Route>

        <Route path="/nurse/SBARhistory/:patientName">
          <Header title={`SBAR History of ${props.location.patientName}`} />
          <MuiThemeProvider theme={theme}>
            <div className="historyContainer">
              <HistoryTable
                search={props.search}
                nurseId={nurseId}
                patientName={props.location.patientName}
                patientId={props.location.patientId}
              />
              <ContactPhysicanCard
                patientId={props.location.patientId}
                patientName={props.location.patientName}
                nurseId={nurseId}
                nurseName={nurseName}
                onDialogSubmitChange={handleDialogChange}
              />
              <div className="sbarHistoryDialog">
                <DialogTest
                  openDiag={showDialog}
                  handleChange={handleDialogChange}
                />
              </div>
            </div>
          </MuiThemeProvider>
        </Route>

        <Route exact path="/nurse/:patientName/:patientId/:roomId">
          <Sbar nurseId={nurseId} nurseName={nurseName} />
        </Route>

        <Route path="/nurse/viewSBAR">
          <ViewSbar
            nurseName={props.location.nurseName}
            patientId={props.location.patientId}
            patientName={props.location.patientName}
            dateCreated={props.location.dateCreated}
          />
        </Route>

        <Route path="/nurse/:patientName/:patientId">
          <Sbar nurseId={nurseId} nurseName="Mark Apple" />
        </Route>
      </Switch>
    </div>
  );
};

export default NursePage;
