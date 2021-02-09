import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import { ErrorMessage, Field, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { string, test, mixed, number, object } from "yup";

import ControlledOpenSelect from "./ControlledOpenSelect.js";
import FormikStepper from "./FormikStepper.js";

const Signup = () => {
  function generatePassword() {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length = 6;
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    console.log(result);
    return result;
  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#5bc8c2",
        main: "#33bbb3",
        dark: "#23827d",
      },
    },
  });

  return (
    <div className="login">
      <ThemeProvider theme={theme}>
        <Card>
          <CardContent>
            <FormikStepper
              initialValues={{
                accountType: "",
                firstName: "",
                lastName: "",
                department: "",
                accountRole: "",
                password: generatePassword(),
                token: "",
              }}
              onSubmit={() => {}}
            >
              <FormikStep
                label="Account type"
                validationSchema={object({
                  accountType: string().required(
                    "please select the account type"
                  ),
                })}
              >
                <Box paddingBottom={2}>
                  <Field name="accountType">
                    {(fieldObject) => (
                      <ControlledOpenSelect
                        option="Account Type"
                        name="accountType"
                        fieldObject={fieldObject}
                      />
                    )}
                  </Field>
                </Box>
              </FormikStep>

              <FormikStep
                validationSchema={object({
                  accountRole: string().required(
                    "Please select the appropriate role for the account"
                  ),
                  department: string().required(
                    "Please select the appropriate department"
                  ),
                })}
                label="Role and Department"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Box paddingBottom={2}>
                  <Field name="accountRole">
                    {(fieldObject) => (
                      <ControlledOpenSelect
                        option="Account Role"
                        stage={1}
                        name="accountRole"
                        fieldObject={fieldObject}
                      />
                    )}
                  </Field>
                </Box>
                <Box paddingBottom={2}>
                  <Field name="department">
                    {(fieldObject) => (
                      <ControlledOpenSelect
                        option="Department"
                        stage={2}
                        name="department"
                        fieldObject={fieldObject}
                      />
                    )}
                  </Field>
                </Box>
              </FormikStep>

              <FormikStep
                label="Personal Information"
                validationSchema={object({
                  firstName: string().required(
                    "Please enter the first name of the account holder"
                  ),
                  lastName: string().required(
                    "Please enter the last name of he account holder"
                  ),
                })}
              >
                <Box paddingBottom={2}>
                  <Field
                    fullWidth
                    name="firstName"
                    label="First Name"
                    component={TextField}
                  />
                </Box>
                <Box paddingBottom={2}>
                  <Field
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    component={TextField}
                  />
                </Box>
              </FormikStep>
              <FormikStep
                label="Token and Password"
                validationSchema={object({
                  password: string().required("please enter a password"),
                })}
              >
                <Box paddingBottom={2}>
                  <Field
                    fullWidth
                    name="token"
                    label="Login Token"
                    component={TextField}
                  />
                </Box>
                <Box paddingBottom={2}>
                  <Field
                    fullWidth
                    name="password"
                    label="Password"
                    component={TextField}
                  />
                </Box>
              </FormikStep>
            </FormikStepper>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export function FormikStep({ children }) {
  console.log(children);
  return <>{children}</>;
}

export default Signup;
