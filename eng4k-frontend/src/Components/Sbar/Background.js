import React from "react";
import { Paper, Grid, makeStyles, InputLabel } from "@material-ui/core";
import { Grid12, Checkbox, Inputgroup } from "../Sbar/useForm.js";

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
      <Paper className={paperstyle.pageContent} elevation={6}>
        <Grid container align="left">
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
              value={props.background.b_awareness_alert_oriented}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Confused and cooperative."
              name="b_awareness_confused_cooperative"
              value={props.background.b_awareness_confused_cooperative}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="non-cooperative, agitated or combative."
              name="b_awareness_non_coop_agit_combative"
              value={props.background.b_awareness_non_coop_agit_combative}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Stuporous and not talking clearly and possibly not able to swallow."
              name="b_awareness_stuporous"
              value={props.background.b_awareness_stuporous}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Checkbox
              label="Comatose. Eyes closed. Not responding to stimulation."
              name="b_awareness_comatose"
              value={props.background.b_awareness_comatose}
              onBlur={props.handleInput}
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
              value={props.background.b_skin_warm_dry}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={4}>
            <Checkbox
              label="Pale"
              name="b_skin_pale"
              value={props.background.b_skin_pale}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={4}>
            <Checkbox
              label="Mottled"
              name="b_skin_mottled"
              value={props.background.b_skin_mottled}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={4}>
            <Checkbox
              label="Diaphoretic"
              name="b_skin_diaphoretic"
              value={props.background.b_skin_diaphoretic}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={4}>
            <Checkbox
              label="Extremities are cold"
              name="b_skin_extremities_cold"
              value={props.background.b_skin_extremities_cold}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid item xs={12} md={4}>
            <Checkbox
              label="Extremities are warm"
              name="b_skin_extremities_warm"
              value={props.background.b_skin_extremities_warm}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid>
          <Grid12>
            <InputLabel
              style={{ fontSize: "1.2rem", fontWeight: "700", margin: "20px" }}
            >
              The Patient is not or is on oxygen:
            </InputLabel>
          </Grid12>
          <Grid item xs={12} md={6}>
            <Inputgroup
              label="(%)"
              name="s_o2"
              value={props.background.s_o2}
              onBlur={props.handleInput}
              text="The patient has been on "
            ></Inputgroup>
          </Grid>
          <Grid item xs={12} md={6}>
            <Inputgroup
              label="(hours)"
              name="b_o2_time"
              value={props.background.b_o2_time}
              onBlur={props.handleInput}
              text="For how long:"
            ></Inputgroup>
          </Grid>
          <Grid12>
            <Checkbox
              label="The oximeter does not detect a good puslse and is giving erratic readings."
              name="b_oximeter_detection"
              value={props.background.b_oximeter_detection}
              onBlur={props.handleInput}
            ></Checkbox>
          </Grid12>
        </Grid>
      </Paper>
    </div>
  );
}

export default Background;
