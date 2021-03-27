import { Switch, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core/";
import React, { useState, useEffect } from "react";
import PhysicianPatientList from "./PhysicianPatientList";
import PhysicianNavBar from "./notification/PhysicianNavbar";
import firebase from "../firebase/firebase";

import InboxList from "./notification/InboxList";
import Header from "../Nurse/Header";
//import Message from "./notifications/Message";

const PhysicianDashBoard = (props) => {
  const [physicianId, setPhysicianId] = useState("");
  const [physician_name, setPhysicianName] = useState("");
  const [inbox, setInbox] = useState([
    {
      date_submitted: "",
      nure_id: 0,
      patient_id: "",
      physician_name: "",
      text: "test",
    },
  ]);
  //let inbox = [];
  let temp = [];
  let temp2 = [];


  function getRemarks(id) {
    setInbox([]);
    firebase
      .database()
      .ref(`Nurse Remarks/${id}`)
      .on("value", (snapshot) => {
        //store json into 'inbox'
        //console.log(snapshot.val());
        snapshot.forEach((childSnapshot) => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;
          temp2.push(item);
        });
        setInbox(temp2);

        // temp = snapshot.val();
        // console.log(temp);
        // //setInbox(temp);
        // var keys = Object.keys(temp);
        // //setInbox([]);
        // for (var i = 0; i < keys.length; i++) {
        //   let k = keys[i];
        //   console.log(temp[k]);
        //   setInbox((oldInbox) => [...oldInbox, temp[k]]);
        // }

        //for each element in inbox, console log it each element is a message
        // inbox.forEach((element) =>
        //   console.log("heres a new message:", element));
      });
  }

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
          getRemarks(result[0].physician_id);
        }
      });
  }, [props]);

  useEffect(() => {}, [inbox, temp2]);

  return (
    <div>
      <PhysicianNavBar
        search={props.search}
        setSearch={props.setSearch}
        setAuthenticate={props.setAuthenticate}
        messageList={inbox}
      />
      <Switch>
        <Route exact path="/physician">
          <Header title={physician_name} />
          <PhysicianPatientList search={props.search} />
          <div className="stuff">
            {/* {inbox[0].date_submitted} */}
            {/* {inbox.map((details, index) => (
              <div className="messages">
                <div className="messagePatientName">
                  <h3 key={index}>
                    Patient: {details.patient_name} Nurse:{details.nurse_name}
                    {"    "}
                    date: {details.date_submitted}
                  </h3>
                  <p key={index}> Message: {details.text}</p>
                </div>
              </div>
            ))} */}
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default PhysicianDashBoard;
