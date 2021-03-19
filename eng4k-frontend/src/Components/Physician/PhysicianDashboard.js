import { Switch, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core/";
import React, { useEffect, useState } from "react";
import PhysicianPatientList from "./PhysicianPatientList";
import Navigation from "../NavBar/NavBar.js";
import firebase from "../firebase/firebase";

//import PHeader from './PHeader';
///import ContactPhysicianCard from "../Nurse/ContactPhysicanCard"; //temperarily

import Header from "../Nurse/Header";

//const [data, SetDate] = useState("");

//const firedata = () => {
firebase
  .database()
  .ref("Nurse Remarks")
  .on("value", (snapshot) => {
    console.log("success", snapshot.val());
  }); //}

const PhysicianDashBoard = (props) => {
  useEffect(() => {
    const database = firebase.database();

    database.ref('Nurse Remarks/1/-MW772spG8yktTVXpaUT/text').on('value', (snapshot) => {
      alert(snapshot.val());
    })
  })

  return (
    <div>
      <Navigation
        search={props.search}
        setSearch={props.setSearch}
        setAuthenticate={props.setAuthenticate}
      />
      <Switch>
        {/* <Route exact path="/physician">
          <Header title="DashBoard" />
          <div className="dButtons">
            <Link to="/physician/patient-list">
              <div className="patientList_button">
                <Button
                  variant="contained"
                  color="primary"
                  className="pl_button"
                  style={{ fontSize: "1.5rem" }}
                >
                  Patient List
                </Button>
              </div>
            </Link>
          </div>
          {/* <ContactPhysicianCard /> */}
        {/* </Route> */} */
        <Route exact path="/physician">
          <Header title="Dr. --Physician Name--" />
          <PhysicianPatientList search={props.search} />
        </Route>
      </Switch>
    </div>
  );
};

export default PhysicianDashBoard;
