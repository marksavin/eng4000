import React, { useState } from "react";
//import DateFnsUtils from "@date-io/date-fns";
//import { DatePicker } from "@material-ui/pickers";
import {
  Button,
  TextField,
  Grid,
  Paper,
  makeStyles,
  InputLabel,
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const paperStyle = makeStyles((theme) => ({
  pageContent: {
    marginBottom: "50px",
    padding: "6%",
    alighItems: "center",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#33bbb3",
    },
    error: red,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
      verticleAlighn: "center",
    },
    " & .MuiInputBase-input": {
      display: "inline-block",
      alignItems: "center",
    },
    "& .MuiFormLabel-root": {
      display: "inline-block",
      whiteSpace: "nowrap",
    },
    "& .MuiGrid-root": {
      display: "flex",
      alignItems: "center",
      textAlign: "center",
    },
  },
}));

function CreatePatient(props) {
  const [form, setForm] = useState({
    //id: 0,
    fname: "",
    lname: "",
    //adDate: "", // have a function to get current date
    dOBDay: "",
    dOBMonth: "",
    dOBYear: "",
    weight: 0.0,
    height: 0.0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
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

  const paperstyle = paperStyle();
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={classes.root}
      >
        <div className="container-CreatePatient">
          <Paper className={paperstyle.pageContent} elevation={4}>
            <Grid container spacing={1}>
              <Grid item xs={12} className={classes.root}>
                <div className="promptMessage">
                  Please Enter the Following Information:
                </div>
              </Grid>
              <Grid item xs={12} md={6} className={classes.root}>
                <TextField
                  id="fnameField"
                  label="First Name"
                  variant="outlined"
                  onChange={(e) => setForm({ fname: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.root}>
                <TextField
                  id="lnameField"
                  label="Last Name"
                  variant="outlined"
                  onChange={(e) => setForm({ lname: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={3} className={classes.root}>
                <InputLabel style={{color: "black", marginLeft: '10px'}}>
                  Date of Birth:
                </InputLabel>
              </Grid>
              <Grid item xs={12} md={3} lg={2} className={classes.root}>
                <TextField
                  id="dobMonthField"
                  label="mm"
                  variant="outlined"
                  onChange={(e) => setForm({ dOBMonth: e.target.value })}
                />
              </Grid>
              -
              <Grid item xs={12} md={3} lg={2} className={classes.root}>
                <TextField
                  id="dobDayField"
                  label="dd"
                  variant="outlined"
                  onChange={(e) => setForm({ dOBDay: e.target.value })}
                />
              </Grid>
              -
              <Grid item xs={12} md={3} lg={2} className={classes.root}>
                <TextField
                  id="dobYearField"
                  label="yyyy"
                  variant="outlined"
                  onChange={(e) => setForm({ dOBYear: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.root}>
                <TextField
                  id="weightField"
                  label="Weight (lbs)"
                  variant="outlined"
                  onChange={(e) => setForm({ weight: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.root}>
                <TextField
                  id="heightField"
                  label="Height (m)"
                  variant="outlined"
                  onChange={(e) => setForm({ height: e.target.value })}
                />
              </Grid>
            </Grid>
            <div className="Buttons-createpatient">
              <Button
                variant="contained"
                color="secondary"
                className="cancBut"
                style={{ margin: "10px" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px" }}
              >
                Submit
              </Button>
            </div>
          </Paper>
        </div>
      </form>
    </ThemeProvider>
  );
}

export default CreatePatient;
