import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
}));

export default function ControlledOpenSelect({ fieldObject, ...props }) {
  const classes = useStyles();
  const [option, setOption] = React.useState("");
  const [open, setOpen] = React.useState(false);

  console.log(fieldObject);
  const name = fieldObject.field.name;
  const account = fieldObject.form.values.accountType;
  const error = fieldObject.meta.error;
  console.log(error);

  const accountType = ["Nurse", "Physician"];

  const nurseDepartments = [
    "Cardiology",
    "Emergency",
    "ICU",
    "Labour and Delivery",
  ];

  const nurseTypes = [
    "Licensed Practical",
    "Registered Nurse",
    "Charge Nurse",
    "Certified Nursing Assistance",
    "Head Nurse",
  ];

  const physicianDepartments = [
    "Cardiology",
    "Emergency",
    "ICU",
    "Labour and Delivery",
  ];

  const physicianTypes = [
    "Surgery",
    "Pediatrics",
    "Family Medicine",
    "Neurology",
  ];

  const handleAccountType = () => {
    return accountType.map((type, index) => (
      <MenuItem key={index} value={type}>
        {type}
      </MenuItem>
    ));
  };

  const handleNurseCases = () => {
    switch (props.stage) {
      case 1:
        return nurseTypes.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ));
      case 2:
        return nurseDepartments.map((department, index) => (
          <MenuItem key={index} value={department}>
            {department}
          </MenuItem>
        ));
      default:
        return <MenuItem value="-">-</MenuItem>;
    }
  };

  const handlePhysicianCase = () => {
    switch (props.stage) {
      case 1:
        return physicianTypes.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ));
      case 2:
        return physicianDepartments.map((department, index) => (
          <MenuItem key={index} value={department}>
            {department}
          </MenuItem>
        ));
      default:
        return <MenuItem value="-">-</MenuItem>;
    }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setOption(event.target.value);
    // field.form.initialValues.accountType = event.target.value;
    fieldObject.form.setFieldValue(
      props.name,
      event.target.value.toLowerCase()
    );
    // field.field.value = event.target.value;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          {props.option}
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={option}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {name === "accountType"
            ? handleAccountType()
            : account === "nurse" &&
              (name === "accountRole" || name === "department")
            ? handleNurseCases()
            : handlePhysicianCase()}
        </Select>
        {error ? <FormHelperText>{error}</FormHelperText> : null}
      </FormControl>
    </div>
  );
}
