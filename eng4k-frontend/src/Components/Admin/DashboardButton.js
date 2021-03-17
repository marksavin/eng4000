import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faUserNurse,
  faUserInjured,
  faChild,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(faStethoscope, faUserNurse, faUserInjured, faChild, faUnlockAlt);

const DashboardButton = (props) => {
  const [color, setColor] = useState("");
  const [iconUsed, setIconUsed] = useState("");

  var bgColors = {
    Physician: "#81b71a",
    Nurse: "#00B1E1",
    Patient: "#37BC9B",
    Family: "#E18029",
    Unlock: "#B22E44",
  };

  const choose = () => {
    if (props.title === "Physician") {
      setColor(bgColors.Physician);
      setIconUsed(faStethoscope);
    } else if (props.title === "Nurse") {
      setColor(bgColors.Nurse);
      setIconUsed(faUserNurse);
    } else if (props.title === "Patient") {
      setColor(bgColors.Patient);
      setIconUsed(faUserInjured);
    } else if (props.title === "Visitor") {
      setColor(bgColors.Family);
      setIconUsed(faChild);
    } else {
      setColor(bgColors.Unlock);
      setIconUsed(faUnlockAlt);
    }
  };

  useEffect(() => {
    choose();
  }, []);

  return (
    <div className="adminDashboardButtonContainer">
      <Link to={`/admin/${props.title}`} style={{ textDecoration: "none" }}>
        <div
          className="adminbuttonContainer"
          style={{ backgroundColor: `${color}` }}
        >
          <div className="containerbuttonicon">
            <div className="DashboardButtonicon">
              <FontAwesomeIcon
                className="adminuser-icon"
                icon={iconUsed}
                color={color}
              />
            </div>
          </div>
          {props.title !== "Unlock" ? (
            <div className="adminDashboardButtonContent">
              <div className="adminDashboardButtonName">{`Create ${props.title} Account`}</div>
              <div className="accountCounter">
                <div className="adminDashboardButtonCount">{`${props.count} ${props.title}s`}</div>
              </div>
            </div>
          ) : (
            <div className="adminDashboardButtonContent">
              <div className="adminDashboardButtonName">{`${props.title} Accounts`}</div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default DashboardButton;
