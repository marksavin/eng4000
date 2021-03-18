import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";

import Header from "../../Nurse/Header";
import ViewSbarForm from "./ViewSbarForm.js";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    position: "absolute",
    padding: "2%",
    top: "0",
  },
}));

export default function ViewSbar(props) {
  const classes = useStyles();

  return (
    <div>
      <Header title={`Patient: ${props.patientName}`} />
      <Header title={`Created on: ${props.dateCreated}`} />
      <div className="paper-container-1">
        <Paper className={classes.pageContent} elevation={4}>
          <ViewSbarForm
            patientId={props.patientId}
            nurseName={props.nurseName}
            dateCreated={props.dateCreated}
          />
        </Paper>
      </div>
    </div>
  );
}
