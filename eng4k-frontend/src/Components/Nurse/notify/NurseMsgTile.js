import react, { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Collapse } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import firebase from "../../firebase/firebase";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";
import SendRoundedIcon from "@material-ui/icons/Send";

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

  const deleteMsg = () => {
    setOpen(false);
    setTimeout(() => {
      setFadeIn(false);
    }, 300);

    setTimeout(() => {
      const ref = db.collection(`msg`).doc(props.keyval).delete();
    }, 400);
  };

  return (
    <Fade in={fadeIn}>
      <div className="PhysicianMessage" style={{ padding: "5px" }}>
        <div className="physicianMsgInfo" onClick={handleClick}>
          <MenuItem
            className="PhysMsgTileMenuItem"
            style={{
              fontWeight: `${isAck === true ? "650" : "450"}`,
              backgroundColor: `${isAck === true ? "#dcf2e2" : "#ffffff"}`,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div className="msgDate">{props.date}</div>
              <div className="msgPatName">Patient: {props.patient_name}</div>
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
              <div className="msgTextHeader">To: Dr {props.physician_name}</div>
              <div className="NurseMsgText">
                <p>{props.text}</p>
              </div>
              <div className="NurseMsgIconSection">
                <div className="NurseMsgIconContainer">
                  <div className="NurseMsgIconText">
                    {isAck ? "seen" : "delivered"}
                  </div>
                  <div className="NurseMsgIcon">
                    {isAck ? (
                      <CheckIcon
                        style={{
                          color: "white",
                          fontSize: "15",
                          Transform: "translate(100px 0px)",
                        }}
                      />
                    ) : (
                      <SendRoundedIcon
                        style={{ color: "white", fontSize: "12" }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="NurseMsgDeleteContainer">
              <button className="NurseMsgDeleteButton" onClick={deleteMsg}>
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
