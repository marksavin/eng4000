import React, { useState } from "react";
import { Link } from "react-router-dom";
//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClinicMedical,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSearchInput = (event) => {
    props.setSearch(event.target.value);
  };

  const handleReset = (event) => {
    props.setSearch("");
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
              <Link to="/">
                <button className="logout" type="button">
                  Logout
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
