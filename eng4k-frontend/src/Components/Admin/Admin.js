import React, { useState } from "react";
import { TextField, Button, Collapse, IconButton } from "@material-ui/core";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import Navigation from "../NavBar/NavBar.js";
import DashboardButton from "./DashboardButton";

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
    <div className="AdminButtons">
      <DashboardButton title="Doctor" count="500" />
      <DashboardButton title="Nurse" count="500" />
      <DashboardButton title="Patient" count="500" />
      <DashboardButton title="Visitor" count="500" />
    </div>
  );
};

export default Admin;
