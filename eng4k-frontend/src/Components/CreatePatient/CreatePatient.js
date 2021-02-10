import React from "react";
//import DateFnsUtils from "@date-io/date-fns";
//import { DatePicker } from "@material-ui/pickers";
import { Button, TextField } from "@material-ui/core";

class CreatePatient extends React.Component {
  state = {
    //id: 0,
    fname: "",
    lname: "",
    //adDate: "", // have a function to get current date
    dOBDay: "",
    dOBMonth: "",
    dOBYear: "",
    weight: 0.0,
    height: 0.0,
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  handleSubmit = (event) => {
    event.preventDefault();
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
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <div className="container-CreatePatient">
          <div className="promptMessage">
            Please Enter the Following Information:
          </div>
          <div className="patientForm">
            <div className="cNames">
              <div className="FirstName">
                <div className="fname" noValidate autoComplete="off">
                  <TextField
                    id="fnameField"
                    label="First Name"
                    variant="outlined"
                    onChange={(e) => this.setState({ fname: e.target.value })}
                  />
                </div>
              </div>
              <div className="LastName">
                <div className="lname" noValidate autoComplete="off">
                  <TextField
                    id="lnameField"
                    label="Last Name"
                    variant="outlined"
                    onChange={(e) => this.setState({ lname: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="Dob">
              <label className="doblabel" htmlFor="dob">
                Date of Birth:
              </label>
              <div className="dobmonth" noValidate autoComplete="off">
                <TextField
                  id="dobMonthField"
                  label="mm"
                  variant="outlined"
                  onChange={(e) => this.setState({ dOBMonth: e.target.value })}
                />
              </div>
              -
              <div className="dobday" noValidate autoComplete="off">
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
              </div>
            </div>
            <div className="hW">
              <div className="Weight">
                <div className="weightForm" noValidate autoComplete="off">
                  <TextField
                    id="weightField"
                    label="Weight (lbs)"
                    variant="outlined"
                    onChange={(e) => this.setState({ weight: e.target.value })}
                  />
                </div>
              </div>
              <div className="Height">
                <div className="heightForm" noValidate autoComplete="off">
                  <TextField
                    id="heightField"
                    label="Height (m)"
                    variant="outlined"
                    onChange={(e) => this.setState({ height: e.target.value })}
                  />
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
