import React from "react";
//import DateFnsUtils from "@date-io/date-fns";
//import { DatePicker } from "@material-ui/pickers";
import { Box, Button } from "@material-ui/core";

class CreatePatient extends React.Component {
  state = {
    id: 0,
    fname: "",
    lname: "",
    adDate: "", // have a function to get current date
    dOBDay: "",
    dOBMonth: "",
    dOBYear: "",
    weight: 0.0,
    height: 0.0,
  };
  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="promptMessage">
            Please Enter the Following Information:
          </div>
          <div className="patientForm">
            <div className="cNames">
              <div className="FirstName">
                <label className="fnameLabel" htmlFor="firstName">
                  First Name:
                </label>
                <input
                  className="fname"
                  type="text"
                  onChange={(e) => this.setState({ fname: e.target.value })}
                />
              </div>
              <div className="LastName">
                <label className="lNameLabel" htmlFor="lastName">
                  Last Name:
                </label>
                <input
                  className="lname"
                  type="text"
                  onChange={(e) => this.setState({ lname: e.target.value })}
                />
              </div>
              <div className="Dob">
                <label className="doblabel" htmlFor="dob">
                  Date of Birth:
                </label>
                <input
                  className="dobMonth"
                  type="text"
                  placeholder="mm"
                  onChange={(e) => this.setState({ dOBMonth: e.target.value })}
                />
                -
                <input
                  className="dobday"
                  type="text"
                  placeholder="dd"
                  onChange={(e) => this.setState({ dOBDay: e.target.value })}
                />
                -
                <input
                  className="dobyear"
                  type="text"
                  placeholder="yyyy"
                  onChange={(e) => this.setState({ dOBYear: e.target.value })}
                />
              </div>
              <div className="Weight">
                <label className="weightLabel" htmlFor="weight">
                  Weight:
                </label>
                <input
                  className="weight"
                  type="text"
                  onChange={(e) => this.setState({ weight: e.target.value })}
                />{" "}
                lbs
              </div>
              <div className="Height">
                <label className="heightLabel" htmlFor="height">
                  Height:
                </label>
                <input
                  className="height"
                  type="text"
                  onChange={(e) => this.setState({ height: e.target.value })}
                ></input>
                m
              </div>
            </div>
          </div>
          <div className="Buttons">
            <div className="cancBut">
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
            </div>
            <div className="subBut">
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CreatePatient;
