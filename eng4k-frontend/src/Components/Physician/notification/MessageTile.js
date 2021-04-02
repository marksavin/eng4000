import react, { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Collapse } from "@material-ui/core";
import {  Fade } from "@material-ui/core";
import firebase from "../../firebase/firebase";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckIcon from "@material-ui/icons/Check";

const MessageFile = (props) => {
  const [open, setOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  const db = firebase.firestore();
  const [isAck, setIsAck] = useState();
  let res = [];

  useEffect(() => {
    const g = async () => {
      const ref = db.collection(`msg`).doc(props.keyval);
      res = await ref.get();
      const b = await res.get("ack");
      setIsAck(b);
    };

    g();
  }, [props.pID, res]);

  const handleClick = () => {
    setOpen(!open);
  };
  const markread = () => {
    const ref = db.collection(`msg`).doc(props.keyval);
    ref.update({ read: true });
  };
  const markUnread = () => {
    const ch = db.collection(`msg`).doc(props.keyval).update({ ack: false });
    setOpen(false);
    const ref = db.collection(`msg`).doc(props.keyval);
    ref.update({ read: false });
  };

  const markAcknowledge = async () => {
    setOpen(false);
    const ref = db.collection(`msg`).doc(props.keyval);
    const doc = await ref.get();
    const set = !doc.data().ack;
    ref.update({ ack: set });
  };

  const deleteMsg = () => {
    setOpen(false);
    setTimeout(() => {
      setFadeIn(false);
    }, 300);

    setTimeout(() => {
      const ref = db.collection(`msg`).doc(props.keyval).delete();
    }, 350);
  };


  return (
    <Fade in={fadeIn}>
      <div className="PhysicianMessage" style={{ padding: "5px" }}>
        <div className="physicianMsgInfo" onClick={handleClick}>
          <MenuItem
            className="PhysMsgTileMenuItem"
            style={{
              fontWeight: `${props.readFlag === false ? "650" : "450"}`,
              backgroundColor: `${
                isAck === true
                  ? "#dcf2e2"
                  : props.readFlag === false
                  ? "#fff0fd"
                  : "#ffffff"
              }`,
            }}
            onClick={markread}
          >
            <div style={{ textAlign: "center" }}>
              <div className="msgDate">{props.date}</div>
              <div className="msgPatName">Patient: {props.patient_name}</div>
              <div className="msgNurseName">Nurse: {props.nurse_name}</div>
            </div>
          </MenuItem>
        </div>
        <Collapse
          in={open}
          style={{
            color: "dimgray",
          }}
        >
          <div className="physicianMsgSection">
            <div className="PhysicianMsgContents">
              <div className="msgTextHeader">Message:</div>
              <div className="msgText">
                <p>{props.text}</p>
              </div>
            </div>
            <div className="PhysicianAcknowledgeContainer">
              <button className="acknowledgeButton" onClick={markAcknowledge}>
                <CheckIcon style={{ Color: "#007a23" }} />
              </button>
            </div>
            <div className="PhysicianMsgUnreadContainer">
              <button className="MarkAsUnreadButton" onClick={markUnread}>
                Mark Unread
              </button>
            </div>
            <div className="PhysicianMsgDeleteContainer">
              <button className="MsgDeleteButton" onClick={deleteMsg}>
                <HighlightOffIcon style={{ color: "#6e0000" }} />
              </button>
            </div>
          </div>
        </Collapse>
      </div>
    </Fade>
  );
};

export default MessageFile;
