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

function Assessment(props) {
  const paperstyle = paperStyle();

  return (
    <div className="paper-situation">
    <div className="assessment">A</div>
      <Paper className={paperstyle.pageContent} elevation={5}>
        <Grid container>
          <Grid item xs={12}>
            <Inputgroup
              label="Problem"
              name="a_problem"
              value={props.assessment.a_problem}
              onBlur={props.handleInput}
              text="This is what I think the problem is:"
            ></Inputgroup>
          </Grid>
          <Grid item lg={4} xl={2}>
            <InputLabel style={{ width: "100%" }}>
              The problem seems to be:
            </InputLabel>
          </Grid>
          <Grid item lg={4} xl={2}>
            <Checkbox
              label="Cardiac"
              name="a_problem_cardiac"
              value={props.assessment.a_problem_cardiac}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item lg={4} xl={2}>
            <Checkbox
              label="Infection"
              name="a_problem_infection"
              value={props.assessment.a_problem_infection}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item lg={4} xl={2}>
            <Checkbox
              label="Neurologic"
              name="a_problem_neurologic"
              defaultValue={props.assessment.a_problem_neurologic}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item lg={4} xl={2}>
            <Checkbox
              label="Respitory"
              name="a_problem_respitory"
              value={props.assessment.a_problem_respitory}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid12>
            <Checkbox
              label="I am not sure what the problem is but the patient is deteriorating."
              name="a_problem_unsure_deterioriating"
              value={props.assessment.a_problem_unsure_deterioriating}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid12>
          <Grid12>
            <Checkbox
              label="The patient seems to be unstable, we need to do something."
              name="a_unstable"
              value={props.assessment.a_unstable}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid12>
          <Grid12>
            <Checkbox
              label="I am afraid the patient may arrest."
              name="a_arrest"
              value={props.assessment.a_arrest}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid12>
        </Grid>
      </Paper>
    </div>
  );
};

export default Assessment;
