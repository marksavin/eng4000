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
      whiteSpace: "nowrap",
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

export function useForm(
  validateOnChange = false,
  validate,
  situation,
  background,
  assessment,
  recommendation
) {
  const [situationValue, setSituationValue] = useState(situation);
  const [backgroundValue, setBackgroundValue] = useState(background);
  const [assessmentValue, setAssessmentValue] = useState(assessment);
  const [recValue, setRecValue] = useState(recommendation);
  const [errors, setErrors] = useState({});

  // const handleInput = userCallback(() => {

  const handleReset = (event) => {
    setAssessmentValue(situation);
    setBackgroundValue(background);
    setAssessmentValue(assessment);
    setRecValue(recommendation);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name.charAt(0) === "s" || name.charAt(0) === "n") {
      setSituationValue({
        ...situationValue,
        [name]: value,
      });
    } else if (name.charAt(0) === "b") {
      setBackgroundValue({
        ...backgroundValue,
        [name]: value,
      });
    } else if (name.charAt(0) === "a") {
      setAssessmentValue({
        ...assessmentValue,
        [name]: value,
      });
    } else if (name.charAt(0) === "r") {
      setRecValue({
        ...recValue,
        [name]: value,
      });
    }
  };
  return {
    situationValue,
    backgroundValue,
    assessmentValue,
    recValue,
    errors,
    setErrors,
    handleInput,
    handleReset,
  };
}

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <ThemeProvider theme={theme}>
      <form className={classes.root} autoComplete="off" {...other}>
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
  const { name, label, defaultValue, onBlur } = props;
  return (
    <TextField
      size="small"
      variant="outlined"
      label={label}
      name={name}
      value={defaultValue}
      onBlur={onBlur}
    />
  );
}

export function Inputgroup(props) {
  const { name, label, defaultValue, onBlur, text, error = null } = props;
  return (
    <>
      <InputLabel>{text}</InputLabel>
      <TextField
        size="small"
        variant="outlined"
        label={label}
        name={name}
        value={defaultValue}
        onBlur={onBlur}
        {...(error && { error: true, helperText: error })}
      />
    </>
  );
}

export function Checkbox(props) {
  const { name, label, value, onBlur } = props;

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
              onBlur(convertToEventFromCheckbox(name, event.target.checked))
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
