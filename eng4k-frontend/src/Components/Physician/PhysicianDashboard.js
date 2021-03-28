import { Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PhysicianPatientList from "./PhysicianPatientList";
import PhysicianNavBar from "./notification/PhysicianNavbar";
import Header from "../Nurse/Header";

const PhysicianDashBoard = (props) => {
  const [physicianId, setPhysicianId] = useState("");
  const [physician_name, setPhysicianName] = useState("");
  // const [inbox, setInbox] = useState([
  //   {
  //     date_submitted: "",
  //     nure_id: 0,
  //     patient_id: "",
  //     physician_name: "",
  //     text: "test",
  //   },
  // ]);

  let temp2 = [];

  // function getRemarks(id) {
  //   setInbox([]);
  //   firebase
  //     .database()
  //     .ref(`Nurse Remarks/${id}`)
  //     .on("value", (snapshot) => {

  //       // temp = snapshot.val();
  //       // console.log(temp);
  //       // //setInbox(temp);
  //       // var keys = Object.keys(temp);
  //       // //setInbox([]);
  //       // for (var i = 0; i < keys.length; i++) {
  //       //   let k = keys[i];
  //       //   console.log(temp[k]);
  //       //   setInbox((oldInbox) => [...oldInbox, temp[k]]);
  //       // }

  //       //for each element in inbox, console log it each element is a message
  //       // inbox.forEach((element) =>
  //       //   console.log("heres a new message:", element));
  //     });
  // }

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
          //getRemarks(result[0].physician_id);
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
        // messageList={inbox}
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
