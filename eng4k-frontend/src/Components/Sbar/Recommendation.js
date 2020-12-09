import React from "react";
import { Paper, Grid, makeStyles, InputLabel } from "@material-ui/core";
import {
  useForm,
  Form,
  Grid12,
  Inputgroup,
  Checkbox,
  ButtonForm,
} from "../Sbar/useForm.js";

const paperStyle = makeStyles((theme) => ({
  pageContent: {
    margin: "1%",
    padding: "2%",
  },
}));

export default function Recommendation(props) {
  const { values, setValues, handleInput } = useForm(props.initialFieldValues);
  const paperstyle = paperStyle();

  return (
    <Paper className={paperstyle.pageContent} elevation={6}>
      <Grid container>
        <Grid12>
          <Inputgroup
            label="What needs to be done"
            name="r_request"
            value={values.r_request}
            onChange={handleInput}
            text="I request that you  "
          ></Inputgroup>
        </Grid12>
        <Grid12>
          <Checkbox
            label="Come to see the patient at this time"
            name="r_priority"
            value={values.r_priority}
            onChange={handleInput}
          ></Checkbox>
        </Grid12>
        <Grid12>
          <Checkbox
            label="Talk to the patient or family about code status."
            name="r_patient_family_code_status"
            value={values.r_patient_family_code_status}
            onChange={handleInput}
          ></Checkbox>
        </Grid12>
        <Grid12>
          <Inputgroup
            label="CXR, ABG, EKG, CBC, or BMP"
            name="r_test_needed"
            value={values.r_test_needed}
            onChange={handleInput}
            text="Are any tests needed:"
          ></Inputgroup>
        </Grid12>
        <Grid12>
          <InputLabel
            style={{ fontSize: "1.2rem", fontWeight: "700", margin: "20px" }}
          >
            If a change in treatment is ordered then ask:
          </InputLabel>
        </Grid12>
        <Grid12>
          <Checkbox
            label="How often do you want vital signs?"
            name="r_freq_vital_signs"
            value={values.r_freq_vital_signs}
            onChange={handleInput}
          ></Checkbox>
        </Grid12>
        <Grid12>
          <Checkbox
            label="How long do you expect this problem will last?"
            name="r_time_problem_will_last"
            value={values.r_time_problem_will_last}
            onChange={handleInput}
          ></Checkbox>
        </Grid12>
        <Grid12>
          <Checkbox
            label="If the patient does not get better when would you want us to call again?"
            name="r_problem_persist_contact"
            value={values.r_problem_persist_contact}
            onChange={handleInput}
          ></Checkbox>
        </Grid12>
      </Grid>
    </Paper>
  );
}
