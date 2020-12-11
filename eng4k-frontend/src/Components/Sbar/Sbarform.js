import React, { useCallback } from "react";
import Background from "./Background.js";
import Situation from "./Situation.js";
import Assessment from "./Assessment.js";
import Recommendation from "./Recommendation.js";
import { Form, ButtonForm, useForm } from "../Sbar/useForm.js";

const initialFieldValues = {
  note_id: "",
  note_patient_id: "",
  note_room_id: "",
  date_created: new Date(),
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
  b_oximeter_detection: false,
  a_problem: "",
  a_problem_cardiac: false,
  a_problem_infection: false,
  a_problem_neurologic: false,
  a_problem_respitory: false,
  a_problem_unsure_deterioriating: false,
  a_unstable: false,
  a_arrest: false,
  r_request: "",
  r_priority: false,
  r_patient_family_code_status: false,
  r_test_needed: "",
  r_change_treatment_ordered: "",
  r_freq_vital_signs: false,
  r_time_problem_will_last: false,
  r_problem_persist_contact: false,
};

const SituationMemo = React.memo(Situation);
const BackgroundMemo = React.memo(Background);
const AssessmentMemo = React.memo(Assessment);
const RecommendationMemo = React.memo(Recommendation);

export default function Sbarform(props) {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("s_unit" in fieldValues)
      temp.s_unit = fieldValues.s_unit ? "" : "This field is required";
    if ("note_patient_id" in fieldValues)
      temp.note_patient_id = fieldValues.note_patient_id
        ? ""
        : "This field is required";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInput } = useForm(
    initialFieldValues,
    true,
    validate
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // creatNewSbarNote();
      console.log("call api to make a post request");
    }
  };

  const creatNewSbarNote = useCallback(() => {
    fetch(`/nurse/patientId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
      }
    });
  }, [values]);

  initialFieldValues.note_patient_id = props.patientName;

  return (
    <Form onSubmit={handleSubmit}>
      <SituationMemo
        values={values}
        handleInput={handleInput}
        errors={errors}
        nurseName={props.nurseName}
        patientName={props.patientName}
      />
      <BackgroundMemo values={values} handleInput={handleInput} />
      <AssessmentMemo values={values} handleInput={handleInput} />
      <RecommendationMemo values={values} handleInput={handleInput} />

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
  );
}
