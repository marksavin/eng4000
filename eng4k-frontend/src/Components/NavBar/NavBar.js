import React, { useState} from "react";
import { useHistory} from "react-router-dom";
import Cookies from "js-cookie";
//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClinicMedical,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  const [open, setOpen] = useState(false);

  const history = useHistory();

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
        console.log("logout was unsuccessfull");
      }
    });
    props.setAuthenticate(false);
    Cookies.remove("token");
  };

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
            <li>
              <a href="#" className="navbar-links">
                Select Wing
              </a>
            </li>
            <li>
              <a href="#" className="navbar-links">
                Help
              </a>
            </li>
            <li>
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

export default NavBar;
