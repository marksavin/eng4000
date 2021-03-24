import { Switch, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core/";
import React, { useState, useEffect } from "react";
import PhysicianPatientList from "./PhysicianPatientList";
import Navigation from "../NavBar/NavBar.js";
import firebase from "../firebase/firebase";

import Header from "../Nurse/Header";
import Message from "./notifications/Message";

/**
 * 
 *  {date_sub
    nurse_id
    patient_id
    patient_name
    Physician_name
    msg}  
 *  
 */

const PhysicianDashBoard = (props) => {
  const [physicianId, setPhysicianId] = useState("");
  const [physician_name, setPhysicianName] = useState("");
  const inbox = [];

  function getRemarks(id) {
    firebase
      .database()
      .ref(`Nurse Remarks/${id}`)
      .on("value", (snapshot) => {
        //store json into 'inbox'
        var temp = snapshot.val();
        var keys = Object.keys(temp);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          inbox[i] = temp[k];
        }

        //for each element in inbox, console log it
        //each element is a message
        inbox.forEach((element) =>
          console.log("heres a new message:", element)
        );
        //console.log("the other attempt:", inbox);
      });
  }

  useEffect(() => {
    fetch(`/physician/getId/${props.userToken}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad, can't get phys id");
        }
      })
      .then((result) => {
        if (result !== undefined && result.length !== 0) {
          setPhysicianId(result[0].physician_id);
          setPhysicianName(`Dr. ${result[0].physician_name}`);
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
          <div className="messageList">
            <Message inb_list={inbox} />
            {/* <ul>
            <li>top</li>
            {inbox.map(item =>{return <li>{inbox}</li>})}
            <li>bottom</li>
          </ul> */}
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default PhysicianDashBoard;
