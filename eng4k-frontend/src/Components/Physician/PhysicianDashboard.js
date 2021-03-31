import { Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PhysicianPatientList from "./PhysicianPatientList";
import PhysicianNavBar from "./notification/PhysicianNavbar";
import Header from "../Nurse/Header";

const PhysicianDashBoard = (props) => {
  const [physicianId, setPhysicianId] = useState("");
  const [physician_name, setPhysicianName] = useState("");

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
          <PhysicianPatientList search={props.search} />
        </Route>
      </Switch>
    </div>
  );
};

export default PhysicianDashBoard;
