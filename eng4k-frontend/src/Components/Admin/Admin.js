import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { TextField, Button, Collapse, IconButton } from "@material-ui/core";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import Navigation from "../NavBar/NavBar.js";

const Admin = (props) => {
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
      <div className="ui card">
        <div className="image">
          <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
        </div>

        <Navigation
          search={props.search}
          setSearch={props.setSearch}
          setAuthenticate={props.setAuthenticate}
        />

        <div className="content">
          <div className="header">{props.pname}</div>
          <div className="meta">
            <span className="date">{props.specialty}</span>
          </div>
          <div className="description">{props.availability}</div>
          <div className="controlButton">
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
                  rows={2}
                  variant="outlined"
                  onChange={handleChange}
                />
              </div>

              <div className="ContactButtons">
                <div className="ContactCancelButton">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleExpandClick}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="ContactSubmitButton">
                  <Button variant="contained" color="primary">
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

export default Admin;
