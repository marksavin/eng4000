import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";

import Header from "../Nurse/Header";
import Sbarfrom from "./Sbarform.js";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    "& .MuiPaper-elevation1": {},
    margin: "19rem 5% 5% 5%",
    padding: "0.5%",
    paddingLeft: "15%",
  },
}));

export default function Sbar(props) {
  const param = useParams();
  const classes = useStyles();

  return (
    <>
      <Header title={`Patient: ${param.id}`} />
      <Paper className={classes.pageContent} elevation={4}>
        <Sbarfrom
          nurseID={props.nurseID}
          nurseName={props.nurseName}
          patientName={param.id}
        />
      </Paper>
    </>
  );
}
