import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Navigation from "../NavBar/NavBar.js";
import PatientTable from "./PatientTable.js";
import Header from "./Header";
import Sbar from "../Sbar/Sbar.js";
// import CreatePatient from "../CreatePatient/CreatePatient.js";
import ContactPhysicanCard from "./ContactPhysicianCard.js";
import HistoryTable from "./HistoryTable.js";
import DialogTest from "./notify/DialogBox";

const NursePage = (props) => {
  const [nurseId, setNurseId] = useState("");
  const [nurseName, setNurseName] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  //const ref = useRef();

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
    console.log("thetset", e);

    setShowDialog(e);
    console.log("thedialog", showDialog);
  }

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
          <PatientTable search={props.search} nurseId={nurseId} />
        </Route>

        <Route path="/nurse/SBARhistory">
          <Header title={`SBAR History of ${props.location.patientName}`} />
          <div
            className="historyContainer"
          >
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
        </Route>

        <Route path="/nurse/:patientName/:patientId">
          <Sbar nurseId={nurseId} nurseName="Mark Apple" />
        </Route>
      </Switch>
    </div>
  );
};

export default NursePage;
