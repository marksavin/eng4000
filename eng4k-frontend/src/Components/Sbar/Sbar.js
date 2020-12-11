import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";

import Sbarfrom from "./Sbarform.js";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    "& .MuiPaper-elevation1": {},
    margin: "15rem 5% 5% 5%",
    padding: "0.5%",
    paddingLeft: "15%",
  },
}));

export default function Sbar(props) {
  const param = useParams();
  const classes = useStyles();

  return (
    <>
      <div
        className="sbar-title"
        style={{
          position: "absolute",
          fontSize: "5rem",
          top: "110px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Patient: {param.id}
      </div>
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
