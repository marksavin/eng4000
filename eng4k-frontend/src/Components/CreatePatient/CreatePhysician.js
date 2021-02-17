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
  specialty: yup.string().required("Specialty is required*"),
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
  // handleClick = () => {
  //   console.log("hello world");
  //   <Switch>
  //     <Link to="/admin"></Link>
  //   </Switch>;
  // };
  render() {
    return (
      <Formik
        initialValues={{
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
            <form onSubmit={handleSubmit} className="form-p">
              <div className="promptMessage">
                Please Enter the Following Information:
              </div>
              <div className="patientForm-p">
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
                    title={"Specialty"}
                    name={"specialty"}
                    placeholder={"Specialty"}
                    className="specialty cpInput"
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
