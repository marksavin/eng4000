import React, { useState, useCallback, useEffect } from "react";
import Background from "./Background.js";
import Situation from "./Situation.js";
import Assessment from "./Assessment.js";
import Recommendation from "./Recommendation.js";
import { Form, ButtonForm, useForm } from "../Sbar/useForm.js";
import { faLaptopHouse } from "@fortawesome/free-solid-svg-icons";

import SubmitDone from "../Modal/SubmitDone";

//CHECK NULL FIELDS TO SEE IF YOU CAN JUST MAKE THEM EMPTY STRINGS. MYSQL DOESNT LIKE NULL
const situation = {
  note_id: "",
  note_patient_id: 0,
  note_nurse_id: 0,
  note_room_id: -1,
  date_created: "",
  s_problem: "",
  s_code_status: "",
  s_BP: -1,
  s_pulse: -1,
  s_respiration: -1,
  s_temperature: -1,
  s_o2: -1,
  s_concern_bp: false,
  s_concern_pulse: false,
  s_concern_temperature: false,
  s_concern_o2: false,
  s_concern_respiration: false,
};

const background = {
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
  b_o2_time: -1,
  b_oximeter_detection: false,
};

const assessment = {
  a_problem: "",
  a_problem_cardiac: false,
  a_problem_infection: false,
  a_problem_neurologic: false,
  a_problem_respitory: false,
  a_problem_unsure_deterioriating: false,
  a_unstable: false,
  a_arrest: false,
};

const recommendation = {
  r_request: "",
  r_priority: false,
  r_patient_family_code_status: false,
  r_test_needed: "",
  r_freq_vital_signs: "",
  r_time_problem_will_last: false,
  r_problem_persist_contact: false,
};

export default function Sbarform(props) {
  const [open, setOpen] = useState(false); //for modal
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const validate = (fieldValues = situationValue) => {
    let temp = { ...errors };
    if ("note_room_id" in fieldValues)
      temp.note_room_id = fieldValues.note_room_id
        ? ""
        : "This field is required";
    setErrors({
      ...temp,
    });

    if (fieldValues === situationValue)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    situationValue,
    backgroundValue,
    assessmentValue,
    recValue,
    errors,
    setErrors,
    handleInput,
  } = useForm(
    true,
    validate,
    situation,
    background,
    assessment,
    recommendation
  );

  let combinedValues = {};

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (validate()) {
    combinedValues = {
      ...situationValue,
      ...backgroundValue,
      ...assessmentValue,
      ...recValue,
    };
    console.log(combinedValues);

    console.log("Submit button was pressed");
    creatNewSbarNote();
  };

  const creatNewSbarNote = useCallback(() => {
    fetch(`/nurse/addNewSBAR/4`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(combinedValues),
    }).then((res) => {
      if (res.ok) {
        setStatus(1);
        setStatusMessage("SBAR was successfully submitted");
        handleClickOpen();
        return res.json();
      } else {
        setStatus(0);
        setStatusMessage("SBAR was not submitted");
        handleClickOpen();
      }
    });
  }, [combinedValues]);

  useEffect(() => {
    // Update the document title using the browser API
    situationValue.note_patient_id = parseInt(props.patientId);
    situationValue.note_nurse_id = parseInt(props.nurseId);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Situation
        handleInput={handleInput}
        errors={errors}
        nurseName={props.nurseName}
        patientName={props.patientName}
        situation={situationValue}
      />
      <Background handleInput={handleInput} background={backgroundValue} />
      <Assessment handleInput={handleInput} assessment={assessmentValue} />
      <Recommendation handleInput={handleInput} recommendation={recValue} />

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
        <ButtonForm color="default" label="Reset" />
        <div>
          <SubmitDone
            open={open}
            onClose={handleClose}
            status={status}
            statusMessage={statusMessage}
          />
        </div>
      </div>
    </Form>
  );
}
