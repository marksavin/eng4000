import React from "react";
//import DateFnsUtils from "@date-io/date-fns";
//import { DatePicker } from "@material-ui/pickers";
import { Box, Button, TextField } from "@material-ui/core";

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
                <form className="fname" noValidate autoComplete="off">
                  <TextField
                    id="fnameField"
                    label="First Name"
                    variant="outlined"
                    onChange={(e) => this.setState({ fname: e.target.value })}
                  />
                </form>
              </div>
              <div className="LastName">
                <form className="lname" noValidate autoComplete="off">
                  <TextField
                    id="lnameField"
                    label="Last Name"
                    variant="outlined"
                    onChange={(e) => this.setState({ lname: e.target.value })}
                  />
                </form>
              </div>
            </div>
            <div className="Dob">
              <label className="doblabel" htmlFor="dob">
                Date of Birth:
              </label>
              <form className="dobmonth" noValidate autoComplete="off">
                <TextField
                  id="dobMonthField"
                  label="mm"
                  variant="outlined"
                  onChange={(e) => this.setState({ dOBMonth: e.target.value })}
                />
              </form>
              -
              <form className="dobday" noValidate autoComplete="off">
                <TextField
                  id="dobDayField"
                  label="dd"
                  variant="outlined"
                  onChange={(e) => this.setState({ dOBDay: e.target.value })}
                />
              </form>
              -
              <form className="dobyear" noValidate autoComplete="off">
                <TextField
                  id="dobYearField"
                  label="yyyy"
                  variant="outlined"
                  onChange={(e) => this.setState({ dOBYear: e.target.value })}
                />
              </form>
            </div>
            <div className="hW">
              <div className="Weight">
                <form className="weightForm" noValidate autoComplete="off">
                  <TextField
                    id="weightField"
                    label="Weight (lbs)"
                    variant="outlined"
                    onChange={(e) => this.setState({ weight: e.target.value })}
                  />
                </form>
              </div>
              <div className="Height">
                <form className="heightForm" noValidate autoComplete="off">
                  <TextField
                    id="heightField"
                    label="Height (m)"
                    variant="outlined"
                    onChange={(e) => this.setState({ height: e.target.value })}
                  />
                </form>
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
