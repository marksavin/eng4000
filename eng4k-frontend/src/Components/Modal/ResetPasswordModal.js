import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  InputLabel,
  TextField,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

const inputStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const buttonStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function ResetPasswordModal(props) {
  const inputClass = inputStyles();
  const buttonClass = buttonStyles();
  const { onClose, selectedValue, open } = props;

  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState();
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleToken = (event) => {
    setToken(event.target.value);
  };

  const handlePassword = (event) => {
    setNewPassword(event.target.value);
  };

  const returnKey = (event) => {
    if (event.which === 13) {
      handleReset();
    }
  };

  const handleTokenCheck = (event) => {
    fetch(`/login/tokenExists/${event.target.value}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad");
        }
      })
      .then((result) => {
        if (result !== "User exist") {
          setErrorStatus(true);
          setErrorText(result);
        } else {
          setErrorStatus(false);
          setErrorText("");
        }
      });
  };

  const handleReset = (event) => {
    console.log(token, newPassword);
    fetch(`/login/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: token,
        newPassword: newPassword,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad");
        }
      })
      .then((result) => {
        handleClose();
      });
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <form className="resetPassword-form">
        <DialogTitle id="simple-dialog-title">Reset Password</DialogTitle>
        <InputLabel>Please type in your token and new password</InputLabel>
        <div className={`resetPassword-inputFields ${inputClass.root}`}>
          <TextField
            className="token"
            id="outlined-basic"
            label="Token"
            variant="outlined"
            onChange={handleToken}
            onBlur={handleTokenCheck}
            error={errorStatus}
            helperText={errorText}
          />
          <TextField
            className="newPassword"
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            onChange={handlePassword}
          />
        </div>
        <div className={`resetPassword-buttons ${buttonClass.root}`}>
          <Button
            color="primary"
            variant="contained"
            label="Submit"
            onClick={handleReset}
          >
            Submit
          </Button>
          <Button
            color="default"
            variant="contained"
            label="close"
            onClick={handleClose}
            onKeyPress={returnKey}
          >
            Close
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
// };

export default ResetPasswordModal;
