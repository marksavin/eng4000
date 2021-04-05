import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClinicMedical,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import firebase from "../../firebase/firebase";

import InboxList from "./InboxList";

const PhysicianNavBar = (props) => {
  const [open, setOpen] = useState(false);
  const [inbox, setInbox] = useState([]);
  const [physID, setPhysID] = useState(props.physicianID);
  const db = firebase.firestore();
  let temp = [];
  let item = [];

  const history = useHistory();

  useEffect(() => {
    if (props.physicianID !== undefined && props.physicianID !== "") {
      const ref = db.collection("msg");
      const q = ref
        .orderBy("timestamp", "desc")
        .where("physician_id", "==", props.physicianID)

        .onSnapshot((snapshot) => {
          temp = [];
          snapshot.forEach((childSnapshot) => {
            item = childSnapshot.data();
            item.key = childSnapshot.id;
            temp.push(item);
          });

          setInbox(temp);
        });
    }
  }, [props.physicianID]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSearchInput = (event) => {
    props.setSearch(event.target.value);
  };

  const handleReset = (event) => {
    props.setSearch("");
  };

  const handleLogout = () => {
    fetch("/login/logout").then((res) => {
      if (res.ok) {
        history.push("/");
        return res.json();
      } else {
        // console.log("logout was unsuccessfull");
      }
    });
    props.setAuthenticate(false);
    Cookies.remove("token");
  };

  console.log("heres the inbox:", inbox);
  return (
    <header className="main-navbar">
      <div className="navbar-contents">
        <a href="/">
          <FontAwesomeIcon className="logo fa-2x" icon={faClinicMedical} />
        </a>
        <a className="search-icon">
          <input
            type="search"
            placeholder="search patient"
            value={props.search}
            onChange={handleSearchInput}
          />
          <FontAwesomeIcon
            className="close"
            icon={faTimes}
            onClick={handleReset}
          />
          <FontAwesomeIcon className="search" icon={faSearch} />
        </a>

        <div
          onClick={handleClick}
          className={open ? "hamburger-module active" : "hamburger-module"}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav className="navbar">
          <ul className={open ? "navbar-menu active" : "navbar-menu"}>
            <li style={{ listStyle: "none", display: "inline-block" }}>
              <div className="msgListContainer">
                <InboxList physicianID={props.physicianID} inbox={inbox} />
              </div>
            </li>
            <li className="navBar-li">
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default PhysicianNavBar;
