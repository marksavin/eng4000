import React, { useState, useEffect } from "react";
import { Paper, Grid, makeStyles, InputLabel } from "@material-ui/core";
import {
  Grid12,
  TextFieldSingle,
  Inputgroup,
  Checkbox,
} from "./UseFormView.js";

const paperStyle = makeStyles((theme) => ({
  pageContent: {
    marginLeft: "2%",
    marginBottom: "50px",
    padding: "2%",
  },
}));

function Situation(props) {
  const { nurseName } = props;

  const paperstyle = paperStyle();

  return (
    <div className="paper-situation">
      <div className="situation">S</div>
      <Paper className={paperstyle.pageContent} elevation={0}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Inputgroup
              label="Nurse Name"
              name="nurseId"
              defaultValue={nurseName}
              text="This is"
            ></Inputgroup>
          </Grid>
          <Grid item xs={12} md={6}>
            <Inputgroup
              label="Room Number"
              name="note_room_id"
              defaultValue={props.situation.sbar_note_archive_room_id}
              text="I'm calling from"
            ></Inputgroup>
          </Grid>
          <Grid12>
            <Inputgroup
              label="Patient name and location"
              name="note_patient_id"
              defaultValue={props.situation.sbar_note_archive_patient_name}
              text="I'm calling about: "
            ></Inputgroup>
          </Grid12>
          <Grid12>
            <Inputgroup
              label="Code status"
              name="s_code_status"
              defaultValue={props.situation.s_code_status}
              text="The Patient's code status is: "
            ></Inputgroup>
          </Grid12>
          <Grid12>
            <Inputgroup
              label="Problem"
              name="s_problem"
              defaultValue={props.situation.s_problem}
              text="The problem I am calling about is: "
            ></Inputgroup>
          </Grid12>
          <Grid item lg={4} xl={4}>
            <InputLabel style={{ width: "100%" }}>
              I have assessed the patient personaly: Vital signs are:
            </InputLabel>
          </Grid>
          <Grid item lg={4} xl={2}>
            <TextFieldSingle
              label="Blood Pressure"
              name="s_BP"
              defaultValue={props.situation.s_BP}
            />
          </Grid>
          <Grid item lg={4} xl={2}>
            <TextFieldSingle
              label="Pulse"
              name="s_pulse"
              defaultValue={props.situation.s_pulse}
            />
          </Grid>
          <Grid item lg={4} xl={2}>
            <TextFieldSingle
              label="Respiration"
              name="s_respiration"
              defaultValue={props.situation.s_respiration}
            />
          </Grid>
          <Grid item lg={4} xl={2}>
            <TextFieldSingle
              label="Temperature"
              name="s_temperature"
              defaultValue={props.situation.s_temperature}
            />
          </Grid>
          <Grid item lg={4} xl={3}>
            <TextFieldSingle
              label="O2 sat"
              name="s_o2"
              defaultValue={props.situation.s_o2}
            />
          </Grid>
          <Grid12>
            <InputLabel
              style={{ fontSize: "1.2rem", fontWeight: "700", margin: "20px" }}
            >
              I am concerned about the:
            </InputLabel>
          </Grid12>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Blood pressure because it is less than 90 or 30 mmHg below usual."
              name="s_concern_bp"
              defaultValue={props.situation.s_concern_bp}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Pulse because it is over 125 or less than 45."
              name="s_concern_pulse"
              defaultValue={props.situation.s_concern_pulse}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Respiration because it is less than 10 or over 30."
              name="s_concern_respiration"
              defaultValue={props.situation.s_concern_respiration}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Temperature because it is less than 96 or over 104."
              name="s_concern_temperature"
              defaultValue={props.situation.s_concern_temperature}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="O2 Sat because it is <90% despite oxygen."
              name="s_concern_o2"
              defaultValue={props.situation.s_concern_o2}
            ></Checkbox>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Situation;
