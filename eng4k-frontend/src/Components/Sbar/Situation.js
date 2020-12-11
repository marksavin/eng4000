import React, { useState } from "react";
import { Paper, Grid, makeStyles, InputLabel } from "@material-ui/core";
import {
  Grid12,
  TextFieldSingle,
  Inputgroup,
  Checkbox,
} from "../Sbar/useForm.js";

const paperStyle = makeStyles((theme) => ({
  pageContent: {
    margin: "1%",
    padding: "2%",
  },
}));

const Situation = React.memo(function Situation(props) {
  const [nurseId, setNurseId] = useState("");
  const paperstyle = paperStyle();

  return (
    <Paper className={paperstyle.pageContent} elevation={5}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Inputgroup
            label="Nurse Name"
            name="nurseId"
            value={props.nurseName}
            onChange={props.handleInput}
            text="This is"
          ></Inputgroup>
        </Grid>
        <Grid item xs={12} md={6}>
          <Inputgroup
            label="Unit"
            name="s_unit"
            value={props.values.s_unit}
            onChange={props.handleInput}
            text="I'm calling from"
            error={props.errors.s_unit}
          ></Inputgroup>
        </Grid>
        <Grid12>
          <Inputgroup
            label="Patient name and location"
            name="note_patient_id"
            value={props.values.note_patient_id}
            onChange={props.handleInput}
            text="I'm calling about: "
            error={props.errors.note_patient_id}
          ></Inputgroup>
        </Grid12>
        <Grid12>
          <Inputgroup
            label="Code status"
            name="s_code_status"
            value={props.values.s_code_status}
            onChange={props.handleInput}
            text="The Patient's code status is: "
          ></Inputgroup>
        </Grid12>
        <Grid12>
          <Inputgroup
            label="Problem"
            name="s_problem"
            value={props.values.s_problem}
            onChange={props.handleInput}
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
            value={props.values.s_BP}
            onChange={props.handleInput}
          />
        </Grid>
        <Grid item lg={4} xl={2}>
          <TextFieldSingle
            label="Pulse"
            name="s_pulse"
            value={props.values.s_pulse}
            onChange={props.handleInput}
          />
        </Grid>
        <Grid item lg={4} xl={2}>
          <TextFieldSingle
            label="Respiration"
            name="s_respiration"
            value={props.values.s_respiration}
            onChange={props.handleInput}
          />
        </Grid>
        <Grid item lg={4} xl={2}>
          <TextFieldSingle
            label="Temperature"
            name="s_temperature"
            value={props.values.s_temperature}
            onChange={props.handleInput}
          />
        </Grid>
        <Grid item lg={4} xl={3}>
          <TextFieldSingle
            label="O2 sat"
            name="s_o2"
            value={props.values.s_o2}
            onChange={props.handleInput}
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
            value={props.values.s_concern_bp}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Checkbox
            label="Pulse because it is over 125 or less than 45."
            name="s_concern_pulse"
            value={props.values.s_concern_pulse}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Checkbox
            label="Respiration because it is less than 10 or over 30."
            name="s_concern_respiration"
            value={props.values.s_concern_respiration}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Checkbox
            label="Temperature because it is less than 96 or over 104."
            name="s_concern_temperature"
            value={props.values.s_concern_temperature}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Checkbox
            label="O2 Sat because it is <90% despite oxygen."
            name="s_concern_o2"
            value={props.values.s_concern_o2}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
      </Grid>
    </Paper>
  );
});

export default Situation;