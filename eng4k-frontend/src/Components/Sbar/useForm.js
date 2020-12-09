import React, { useState } from "react";
import {
  Grid,
  ThemeProvider,
  makeStyles,
  createMuiTheme,
  InputLabel,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  Button,
} from "@material-ui/core";

import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
      verticleAlighn: "center",
    },
    " & .MuiInputBase-input": {
      display: "inline-block",
    },
    "& .MuiFormLabel-root": {
      display: "inline-block",
    },
    "& .MuiGrid-root": {
      display: "flex",
      alignItems: "center",
    },
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

export function useForm(initialFieldValues) {
  const [values, setValues] = useState(initialFieldValues);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    handleInput,
  };
}

export function Form(props) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <form className={classes.root} autoComplete="off">
        {props.children}
      </form>
    </ThemeProvider>
  );
}

export function Grid12(props) {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.root}>
      {props.children}
    </Grid>
  );
}

export function Grid6(props) {
  const classes = useStyles();
  return (
    <Grid item xs={6} className={classes.root}>
      {props.children}
    </Grid>
  );
}

export function TextFieldSingle(props) {
  const { name, label, value, onChange } = props;
  return (
    <TextField
      size="small"
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

export function Inputgroup(props) {
  const { name, label, value, onChange, text } = props;
  return (
    <>
      <InputLabel>{text}</InputLabel>
      <TextField
        size="small"
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export function Checkbox(props) {
  const { name, label, value, onChange } = props;

  const convertToEventFromCheckbox = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(event) =>
              onChange(convertToEventFromCheckbox(name, event.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}

const buttonStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

export function ButtonForm(props) {
  const { label, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();
  const buttonstyles = buttonStyles();

  return (
    <Button
      classes={{ root: buttonstyles.root, label: buttonstyles.label }}
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
    >
      {label}
    </Button>
  );
}
