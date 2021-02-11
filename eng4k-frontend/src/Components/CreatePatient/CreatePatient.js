import React from "react";
//import DateFnsUtils from "@date-io/date-fns";
//import { DatePicker } from "@material-ui/pickers";
import { Button, TextField } from "@material-ui/core";
import * as yup from "yup";

// a schema is just a place to define a set of rules
const reviewSchema = yup.object({
  // here we create a yup object where we will define our schema
  fName: yup.string().required(),
  lName: yup.string().required(),
  weight: yup.number().required,
  height: yup.number().required,
});

class CreatePatient extends React.Component {
  state = {
    //id: 0,
    fname: "",
    lname: "",
    //adDate: "", // have a function to get current date
    admissionDate: "",
    dateOfBirth: "",
    weight: 0.0,
    height: 0.0,
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  handleSubmit = (event) => {
    // api call
    event.preventDefault();
    console.log(this.state);
    fetch(`/nurse/addNewPatient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(this.state),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
      }
    });
  };

  render() {
    return (
      <form
        noValidate
        autoComplete="off"
        validationschema={reviewSchema}
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
                  <label className="cpLabel">
                    First Name
                    <input
                      placeholder="Full Name"
                      className="firstName cpInput"
                      onChange={(e) => this.setState({ fname: e.target.value })}
                    />
                  </label>
                </div>
              </div>

              <div>
                <div noValidate autoComplete="off">
                  <label className="cpLabel">
                    Last Name
                    <input
                      placeholder="Last Name"
                      className="lastName cpInput"
                      onChange={(e) => this.setState({ lname: e.target.value })}
                    ></input>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <div className="aod">
                <label className="cpLabel">
                  Admission Date
                  <input
                    type="date"
                    className="admissionDate cpInput"
                    onChange={(e) =>
                      this.setState({ admissionDate: e.target.value })
                    }
                  ></input>
                </label>
              </div>
            </div>
            <div>
              {/* <label>Date of Birth:</label> */}
              <div className="dob">
                <label className="cpLabel">
                  Date of Birth
                  <input
                    type="date"
                    className="dateOfBirth cpInput"
                    onChange={(e) =>
                      this.setState({ dateOfBirth: e.target.value })
                    }
                  ></input>
                </label>
              </div>
            </div>

            {/* <div className="hW"> */}
            <div className="cNames">
              <div>
                <div noValidate autoComplete="off">
                  <label className="cpLabel">
                    Weight
                    <input
                      placeholder="Weight (lbs)"
                      className="weightField"
                      onChange={(e) =>
                        this.setState({ weight: e.target.value })
                      }
                    />
                  </label>
                </div>
              </div>

              <div>
                <div>
                  <label className="cpLabel">
                    Height
                    <input
                      placeholder="Height (in)"
                      className="heightField"
                      onChange={(e) =>
                        this.setState({ height: e.target.value })
                      }
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
}
export default CreatePatient;
