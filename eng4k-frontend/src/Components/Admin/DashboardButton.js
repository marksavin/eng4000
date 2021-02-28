import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faUserNurse,
  faUserInjured,
  faChild,
} from "@fortawesome/free-solid-svg-icons";

const DashboardButton = (props) => {
  const [color, setColor] = useState("");
  const [iconUsed, setIconUsed] = useState("");

  var bgColors = {
    Physician: "#81b71a",
    Nurse: "#00B1E1",
    Patient: "#37BC9B",
    Family: "#E18029",
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
    } else {
      setColor(bgColors.Family);
      setIconUsed(faChild);
    }
  };

  useEffect(() => {
    choose();
  }, []);

  return (
    <div className="adminDashboardButtonContainer">
      <Link to={`/admin/add${props.title}`} style={{ textDecoration: "none" }}>
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
          <div className="adminDashboardButtonContent">
            <div className="adminDashboardButtonName">{`Create ${props.title} Account`}</div>
            <div className="accountCounter">
              <div className="adminDashboardButtonCount">{`${props.count} ${props.title}s`}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DashboardButton;
