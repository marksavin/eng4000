import React, { useState } from "react";
import { Grid, makeStyles, InputLabel, TextField } from "@material-ui/core";

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
  return <form className={classes.root}>{props.children}</form>;
}

export function Grid12(props) {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.root}>
      {props.children}
    </Grid>
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
        values={value}
        onChange={onChange}
      />
    </>
  );
}
