import react, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Collapse } from "@material-ui/core";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import firebase from '../../firebase/firebase'

const MessageFile = (props) => {
  const [open, setOpen] = useState(false);
  const [rFlag, setrFlag] = useState(false);

  const handleClick = () => {
    console.log("key:", props.keyval);
    setOpen(!open);
  };

  const markread = () =>{

  }

  return (
    <div className="message" onClick={handleClick} style={{ padding: "5px" }}>
      <MenuItem
        // key={index}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className="msgDate"
          style={{
            fontSize: "11px",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          {props.date}
        </div>
        <div className="msgPatName">Patient: {props.patient_name}</div>
        <div className="msgNurseName">Nurse: {props.nurse_name}</div>
      </MenuItem>
      <Collapse
        in={open}
        style={{
          //   backgroundColor: "Azure",
          color: "dimgray",
        }}
      >
        <div className="msgContents">
          <div
            className="msgTextHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Message:
          </div>
          <p className="msgText">{props.text}</p>
        </div>
      </Collapse>
    </div>
  );
};

export default MessageFile;
