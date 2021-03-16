import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import GeneralCreatePage from "./GeneralCreatePage.js";
import { Link } from "react-router-dom";

import { Button, TextField } from "@material-ui/core";

const formSchema = yup.object().shape({
  token: yup.string().required("Token is required*"),
  password: yup.string().required("Password is required*"),
  fname: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Name cannot contain a number")
    .required("First Name is required*"),
  lname: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Name cannot contain a number")
    .required("Last Name is required*"),
  specialty: yup.string().required("Specialty is required*"),
});
class CreatePatient extends React.Component {
  handleSubmit = (data) => {
    fetch(`/admin/addPhysician`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(this.data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
      }
    });
  };

  render() {
    return (
      <Formik
        initialValues={{
          token: "",
          password: "",
          fname: "",
          lname: "",
          department: "",
          specialty: "",
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

                <GeneralCreatePage
                  title={"Token"}
                  name={"token"}
                  placeholder={"Token"}
                  className="token cpInput"
                />

                <GeneralCreatePage
                  title={"Password"}
                  name={"password"}
                  placeholder={"Password"}
                  className="password cpInput"
                />

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

                <GeneralCreatePage
                  title={"Department"}
                  name={"department"}
                  placeholder={"Department"}
                  className="department cpInput"
                />

                <GeneralCreatePage
                  title={"Specialty"}
                  name={"specialty"}
                  placeholder={"Specialty"}
                  className="specialty cpInput"
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
              </section>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default CreatePatient;
