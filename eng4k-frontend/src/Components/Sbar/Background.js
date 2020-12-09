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

export default function Background(props) {
  const { values, setValues, handleInput } = useForm(props.initialFieldValues);
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
        <Grid xs={12} md={6}>
          <Checkbox
            label="Alert and oriented to person place and time."
            name="b_awareness_alert_oriented"
            value={values.b_awareness_alert_oriented}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={6}>
          <Checkbox
            label="Confused and cooperative."
            name="b_awareness_confused_cooperative"
            value={values.b_awareness_confused_cooperative}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={6}>
          <Checkbox
            label="non-cooperative, agitated or combative."
            name="b_awareness_non_coop_agit_combative"
            value={values.b_awareness_non_coop_agit_combative}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={6}>
          <Checkbox
            label="Stuporous and not talking clearly and possibly not able to swallow."
            name="b_awareness_stuporous"
            value={values.b_awareness_stuporous}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={6}>
          <Checkbox
            label="Comatose. Eyes closed. Not responding to stimulation."
            name="b_awareness_comatose"
            value={values.b_awareness_comatose}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid12>
          <InputLabel
            style={{ fontSize: "1.2rem", fontWeight: "700", margin: "20px" }}
          >
            The Skin is:
          </InputLabel>
        </Grid12>
        <Grid xs={12} md={4}>
          <Checkbox
            label="Warm and dry"
            name="b_skin_warm_dry"
            value={values.b_skin_warm_dry}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={4}>
          {" "}
          <Checkbox
            label="Pale"
            name="b_skin_pale"
            value={values.b_skin_pale}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={4}>
          {" "}
          <Checkbox
            label="Mottled"
            name="b_skin_mottled"
            value={values.b_skin_mottled}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={4}>
          <Checkbox
            label="Diaphoretic"
            name="b_skin_diaphoretic"
            value={values.b_skin_diaphoretic}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={4}>
          <Checkbox
            label="Extremities are cold"
            name="b_skin_extremities_cold"
            value={values.b_skin_extremities_cold}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
        <Grid xs={12} md={4}>
          <Checkbox
            label="Extremities are warm"
            name="b_skin_extremities_warm"
            value={values.b_skin_extremities_warm}
            onChange={handleInput}
          ></Checkbox>
        </Grid>
      </Grid>
    </Paper>
  );
}
