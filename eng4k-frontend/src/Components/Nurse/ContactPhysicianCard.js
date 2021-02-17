import React, { useState } from "react";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { TextField, Button, Collapse, IconButton } from "@material-ui/core";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";

const ContactPhysicanCard = (props) => {
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (e) => {
    setRemarks(e.target.value);
    console.log(remarks);
  };

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [remarks, setRemarks] = useState("");

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
            <div className="ContactHeader">{props.pname}</div>
            <div className="ContactSpecialty">
              <span className="date">{props.specialty}</span>
            </div>
            <div className="description">{props.availability}</div>
          </div>
          <div className="ContactControlButton">
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
            <form className="remarksForm">
              <div className="remarksText">
                <TextField
                  id="outlined-multiline-static"
                  label="Additional Remarks"
                  multiline
                  rows={3}
                  variant="outlined"
                  onChange={handleChange}
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
                    onClick={handleExpandClick}
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
