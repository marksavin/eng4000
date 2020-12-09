import React, { useState, useEffect } from "react";
import { Grid, TextField, makeStyles, InputLabel } from "@material-ui/core";
import { useForm, Form, Grid12, Inputgroup } from "../Sbar/useForm.js";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
      verticleAlighn: "center",
    },
  },
}));

const initialFieldValues = {
  note_id: "",
  note_patient_id: "",
  note_room_id: "",
  date_created: new Date(1),
  s_problem: "",
  s_unit: "",
  s_code_status: "",
  s_BP: "",
  s_pulse: "",
  s_respiration: "",
  s_temperature: "",
  s_o2: "",
  s_concern_bp: false,
  s_concern_pulse: false,
  s_concern_temperature: false,
  b_awareness_alert_oriented: false,
  b_awareness_confused_cooperative: false,
  b_awareness_non_coop_agit_combative: false,
  b_awareness_lethargic: false,
  b_awareness_stuporous: false,
  b_awareness_comatose: false,
  b_skin_warm_dry: false,
  b_skin_pale: false,
  b_skin_mottled: false,
  b_skin_diaphoretic: false,
  b_skin_extremities_cold: false,
  b_skin_extremities_warm: false,
  b_o2_time: "",
  b_oximeter_detection: "",
  a_problem: "",
  a_problem_cardiac: "",
  a_problem_infection: "",
  a_problem_neurologic: "",
  a_problem_respitory: "",
  a_problem_unsure_deterioriating: false,
  a_unstable: false,
  a_arrest: false,
  r_request: "",
  r_priority: false,
  r_patient_family_code_status: false,
  r_test_needed: "",
  r_change_treatment_ordered: "",
  r_freq_vital_signs: "",
  r_time_problem_will_last: "",
  r_problem_persist_contact: "",
};

export default function Sbarform() {
  const { values, setValues, handleInput } = useForm(initialFieldValues);
  const { nurseId, setNurseId } = useForm("");

  return (
    <div className="sbar">
      <div className="sbar-container">
        <Form>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Inputgroup
                label="Nurse Name"
                name="nurseName"
                values={nurseId}
                onChange={handleInput}
                text="Situation: This is "
              ></Inputgroup>
            </Grid>
            <Grid item xs={12} md={6}>
              <Inputgroup
                label="Unit"
                name="unit"
                values={values.s_unit}
                onChange={handleInput}
                text="I'm calling from "
              ></Inputgroup>
            </Grid>
            <Grid12>
              <Inputgroup
                label="Patient name and location"
                name="patientName"
                values={values.note_patient_id}
                onChange={handleInput}
                text="I'm calling about: "
              ></Inputgroup>
            </Grid12>
            <Grid12>
              <Inputgroup
                label="Code status"
                name="codeStatus"
                values={values.s_code_status}
                onChange={handleInput}
                text="The Patient's code status is: "
              ></Inputgroup>
            </Grid12>
            <Grid12>
              <Inputgroup
                label="Problem"
                name="problem"
                values={values.s_problem}
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
              <TextField
                size="small"
                variant="outlined"
                label="Blood Pressure"
                name="bloodPressure"
                values={values.s_BP}
                onChange={handleInput}
              />
            </Grid>
            <Grid item lg={4} xl={2}>
              <TextField
                size="small"
                variant="outlined"
                label="Pulse"
                name="pulse"
                values={values.s_pulse}
                onChange={handleInput}
              />
            </Grid>
            <Grid item lg={4} xl={2}>
              <TextField
                size="small"
                variant="outlined"
                label="Respiration"
                name="respiration"
                values={values.s_Respiration}
                onChange={handleInput}
              />
            </Grid>
            <Grid item lg={4} xl={2}>
              <TextField
                size="small"
                variant="outlined"
                label="Temperature"
                name="temperature"
                values={values.s_temperature}
                onChange={handleInput}
              />
            </Grid>
            <Grid item lg={4} xl={2}>
              <TextField
                size="small"
                variant="outlined"
                label="O2 sat"
                name="o2Sat"
                values={values.s_o2}
                onChange={handleInput}
              />
            </Grid>
          </Grid>
        </Form>
      </div>
    </div>
  );
}
