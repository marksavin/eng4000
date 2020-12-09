import React, { useState } from "react";
import {
  Paper,
  Grid,
  TextField,
  makeStyles,
  InputLabel,
} from "@material-ui/core";
import {
  useForm,
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

export default function Situation(props) {
  const { values, setValues, handleInput } = useForm(props.initialFieldValues);
  const [nurseId, setNurseId] = useState("");
  const paperstyle = paperStyle();

  return (
    <Paper className={paperstyle.pageContent} elevation={5}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Inputgroup
            label="Nurse Name"
            name="nurseId"
            value={nurseId}
            onChange={handleInput}
            text="Situation: This is"
          ></Inputgroup>
        </Grid>
        <Grid item xs={12} md={6}>
          <Inputgroup
            label="Unit"
            name="s_unit"
            value={values.s_unit}
            onChange={handleInput}
            text="I'm calling from"
          ></Inputgroup>
        </Grid>
        <Grid12>
          <Inputgroup
            label="Patient name and location"
            name="note_patient_id"
            value={values.note_patient_id}
            onChange={handleInput}
            text="I'm calling about: "
          ></Inputgroup>
        </Grid12>
        <Grid12>
          <Inputgroup
            label="Code status"
            name="s_code_status"
            value={values.s_code_status}
            onChange={handleInput}
            text="The Patient's code status is: "
          ></Inputgroup>
        </Grid12>
        <Grid12>
          <Inputgroup
            label="Problem"
            name="s_problem"
            value={values.s_problem}
            onChange={handleInput}
            text="The problem I am calling about is: "
          ></Inputgroup>
        </Grid12>
        <Grid item lg={4} xl={2}>
          <InputLabel style={{ width: "100%" }}>
            I have assessed the patient personaly: Vital signs are:
          </InputLabel>
        </Grid>
        <Grid item lg={4} xl={2}>
          <TextFieldSingle
            label="Blood Pressure"
            name="s_BP"
            value={values.s_BP}
            onChange={handleInput}
          />
        </Grid>
        <Grid item lg={4} xl={2}>
          <TextField
            size="small"
            variant="outlined"
            label="Pulse"
            name="s_pulse"
            value={values.s_pulse}
            onChange={handleInput}
          />
        </Grid>
        <Grid item lg={4} xl={2}>
          <TextField
            size="small"
            variant="outlined"
            label="Respiration"
            name="s_respiration"
            value={values.s_respiration}
            onChange={handleInput}
          />
        </Grid>
        <Grid item lg={4} xl={2}>
          <TextField
            size="small"
            variant="outlined"
            label="Temperature"
            name="s_temperature"
            value={values.s_temperature}
            onChange={handleInput}
          />
        </Grid>
        <Grid item lg={4} xl={2}>
          <TextField
            size="small"
            variant="outlined"
            label="O2 sat"
            name="s_o2"
            value={values.s_o2}
            onChange={handleInput}
          />
        </Grid>
        <Grid12>
          <InputLabel
            style={{ fontSize: "1.2rem", fontWeight: "700", margin: "20px" }}
          >
            I am concerned about the:
          </InputLabel>
        </Grid12>
        <Grid xs={12} md={6}>
          <Checkbox
            label="Blood pressure because it is less than 90 or 30 mmHg below usual."
            name="s_concern_bp"
            value={values.s_concern_bp}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={6}>
          <Checkbox
            label="Pulse because it is over 125 or less than 45."
            name="s_concern_pulse"
            value={values.s_concern_pulse}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={6}>
          <Checkbox
            label="Respiration because it is less than 10 or over 30."
            name="s_concern_respiration"
            value={values.s_concern_respiration}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={6}>
          <Checkbox
            label="Temperature because it is less than 96 or over 104."
            name="s_concern_temperature"
            value={values.s_concern_temperature}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={6}>
          <Checkbox
            label="O2 Sat because it is <90% despite oxygen."
            name="s_concern_o2"
            value={values.s_concern_o2}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
      </Grid>
    </Paper>
  );
}
