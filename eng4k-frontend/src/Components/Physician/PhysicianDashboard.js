import { Switch, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core/";
import React, { useState } from "react";
import PhysicianPatientList from "./PhysicianPatientList";
//import PHeader from './PHeader';
///import ContactPhysicianCard from "../Nurse/ContactPhysicanCard"; //temperarily

import Header from "../Nurse/Header";

const PhysicianDashBoard = (props) => {

  return (
    <div>
      <Switch>
        <Route exact path="/physician">
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
        </Route>
        <Route exact path="/physician/patient-list">
          <Header title='Dr. --Physician Name--'/>
          <PhysicianPatientList search={props.search} />
        </Route>
      </Switch>
    </div>
  );
};

export default PhysicianDashBoard;
