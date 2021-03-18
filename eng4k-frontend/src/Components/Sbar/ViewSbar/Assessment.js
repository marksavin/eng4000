import React from "react";
import { Paper, Grid, makeStyles, InputLabel } from "@material-ui/core";
import { Grid12, Inputgroup, Checkbox } from "./UseFormView.js";

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
              defaultValue={props.assessment.a_problem}
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
              defaultValue={props.assessment.a_problem_cardiac}
            ></Checkbox>
          </Grid>
          <Grid item lg={4} xl={2}>
            <Checkbox
              label="Infection"
              name="a_problem_infection"
              defaultValue={props.assessment.a_problem_infection}
            ></Checkbox>
          </Grid>
          <Grid item lg={4} xl={2}>
            <Checkbox
              label="Neurologic"
              name="a_problem_neurologic"
              defaultdefaultValue={props.assessment.a_problem_neurologic}
            ></Checkbox>
          </Grid>
          <Grid item lg={4} xl={2}>
            <Checkbox
              label="Respitory"
              name="a_problem_respitory"
              defaultValue={props.assessment.a_problem_respitory}
            ></Checkbox>
          </Grid>
          <Grid12>
            <Checkbox
              label="I am not sure what the problem is but the patient is deteriorating."
              name="a_problem_unsure_deterioriating"
              defaultValue={props.assessment.a_problem_unsure_deterioriating}
            ></Checkbox>
          </Grid12>
          <Grid12>
            <Checkbox
              label="The patient seems to be unstable, we need to do something."
              name="a_unstable"
              defaultValue={props.assessment.a_unstable}
            ></Checkbox>
          </Grid12>
          <Grid12>
            <Checkbox
              label="I am afraid the patient may arrest."
              name="a_arrest"
              defaultValue={props.assessment.a_arrest}
            ></Checkbox>
          </Grid12>
        </Grid>
      </Paper>
    </div>
  );
};

export default Assessment;
