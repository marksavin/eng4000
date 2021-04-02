import React, { useState, useEffect } from "react";
import { TextField, Button, Collapse } from "@material-ui/core";

import firebase from "../firebase/firebase";

const ContactPhysicanCard = (props) => {
  const [physName, setPhysName] = useState("");
  const [physician_id, setPhysicianId] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState("Available");

  const [expanded, setExpanded] = useState(false);
  const [remarks, setRemarks] = useState("");
  const dbf = firebase.firestore();

  useEffect(() => {
    fetch(`/nurse/getPhysInfo/${props.patientId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad");
        }
      })
      .then((result) => {
        if (result !== undefined && result.length !== 0) {
          console.log("QUERY2: WOKRED", result);
          setPhysName(result[0].physician_name);
          setPhysicianId(result[0].physician_id);
          setSpecialty(result[0].physician_specialty);
        }
      });
  }, [props]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (e) => {
    setRemarks(e.target.value);
    console.log(remarks);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    var d = new Date();

    const item = {
      physician_id: physician_id,
      physician_name: physName,
      nurse_id: props.nurseId,
      nurse_name: props.nurseName,
      patient_id: props.patientId,
      patient_name: props.patientName,
      date_submitted: d.toLocaleString(),
      text: remarks,
      read: false,
      ack: false,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    };

    const res = dbf.collection(`msg`).add(item);
    handleExpandClick();
    props.onDialogSubmitChange(true);
    setRemarks("");
  };

  const handleCancelClick = () => {
    handleExpandClick();
    setRemarks("");
  };



  return (
    <div className="contactPcontainer">
      <div className="cardContainer">
        <div className="imageSpace">
          <div className="imageSpaceColBlock" color="primary"></div>

          <div className="imageDiv">
            <img
              className="AvImage"
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            />
          </div>
        </div>

        <div className="ContactContent">
          <div className="ContactText">
            <div className="ContactHeader">Dr. {`${physName}`}</div>
            <div className="ContactSpecialty">
              <span className="date">{specialty}</span>
            </div>
            <div className="description">{availability}</div>
          </div>
          <div
            className="ContactControlButton"
            style={expanded ? { padding: "5px" } : { padding: "25px" }}
          >
            <Collapse in={!expanded}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleExpandClick}
              >
                Request Contact
              </Button>
            </Collapse>
          </div>
        </div>

        <div className="extraContent">
          <Collapse in={expanded}>
            <form
              className="remarksForm"
              onSubmit={handleSubmitClick}
              onReset={handleCancelClick}
            >
              <div
                className="remarksText"
                style={({ width: "90%" }, { display: "flex" })}
              >
                <TextField
                  id="outlined-multiline-static"
                  label="Additional Remarks"
                  multiline
                  rows={3}
                  variant="outlined"
                  onChange={handleChange}
                  style={{ width: 210 }}
                  value={remarks}
                />
              </div>

              <div className="ContactButtons">
                <div className="ContactCancelButton">
                  <Button
                    style={{
                      maxWidth: "90px",
                      maxHeight: "30px",
                      minWidth: "25px",
                      minHeight: "25px",
                    }}
                    variant="contained"
                    color="secondary"
                    //onClick={handleExpandClick}
                    type="reset"
                  >
                    Cancel
                  </Button>
                </div>
                <div className="ContactSubmitButton">
                  <Button
                    style={{
                      maxWidth: "90px",
                      maxHeight: "30px",
                      minWidth: "25px",
                      minHeight: "25px",
                    }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default ContactPhysicanCard;
