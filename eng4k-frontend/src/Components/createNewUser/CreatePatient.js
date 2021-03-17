import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import GeneralCreatePage from "./GeneralCreatePage.js";
import { Link } from "react-router-dom";
import SubmitDone from "../Modal/SubmitDone";

import { Button, Grid, TextField } from "@material-ui/core";

const formSchema = yup.object().shape({
  fname: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Name cannot contain a number")
    .required("First Name is required*"),
  lname: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Name cannot contain a number")
    .required("Last Name is required*"),
  admissionDate: yup.string().required("Admission Date is required*"),
  dateOfBirth: yup.string().required("Date of Birth is required*"),
  weight: yup.number().required("Weight is required*"),
  height: yup.number().required("Height is required*"),
  patient_id: yup.number().required("Patient ID is required*"),
  physician_id: yup.number().required("Physician ID is required*"),
  nurse_id: yup.number().required("Nurse ID is required*"),
  room_id: yup.number().required("Room number is required*"),
});
class CreatePatient extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false,
      status: 0,
      statusMessage: "",
    };
  }

  handleClickOpen = () => {
    this.setState(() => ({ open: true }));
    // this.setState.open = true;
  };

  handleClose = (value) => {
    this.setState(() => ({ open: false }));
  };

  handleSubmit = (data) => {
    fetch(`/admin/addPatient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        this.handleClickOpen();
        this.setState(() => ({ status: 1 }));
        this.setState(() => ({
          statusMessage: "Patient account was successfully created",
        }));
        return res.json();
      } else {
        this.handleClickOpen();
        this.setState(() => ({ status: 0 }));
        this.setState(() => ({
          statusMessage: "There was an error creating the patient account",
        }));
      }
    });
  };

  render() {
    return (
      <Formik
        initialValues={{
          patient_id: "",
          fname: "",
          lname: "",
          admissionDate: "",
          dateOfBirth: "",
          weight: "",
          height: "",
          nurse_id: "",
          physician_id: "",
          room_id: "",
        }}
        validationSchema={formSchema}
        onSubmit={(data) => this.handleSubmit(data)}
      >
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} className="form">
              <section className="patientForm">
                <div className="promptMessage">
                  <h3>Please Enter the Following Information:</h3>
                </div>
                <div className="full-name">
                  <div className="first-name">
                    <GeneralCreatePage
                      title={"First Name"}
                      name={"fname"}
                      placeholder={"First Name"}
                      className="firstName cpInput"
                    />
                  </div>
                  <div className="last-name">
                    <GeneralCreatePage
                      title={"Last Name"}
                      name={"lname"}
                      placeholder={"Last Name"}
                      className="lastName cpInput"
                    />
                  </div>
                </div>
                <GeneralCreatePage
                  title={"Admission Date"}
                  name={"admissionDate"}
                  type="date"
                  className="admissionDate cpInput"
                />
                <GeneralCreatePage
                  title={"Date of Birth"}
                  name={"dateOfBirth"}
                  type="date"
                  className="dateOfBirth cpInput"
                />
                <div className="weight-height">
                  <div className="weight">
                    <GeneralCreatePage
                      title={"Weight"}
                      name={"weight"}
                      placeholder={"0.0"}
                      type="number"
                      className="weightField cpInput"
                    />
                  </div>
                  <div className="height">
                    <GeneralCreatePage
                      title={"Height"}
                      name={"height"}
                      placeholder={"0.0"}
                      type="number"
                      className="weightField cpInput"
                    />
                  </div>
                </div>

                <GeneralCreatePage
                  title={"Patient ID"}
                  name={"patient_id"}
                  type="text"
                  className="patient_id cpInput"
                  placeholder="Patient ID"
                />
                <GeneralCreatePage
                  title={"Physician ID"}
                  name={"physician_id"}
                  type="text"
                  className="physician_id cpInput"
                  placeholder="Physician ID"
                />
                <GeneralCreatePage
                  title={"Nurse ID"}
                  name={"nurse_id"}
                  type="text"
                  className="nurse_id cpInput"
                  placeholder="Nurse ID"
                />
                <GeneralCreatePage
                  title={"Room Number"}
                  name={"room_id"}
                  type="text"
                  className="room_id cpInput"
                  placeholder="Room Number"
                />

                <div className="buttons">
                  <div className="buttons-submit">
                    <Button variant="contained" color="primary" type="submit">
                      <a className="Button-text" className="Button-text subBut">
                        Submit
                      </a>
                    </Button>
                  </div>
                  <div className="buttons-cancel">
                    <Button variant="contained" color="secondary">
                      <Link to="/admin" className="Button-text cancBut">
                        Cancel
                      </Link>
                    </Button>
                  </div>
                </div>
                <div>
                  <SubmitDone
                    open={this.state.open}
                    onClose={this.handleClose}
                    status={this.state.status}
                    statusMessage={this.state.statusMessage}
                  />
                </div>
              </section>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default CreatePatient;
