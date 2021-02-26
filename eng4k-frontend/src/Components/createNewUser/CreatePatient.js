import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import GeneralCreatePage from "./GeneralCreatePage.js";
import { Link } from "react-router-dom";

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
});
class CreatePatient extends React.Component {
  // handleSubmit = (event) => {
  // api call
  // event.preventDefault();
  // console.log("hello world");
  // console.log(this.state);
  // fetch(`/nurse/addNewPatient`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json;charset=utf-8",
  //   },
  //   body: JSON.stringify(this.state),
  // }).then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   } else {
  //   }
  // });
  // };
  render() {
    return (
      <Formik
        initialValues={{
          fname: "",
          lname: "",
          admissionDate: "",
          dateOfBirth: "",
          weight: "",
          height: "",
        }}
        validationSchema={formSchema}
        onSubmit={(data) => console.log(data)}
      >
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} className="form">
              <section className="patientForm">
                <div className="promptMessage">
                  <h3>Please Enter the Following Information:</h3>
                </div>
                <div class="full-name">
                  <div class="first-name">
                    <GeneralCreatePage
                      title={"First Name"}
                      name={"fname"}
                      placeholder={"First Name"}
                      className="firstName cpInput"
                    />
                  </div>
                  <div class="last-name">
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
                <div class="weight-height">
                  <div class="weight">
                    <GeneralCreatePage
                      title={"Weight"}
                      name={"weight"}
                      placeholder={"0.0"}
                      type="number"
                      className="weightField cpInput"
                    />
                  </div>
                  <div class="height">
                    <GeneralCreatePage
                      title={"Height"}
                      name={"height"}
                      placeholder={"0.0"}
                      type="number"
                      className="weightField cpInput"
                    />
                  </div>
                </div>

                <div class="buttons">
                  <div class="buttons-submit">
                    <Button variant="contained" color="primary" type="submit">
                      <a className="Button-text" className="Button-text subBut">
                        Submit
                      </a>
                    </Button>
                  </div>
                  <div class="buttons-cancel">
                    <Button variant="contained" color="secondary">
                      <Link to="/admin" className="Button-text cancBut">
                        Cancel
                      </Link>
                    </Button>
                  </div>
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
