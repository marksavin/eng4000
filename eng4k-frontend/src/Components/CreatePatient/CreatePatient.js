import React, { useState } from "react";
//import DateFnsUtils from "@date-io/date-fns";
//import { DatePicker } from "@material-ui/pickers";
import { Button } from "@material-ui/core";
// import * as yup from "yup";

// a schema is just a place to define a set of rules
// const reviewSchema = yup.object({
//   // here we create a yup object where we will define our schema
//   fName: yup.string().required(),
//   lName: yup.string().required(),
//   weight: yup.number().required,
//   height: yup.number().required,
// });

function CreatePatient(props) {
  const [form, setForm] = useState({
    //id: 0,
    fname: "",
    lname: "",
    //adDate: "", // have a function to get current date
    admissionDate: "",
    dateOfBirth: "",
    weight: 0.0,
    height: 0.0,
  });

  const handleSubmit = (event) => {
    // api call
    event.preventDefault();
    console.log(form);
    fetch(`/nurse/addNewPatient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
      }
    });
  };

  return (
    <form
      noValidate
      autoComplete="off"
      // validationschema={reviewSchema}
      onSubmit={this.handleSubmit}
    >
      <div className="container-CreatePatient">
        <div className="promptMessage">
          Please Enter the Following Information:
        </div>
        <div className="patientForm">
          <div className="cNames">
            {/* <!--    djhrjb --> */}
            <div>
              <div noValidate autoComplete="off">
                <label>
                  First Name
                  <input
                    placeholder="Full Name"
                    className="firstName"
                    onChange={(e) => setForm({ fname: e.target.value })}
                  />
                </label>
              </div>
            </div>

            <div>
              <div noValidate autoComplete="off">
                <label>
                  Last Name
                  <input
                    placeholder="Last Name"
                    className="lastName"
                    onChange={(e) => setForm({ lname: e.target.value })}
                  ></input>
                </label>
              </div>
            </div>
          </div>
          <div>
            <div className="aod">
              <label>
                Admission Date
                <input
                  type="date"
                  className="admissionDate"
                  onChange={(e) => setForm({ admissionDate: e.target.value })}
                ></input>
              </label>
            </div>
          </div>
          <div>
            {/* <label>Date of Birth:</label> */}
            <div className="dob">
              <label>
                Date of Birth
                <input
                  type="date"
                  className="dateOfBirth"
                  onChange={(e) => setForm({ dateOfBirth: e.target.value })}
                ></input>
              </label>
            </div>
            {/* - */}
            {/* <div className="dobday" noValidate autoComplete="off">
                <TextField
                  id="dobDayField"
                  label="dd"
                  variant="outlined"
                  onChange={(e) => this.setState({ dOBDay: e.target.value })}
                />
              </div>
              -
              <div className="dobyear" noValidate autoComplete="off">
                <TextField
                  id="dobYearField"
                  label="yyyy"
                  variant="outlined"
                  onChange={(e) => this.setState({ dOBYear: e.target.value })}
                />
              </div> */}
          </div>

          {/* <div className="hW"> */}
          <div className="cNames">
            <div>
              <div noValidate autoComplete="off">
                <label>
                  Weight
                  <input
                    placeholder="Weight (lbs)"
                    className="weightField"
                    onChange={(e) => setForm({ weight: e.target.value })}
                  />
                </label>
              </div>
            </div>

            <div>
              <div>
                <label>
                  Height
                  <input
                    placeholder="Height (in)"
                    className="heightField"
                    onChange={(e) => setForm({ height: e.target.value })}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="Buttons-createpatient">
          <div className="cancBut">
            <Button variant="contained" color="secondary">
              Cancel
            </Button>
          </div>

          <div className="subBut">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreatePatient;
