import React, { useState, useEffect } from "react";
import { Paper, Grid, makeStyles, InputLabel } from "@material-ui/core";
import {
  Grid12,
  TextFieldSingle,
  Inputgroup,
  Checkbox,
} from "../Sbar/useForm.js";

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
      <Paper className={paperstyle.pageContent} elevation={5}>
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
              defaultValue={props.roomId}
              text="I'm calling from"
            ></Inputgroup>
          </Grid>
          <Grid12>
            <Inputgroup
              label="Patient name and location"
              name="note_patient_id"
              defaultValue={props.patientName}
              onBlur={props.handleInput}
              text="I'm calling about: "
            ></Inputgroup>
          </Grid12>
          <Grid12>
            <Inputgroup
              label="Code status"
              name="s_code_status"
              value={props.situation.s_code_status}
              onBlur={props.handleInput}
              error={props.errors.s_code_status}
              text="The Patient's code status is: "
            ></Inputgroup>
          </Grid12>
          <Grid12>
            <Inputgroup
              label="Problem"
              name="s_problem"
              value={props.situation.s_problem}
              onBlur={props.handleInput}
              error={props.errors.s_problem}
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
              value={props.situation.s_BP}
              onBlur={props.handleInput}
            />
          </Grid>
          <Grid item lg={4} xl={2}>
            <TextFieldSingle
              label="Pulse"
              name="s_pulse"
              value={props.situation.s_pulse}
              onBlur={props.handleInput}
            />
          </Grid>
          <Grid item lg={4} xl={2}>
            <TextFieldSingle
              label="Respiration"
              name="s_respiration"
              value={props.situation.s_respiration}
              onBlur={props.handleInput}
            />
          </Grid>
          <Grid item lg={4} xl={2}>
            <TextFieldSingle
              label="Temperature"
              name="s_temperature"
              value={props.situation.s_temperature}
              onBlur={props.handleInput}
            />
          </Grid>
          <Grid item lg={4} xl={3}>
            <TextFieldSingle
              label="O2 sat"
              name="s_o2"
              value={props.situation.s_o2}
              onBlur={props.handleInput}
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
              value={props.situation.s_concern_bp}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Pulse because it is over 125 or less than 45."
              name="s_concern_pulse"
              value={props.situation.s_concern_pulse}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Respiration because it is less than 10 or over 30."
              name="s_concern_respiration"
              value={props.situation.s_concern_respiration}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Temperature because it is less than 96 or over 104."
              name="s_concern_temperature"
              value={props.situation.s_concern_temperature}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="O2 Sat because it is <90% despite oxygen."
              name="s_concern_o2"
              value={props.situation.s_concern_o2}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Situation;
