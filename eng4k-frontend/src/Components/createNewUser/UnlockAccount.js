import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import GeneralCreatePage from "./GeneralCreatePage.js";
import { Link } from "react-router-dom";
import SubmitDone from "../Modal/SubmitDone";

import { Button, TextField } from "@material-ui/core";

const formSchema = yup.object().shape({
  token: yup.string().required("Token is required*"),
});
class UnlockAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false,
      status: 0,
      statusMessage: "",
    };
  }

  handleClickOpen = () => {
    this.setState(() => ({ open: true }));
  };

  handleClose = (value) => {
    this.setState(() => ({ open: false }));
  };

  handleSubmit = (data) => {
    console.log("etch is called");
    fetch(`/admin/unlockAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad");
        }
      })
      .then((result) => {
        if (result !== undefined) {
          if (result[0] === "S") {
            this.setState(() => ({ status: 1 }));
            this.setState(() => ({
              statusMessage: result,
            }));
            this.handleClickOpen();
          } else {
            this.setState(() => ({ status: 0 }));
            this.setState(() => ({
              statusMessage: result,
            }));
            this.handleClickOpen();
          }
        }
      });
  };

  render() {
    return (
      <Formik
        initialValues={{
          token: "",
        }}
        validationSchema={formSchema}
        onSubmit={(data) => this.handleSubmit(data)}
      >
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} className="form">
              <section className="patientForm">
                <div className="promptMessage">
                  <h3>Please Enter the Token to unlock the account:</h3>
                </div>

                <GeneralCreatePage
                  title={"Token"}
                  name={"token"}
                  placeholder={"Token"}
                  className="token cpInput"
                />
                <div className="buttons">
                  <div className="buttons-submit">
                    <Button variant="contained" color="primary" type="submit">
                      <a className="Button-text" className="Button-text subBut">
                        Submit
                      </a>
                    </Button>
                  </div>
                  <div className="buttons-cancel">
                    <Button variant="contained" color="secondary">
                      <Link to="/admin" className="Button-text cancBut">
                        Cancel
                      </Link>
                    </Button>
                  </div>
                </div>
                <div>
                  <SubmitDone
                    open={this.state.open}
                    onClose={this.handleClose}
                    status={this.state.status}
                    statusMessage={this.state.statusMessage}
                  />
                </div>
              </section>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default UnlockAccounts;
