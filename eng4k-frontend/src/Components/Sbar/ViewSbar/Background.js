import React from "react";
import { Paper, Grid, makeStyles, InputLabel } from "@material-ui/core";
import { Grid12, Checkbox, Inputgroup } from "./UseFormView.js";

const paperStyle = makeStyles((theme) => ({
  pageContent: {
    marginLeft: "2%",
    marginBottom: "50px",
    padding: "2%",
  },
}));

function Background(props) {
  const paperstyle = paperStyle();

  return (
    <div className="paper-situation">
      <div className="background">B</div>
      <Paper className={paperstyle.pageContent} elevation={5}>
        <Grid container>
          <Grid12>
            <InputLabel
              style={{ fontSize: "1.2rem", fontWeight: "700", margin: "20px" }}
            >
              The patient's mental status is:
            </InputLabel>
          </Grid12>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Alert and oriented to person place and time."
              name="b_awareness_alert_oriented"
              defaultValue={props.background.b_awareness_alert_oriented}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Confused and cooperative."
              name="b_awareness_confused_cooperative"
              defaultValue={props.background.b_awareness_confused_cooperative}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="non-cooperative, agitated or combative."
              name="b_awareness_non_coop_agit_combative"
              defaultValue={
                props.background.b_awareness_non_coop_agit_combative
              }
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Stuporous and not talking clearly and possibly not able to swallow."
              name="b_awareness_stuporous"
              defaultValue={props.background.b_awareness_stuporous}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Comatose. Eyes closed. Not responding to stimulation."
              name="b_awareness_comatose"
              defaultValue={props.background.b_awareness_comatose}
            ></Checkbox>
          </Grid>
          <Grid12>
            <InputLabel
              style={{ fontSize: "1.2rem", fontWeight: "700", margin: "20px" }}
            >
              The Skin is:
            </InputLabel>
          </Grid12>
          <Grid item xs={12} md={4}>
            <Checkbox
              label="Warm and dry"
              name="b_skin_warm_dry"
              defaultValue={props.background.b_skin_warm_dry}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={4}>
            <Checkbox
              label="Pale"
              name="b_skin_pale"
              defaultValue={props.background.b_skin_pale}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={4}>
            <Checkbox
              label="Mottled"
              name="b_skin_mottled"
              defaultValue={props.background.b_skin_mottled}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={4}>
            <Checkbox
              label="Diaphoretic"
              name="b_skin_diaphoretic"
              defaultValue={props.background.b_skin_diaphoretic}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={4}>
            <Checkbox
              label="Extremities are cold"
              name="b_skin_extremities_cold"
              defaultValue={props.background.b_skin_extremities_cold}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={4}>
            <Checkbox
              label="Extremities are warm"
              name="b_skin_extremities_warm"
              defaultValue={props.background.b_skin_extremities_warm}
            ></Checkbox>
          </Grid>
          <Grid12>
            <InputLabel
              style={{ fontSize: "1.2rem", fontWeight: "700", margin: "20px" }}
            >
              The Patient is not or is on oxygen:
            </InputLabel>
          </Grid12>
          <Grid12>
            <Inputgroup
              label="(%)"
              name="s_o2"
              defaultValue={props.background.b_o2_percent}
              text="The patient has been on "
            ></Inputgroup>
            <Inputgroup
              label="(hours)"
              name="b_o2_time"
              defaultValue={props.background.b_o2_time}
              text="For how long:"
            ></Inputgroup>
          </Grid12>
          <Grid12>
            <Checkbox
              label="The oximeter does not detect a good puslse and is giving erratic readings."
              name="b_oximeter_detection"
              defaultValue={props.background.b_oximeter_detection}
            ></Checkbox>
          </Grid12>
        </Grid>
      </Paper>
    </div>
  );
}

export default Background;
