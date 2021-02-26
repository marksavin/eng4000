import React from "react";
import { Paper, Grid, makeStyles, InputLabel } from "@material-ui/core";
import { Grid12, Inputgroup, Checkbox } from "../Sbar/useForm.js";

const paperStyle = makeStyles((theme) => ({
  pageContent: {
    marginLeft: "2%",
    marginBottom: "50px",
    padding: "2%",
  },
}));

function Recommendation(props) {
  const paperstyle = paperStyle();

  return (
    <div className="paper-situation">
      <div className="recommendation">R</div>
      <Paper className={paperstyle.pageContent} elevation={6}>
        <Grid container>
          <Grid12>
            <Inputgroup
              label="What needs to be done"
              name="r_request"
              value={props.recommendation.r_request}
              onBlur={props.handleInput}
              text="I request that you  "
            ></Inputgroup>
          </Grid12>
          <Grid12>
            <Inputgroup
              label="Priority scale"
              name="r_priority"
              value={props.recommendation.r_priority}
              onBlur={props.handleInput}
              text="Priority of the condition from a scale of 1-3, 1 being the least and 3 being the most "
            ></Inputgroup>
          </Grid12>
          <Grid12>
            <Checkbox
              label="Talk to the patient or family about code status."
              name="r_patient_family_code_status"
              value={props.recommendation.r_patient_family_code_status}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid12>
          <Grid12>
            <Inputgroup
              label="CXR, ABG, EKG, CBC, or BMP"
              name="r_test_needed"
              value={props.recommendation.r_test_needed}
              onBlur={props.handleInput}
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
            <Inputgroup
              label="frequency"
              name="r_freq_vital_signs"
              value={props.recommendation.r_freq_vital_signs}
              onBlur={props.handleInput}
              text="How often do you want vital signs taken?"
            ></Inputgroup>
          </Grid12>
          <Grid12>
            <Checkbox
              label="How long do you expect this problem will last?"
              name="r_time_problem_will_last"
              value={props.recommendation.r_time_problem_will_last}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid12>
          <Grid12>
            <Checkbox
              label="If the patient does not get better when would you want us to call again?"
              name="r_problem_persist_contact"
              value={props.recommendation.r_problem_persist_contact}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid12>
        </Grid>
      </Paper>
    </div>
  );
}

export default Recommendation;
