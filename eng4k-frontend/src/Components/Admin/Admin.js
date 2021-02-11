import React, { useState } from "react";
import { TextField, Button, Collapse, IconButton } from "@material-ui/core";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import Navigation from "../NavBar/NavBar.js";
import DashboardButton from "./DashboardButton";

import PatientTable from "../Nurse/PatientTable.js";
import { Switch, Route, Link } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5bc8c2",
      main: "#33bbb3",
      dark: "#23827d",
    },
  },
});

const Admin = (props) => {
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (e) => {
    setRemarks(e.target.value);
    console.log(remarks);
  };

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [remarks, setRemarks] = useState("");

  return (
    <div>
      <Navigation
        search={props.search}
        setSearch={props.setSearch}
        setAuthenticate={props.setAuthenticate}
      />
      <div className="AdminButtons">
        <DashboardButton title="Doctor" count="500" />
        <DashboardButton title="Nurse" count="500" />
        <DashboardButton title="Patient" count="500" />
        <DashboardButton title="Visitor" count="500" />
      </div>

      <MuiThemeProvider theme={theme}>
        <PatientTable search={props.search} />
      </MuiThemeProvider>
    </div>
  );
};

export default Admin;
