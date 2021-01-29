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
      <Header title={`Patient: ${param.id}`} />
      <div className="paper-container">
        <Paper className={classes.pageContent} elevation={4}>
          <Sbarfrom
            nurseID={props.nurseID}
            nurseName={props.nurseName}
            patientName={param.id}
          />
        </Paper>
      </div>
    </div>
  );
}
