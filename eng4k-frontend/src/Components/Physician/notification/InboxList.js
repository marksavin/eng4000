import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../firebase/firebase";
import MessageTile from "./MessageTile";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function InboxList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [colo, setColo] = useState(false);
  // const [inbox, setInbox] = useState([]);
  // const db = firebase.database();
  // let temp = [];
  // let item = [];

  // useEffect(() => {
  //   setInbox([]);
  //   console.log("useEffect Updated");
  //   const ref = db.ref(`Nurse Remarks/${props.physicianID}`);
  //   ref.on("value", (snapshot) => {
  //     snapshot.forEach((childSnapshot) => {
  //       item = childSnapshot.val();
  //       item.key = childSnapshot.key;
  //       temp.push(item);
  //     });

  //     if (!temp) return <div>No Messages</div>;
  //     setInbox(temp);
  //   });

  //   return () => ref.off();
  // }, [props.physicianID]);

  // useEffect(() => {
  //   console.log("newChange:", inbox);
  // }, [inbox]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    //renderMsg();
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    setColo(false);
  };

  const handleExpand = () => {
    console.log("colo", colo);
    setColo(!colo);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  //console.log("heres the inbox:", props.inbox);
  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{ color: "white" }}
        >
          Inbox
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <div className="inboxContainer">
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      {props.inbox.length > 0 ? (
                        props.inbox.map((details, index) => (
                          <div className="messages" key={index}>
                            <MessageTile
                              keyval={details.key} // this is the firebase key for that msg
                              patient_name={details.patient_name}
                              nurse_name={details.nurse_name}
                              date={details.date_submitted}
                              text={details.text}
                              readFlag={details.read}
                            />
                          </div>
                        ))
                      ) : (
                        <MenuItem>No Messages!</MenuItem>
                      )}
                    </MenuList>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
