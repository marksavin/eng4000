import react, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faUnlockAlt,
  faStethoscope,
  faUserNurse,
  faUserInjured,
  faChild,
} from "@fortawesome/free-solid-svg-icons";

const DashboardButton = (props) => {
  const [color, setColor] = useState("");
  const [iconUsed, setIconUsed] = useState("");

  var bgColors = {
    Doctor: "#81b71a",
    Nurse: "#00B1E1",
    Patient: "#37BC9B",
    Family: "#E18029",
  };

  const iconD = "fas fa-stethoscope";
  const iconN = "fas fa-user-nurse";
  const iconP = "fas fa-user-injured";
  const iconF = "fas fa-child";

  const choose = () => {
    if (props.title === "Doctor") {
      setColor(bgColors.Doctor);
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
  });

  return (
    <div className="adminDashboardButtonContainer">
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
    </div>
  );
};

export default DashboardButton;
