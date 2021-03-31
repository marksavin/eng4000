import react, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Collapse } from "@material-ui/core";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { Slide, Fade } from "@material-ui/core";
import firebase from "../../firebase/firebase";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckIcon from "@material-ui/icons/Check";

const MessageFile = (props) => {
  const [open, setOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [buttonHover, setButtonHover] = useState(false);
  const db = firebase.database();

  const handleClick = () => {
    console.log("key:", props.keyval);
    setOpen(!open);
  };
  const markread = () => {
    const ref = db.ref(`Nurse Remarks/${props.pID}/${props.keyval}`);
    ref.update({ read: true });
  };
  const markUnread = () => {
    setOpen(false);
    const ref = db.ref(`Nurse Remarks/${props.pID}/${props.keyval}`);
    ref.update({ read: false });
  };

  const deleteMsg = () => {
    //handleHoverOff();
    setOpen(false);
    setTimeout(() => {
      setFadeIn(false);
    }, 300);

    setTimeout(() => {
      const ref = db.ref(`Nurse Remarks/${props.pID}/${props.keyval}`).remove();
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
                props.readFlag === false ? "#fff0fd" : "#ffffff"
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
              <button className="acknowledgeButton">
                <CheckIcon style={{ Color: "#007a23" }} />
              </button>
            </div>
            <div className="PhysicianMsgUnreadContainer">
              <button className="MarkAsUnreadButton" onClick={markUnread}>
                Mark as Read
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
