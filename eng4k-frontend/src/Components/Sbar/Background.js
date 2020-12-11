import React from "react";
import { Paper, Grid, makeStyles, InputLabel } from "@material-ui/core";
import { Grid12, Checkbox, Inputgroup } from "../Sbar/useForm.js";

const paperStyle = makeStyles((theme) => ({
  pageContent: {
    margin: "1%",
    padding: "2%",
  },
}));

const Background = React.memo(function Background(props) {
  const paperstyle = paperStyle();

  return (
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
            value={props.values.b_awareness_alert_oriented}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Checkbox
            label="Confused and cooperative."
            name="b_awareness_confused_cooperative"
            value={props.values.b_awareness_confused_cooperative}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Checkbox
            label="non-cooperative, agitated or combative."
            name="b_awareness_non_coop_agit_combative"
            value={props.values.b_awareness_non_coop_agit_combative}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Checkbox
            label="Stuporous and not talking clearly and possibly not able to swallow."
            name="b_awareness_stuporous"
            value={props.values.b_awareness_stuporous}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Checkbox
            label="Comatose. Eyes closed. Not responding to stimulation."
            name="b_awareness_comatose"
            value={props.values.b_awareness_comatose}
            onChange={props.handleInput}
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
            value={props.values.b_skin_warm_dry}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={4}>
          <Checkbox
            label="Pale"
            name="b_skin_pale"
            value={props.values.b_skin_pale}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={4}>
          <Checkbox
            label="Mottled"
            name="b_skin_mottled"
            value={props.values.b_skin_mottled}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={4}>
          <Checkbox
            label="Diaphoretic"
            name="b_skin_diaphoretic"
            value={props.values.b_skin_diaphoretic}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={4}>
          <Checkbox
            label="Extremities are cold"
            name="b_skin_extremities_cold"
            value={props.values.b_skin_extremities_cold}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid>
        <Grid item xs={12} md={4}>
          <Checkbox
            label="Extremities are warm"
            name="b_skin_extremities_warm"
            value={props.values.b_skin_extremities_warm}
            onChange={props.handleInput}
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
            label="(l/min) or (%)"
            name="s_o2"
            value={props.values.s_o2}
            onChange={props.handleInput}
            text="The patient has been on "
          ></Inputgroup>
          <Inputgroup
            label="(hours)"
            name="b_o2_time"
            value={props.values.b_o2_time}
            onChange={props.handleInput}
            text="For how long:"
          ></Inputgroup>
        </Grid12>
        <Grid12>
          <Checkbox
            label="The oximeter does not detect a good puslse and is giving erratic readings."
            name="b_oximeter_detection"
            value={props.values.b_oximeter_detection}
            onChange={props.handleInput}
          ></Checkbox>
        </Grid12>
      </Grid>
    </Paper>
  );
});

export default Background;
