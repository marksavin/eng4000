import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  InputLabel,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const buttonStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function SubmitDone(props) {
  const buttonClass = buttonStyles();
  const { onClose, selectedValue, open } = props;

  console.log(props);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const hanldeReturnToHome = (event) => {};

  const returnKey = (event) => {
    if (event.which === 13) {
      if (props.status) {
        hanldeReturnToHome();
      } else {
        handleClose();
      }
    }
  };

  return (
    <div className="modalContainer">
      <Dialog
        style={{ textAlign: "center" }}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="simple-dialog-title">Submission Status</DialogTitle>
        <InputLabel>{props.statusMessage}</InputLabel>

        <div
          className={`submitDone-buttons ${buttonClass.root}`}
          style={{ margin: "1rem" }}
        >
          {props.status ? (
            <Link to={"/"}>
              <Button
                color="primary"
                variant="contained"
                label="Submit"
                onClick={hanldeReturnToHome}
                onKeyPress={returnKey}
              >
                Return To Home Page
              </Button>
            </Link>
          ) : (
            <Button
              color="secondary"
              variant="contained"
              label="close"
              onClick={handleClose}
              onKeyPress={returnKey}
            >
              Retry
            </Button>
          )}
        </div>
      </Dialog>
    </div>
  );
}

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
// };

export default SubmitDone;
