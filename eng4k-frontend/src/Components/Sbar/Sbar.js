import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";

import Header from "../Nurse/Header";
import Sbarfrom from "./Sbarform.js";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    position: "absolute",
    padding: "2%",
    top: "0",
  },
}));

export default function Sbar(props) {
  const param = useParams();
  const classes = useStyles();

  return (
    <div>
      <Header title={`Patient: ${param.patientName}`} />
      <div className="paper-container">
        <Paper className={classes.pageContent} elevation={4}>
          <Sbarfrom
            nurseId={props.nurseId}
            nurseName={props.nurseName}
            patientName={param.patientName}
            patientId={param.patientId}
            roomId={param.roomId}
          />
        </Paper>
      </div>
    </div>
  );
}
