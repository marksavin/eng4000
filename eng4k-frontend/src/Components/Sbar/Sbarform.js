import React, { useState, useEffect } from "react";
import Background from "./Background.js";
import Situation from "./Situation.js";
import Assessment from "./Assessment.js";
import Recommendation from "./Recommendation.js";

import { makeStyles } from "@material-ui/core";
import { Form, ButtonForm } from "../Sbar/useForm.js";

const paperStyle = makeStyles((theme) => ({
  pageContent: {
    margin: "1%",
    padding: "2%",
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
  s_concern_o2: false,
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
  return (
    <div className="sbar">
      <div className="sbar-container">
        <Form>
          <Situation initialFieldValues={initialFieldValues} />
          <Background initialFieldValues={initialFieldValues} />
          <Assessment initialFieldValues={initialFieldValues} />
          <Recommendation initialFieldValues={initialFieldValues} />

          <div
            className="button-styles"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <ButtonForm label="Submit" type="submit" />
            <ButtonForm color="default" label="Reset" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
}
