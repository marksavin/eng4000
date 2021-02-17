import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import GeneralCreatePage from "./GeneralCreatePage.js";
import { Link } from "react-router-dom";

import { Button, TextField } from "@material-ui/core";

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
              <div className="promptMessage">
                Please Enter the Following Information:
              </div>
              <div className="patientForm">
                <div className="cNames">
                  <GeneralCreatePage
                    title={"First Name"}
                    name={"fname"}
                    placeholder={"First Name"}
                    className="firstName cpInput"
                  />

                  <GeneralCreatePage
                    title={"Last Name"}
                    name={"lname"}
                    placeholder={"Last Name"}
                    className="lastName cpInput"
                  />
                </div>

                <div className="aod">
                  <GeneralCreatePage
                    title={"Admission Date"}
                    name={"admissionDate"}
                    type="date"
                    className="admissionDate cpInput"
                  />
                </div>

                <div className="dob">
                  <GeneralCreatePage
                    title={"Date of Birth"}
                    name={"dateOfBirth"}
                    type="date"
                    className="dateOfBirth cpInput"
                  />
                </div>

                <div className="cNames">
                  <GeneralCreatePage
                    title={"Weight"}
                    name={"weight"}
                    placeholder={"0.0"}
                    type="number"
                    className="weightField cpInput"
                  />

                  <GeneralCreatePage
                    title={"Height"}
                    name={"height"}
                    placeholder={"0.0"}
                    type="number"
                    className="weightField cpInput"
                  />
                </div>

                <div className="Buttons-createpatient">
                  <div className="cancBut">
                    <Button variant="contained" color="secondary">
                      <Link to="/admin" className="Button-text">
                        Cancel
                      </Link>
                    </Button>
                  </div>

                  <div className="subBut">
                    <Button variant="contained" color="primary" type="submit">
                      <a className="Button-text">Submit</a>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default CreatePatient;
