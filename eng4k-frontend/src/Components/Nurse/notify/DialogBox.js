import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DialogTest({ openDiag, handleChange }) {
  console.log("dialog component:", openDiag);

  const handleClickOpen = () => {
    // openDiag ? setOpen(true) : null;
  };

  const handleClose = () => {
    handleChange(false);
    // setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={openDiag}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Message Sent"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The physician has been notified.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
