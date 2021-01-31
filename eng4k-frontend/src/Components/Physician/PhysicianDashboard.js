import { Switch, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core/";
import React, { useState } from 'react';
import PhysicianPatientList from './PhysicianPatientList';

import Header from "../Nurse/Header";


const  PhysicianDashBoard = () => {
    const [search, setSearch] = useState('');
        
        return (
        <div>
            <Switch>
                <Route exact path="/physicianDash">
                <Header title="DashBoard" />
                <div className='dButtons'>
                    <Link to='/physicianDash/patient-list'>
                        <div className='patientList_button'>
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
                    
                </Route>
                <Route  exact path='/physicianDash/patient-list'>
                    <PhysicianPatientList search={search}/>
                </Route>
            </Switch>
            </div>
        );
}

export default PhysicianDashBoard;