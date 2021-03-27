import react, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Collapse } from "@material-ui/core";

const MessageFile = (props) => {
  const [open, setOpen] = useState(false);
  console.log("key:", props.keyval);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="message" onClick={handleClick} style={{ padding: "5px" }}>
      <MenuItem
        // key={index}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="msgPatName">Patient: {props.patient_name}</div>
        <div className="msgNurseName">Nurse: {props.nurse_name}</div>
        <div className="msgDate">{props.date}</div>
      </MenuItem>
      <Collapse
        in={open}
        style={{
          //   backgroundColor: "Azure",
          color: "dimgray",
        }}
      >
        Message: {props.text}
      </Collapse>
    </div>
  );
};

export default MessageFile;
