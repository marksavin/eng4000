import React, { useState } from "react";
import { Button, Stepper, StepLabel, Step, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";

const FormikStepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children);

  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const currentChild = childrenArray[step];

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      validationSchema={currentChild.props.validationSchema}
      {...props}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          console.log(values);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      <Form autoComplete="off">
        {currentChild}
        <Grid container spacing={2}>
          {step > 0 ? (
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </Button>
            </Grid>
          ) : null}
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              {isLastStep() ? "Submit" : "Next"}
            </Button>
          </Grid>
        </Grid>
        <Stepper alternativeLabel activeStep={step}>
          {childrenArray.map((child, index) => (
            <Step key={child.props.label} completed={step > index || completed}>
              <StepLabel>{child.props.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Form>
    </Formik>
  );
};

export default FormikStepper;
