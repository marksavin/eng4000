import { Switch, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core/";
import React, { useState, useEffect } from "react";
import PhysicianPatientList from "./PhysicianPatientList";
import Navigation from "../NavBar/NavBar.js";
import firebase from "../firebase/firebase";

import Header from "../Nurse/Header";


const PhysicianDashBoard = (props) => {
  const [physicianId, setPhysicianId] = useState("");
  const [physician_name, setPhysicianName] = useState("");

  function getRemarks(id) {
    console.log(physicianId);
    firebase
      .database()
      .ref(`Nurse Remarks/${id}`)
      .on("value", (snapshot) => {
        console.log("success", snapshot.val());
      });
  }


  useEffect(() => {
    fetch(`/physician/getId/${props.userToken}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad, can't get id");
        }
      })
      .then((result) => {
        if (result !== undefined && result.length !== 0) {
          setPhysicianId(result[0].physician_id);
          setPhysicianName(`Dr. ${result[0].physician_name}`);
          //console.log(result);
          getRemarks(result[0].physician_id);
        }
      });
  }, [props]);

  return (
    <div>
      <Navigation
        search={props.search}
        setSearch={props.setSearch}
        setAuthenticate={props.setAuthenticate}
      />
      <Switch>
        <Route exact path="/physician">
          <Header title={physician_name} />
          <PhysicianPatientList search={props.search} />
        </Route>
      </Switch>
    </div>
  );
};

export default PhysicianDashBoard;
