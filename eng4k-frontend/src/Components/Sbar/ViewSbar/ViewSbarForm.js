import React, { useState, useCallback, useEffect } from "react";
import Background from "./Background.js";
import Situation from "./Situation.js";
import Assessment from "./Assessment.js";
import Recommendation from "./Recommendation.js";
import { ButtonForm, useForm, Form } from "./UseFormView.js";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  CircularProgress,
} from "@material-ui/core/";

//CHECK NULL FIELDS TO SEE IF YOU CAN JUST MAKE THEM EMPTY STRINGS. MYSQL DOESNT LIKE NULL
const situation = {
  sbar_note_archive_patient_id: "",
  sbar_note_archive_patient_name: "",
  sbar_note_archive_room_id: "",
  sbar_note_archive_date_created: "",
  s_problem: "",
  s_code_status: "",
  s_BP: "",
  s_pulse: "",
  s_respiration: "",
  s_temperature: "",
  s_o2: "",
  s_concern_bp: "",
  s_concern_pulse: "",
  s_concern_temperature: "",
  s_concern_o2: "",
  s_concern_respiration: "",
};

const background = {
  b_awareness_alert_oriented: "",
  b_awareness_confused_cooperative: "",
  b_awareness_non_coop_agit_combative: "",
  b_awareness_lethargic: "",
  b_awareness_stuporous: "",
  b_awareness_comatose: "",
  b_skin_warm_dry: "",
  b_skin_pale: "",
  b_skin_mottled: "",
  b_skin_diaphoretic: "",
  b_skin_extremities_cold: "",
  b_skin_extremities_warm: "",
  b_o2_percent: "",
  b_o2_time: "",
  b_oximeter_detection: "",
};

const assessment = {
  a_problem: "",
  a_problem_cardiac: "",
  a_problem_infection: "",
  a_problem_neurologic: "",
  a_problem_respitory: "",
  a_problem_unsure_deterioriating: "",
  a_unstable: "",
  a_arrest: "",
};

const recommendation = {
  r_request: "",
  r_priority: "",
  r_patient_family_code_status: "",
  r_test_needed: "",
  r_freq_vital_signs: "",
  r_time_problem_will_last: "",
  r_problem_persist_contact: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#33bbb3",
    },
  },
});

export default function ViewSbarForm(props) {
  const [situationValue, setSituationValue] = useState(situation);
  const [backgroundValue, setBackgroundValue] = useState(background);
  const [assessmentValue, setAssessmentValue] = useState(assessment);
  const [recValue, setRecValue] = useState(recommendation);

  const [loadingSbarStatus, setLoadingSbarStatus] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    console.log(props.dateCreated, props.patientId);
    fetch(`/nurse/getSBARHistoryFields/${props.dateCreated}/${props.patientId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad");
        }
      })
      .then((result) => {
        //console.log(result);
        if (result !== undefined && result[0] !== 0) {
          for (let [key, value] of Object.entries(result[0])) {
            //console.log(`${key}: ${value}`);
            if (key.charAt(0) === "s") {
              setSituationValue((prevSituationValue) => {
                return { ...prevSituationValue, [key]: value };
              });
              // console.log(situationValue);
            } else if (key.charAt(0) === "b") {
              setBackgroundValue((prevBackgroundValue) => {
                return { ...prevBackgroundValue, [key]: value };
              });
            } else if (key.charAt(0) === "a") {
              setAssessmentValue((prevAssessmentValue) => {
                return { ...prevAssessmentValue, [key]: value };
              });
            } else if (key.charAt(0) === "r") {
              setRecValue((prevRecValue) => {
                return { ...prevRecValue, [key]: value };
              });
            }
          }
          setLoadingSbarStatus(true);
        }
      });
    // Update the document title using the browser API
    //situation.sbar_note_archive_patient_id = parseInt(props.patientId);
  }, [props]);

  return (
    <>
      {!loadingSbarStatus ? (
        <div className={classes.root}>
          <CircularProgress
            style={{ position: "fixed", top: "30%", left: "50%" }}
            size={200}
          />
        </div>
      ) : (
        <Form>
          <div>
            <Situation
              nurseName={props.nurseName}
              patientName={props.patientName}
              situation={situationValue}
            />
            <Background background={backgroundValue} />
            <Assessment assessment={assessmentValue} />
            <Recommendation recommendation={recValue} />
          </div>
        </Form>
      )}
    </>
  );
}
