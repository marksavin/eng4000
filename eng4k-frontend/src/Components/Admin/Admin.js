import React, { useState } from "react";
// import "semantic-ui-css/semantic.min.css";
import Navigation from "../NavBar/NavBar.js";
import PatientTable from "../Nurse/PatientTable.js";
import { Switch, Route, Link } from "react-router-dom";
import { Button, createMuiTheme, MuiThemeProvider } from "@material-ui/core/";

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
      <MuiThemeProvider theme={theme}>
        <PatientTable search={props.search} />
      </MuiThemeProvider>
    </div>
  );
};

export default Admin;
