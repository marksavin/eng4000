import React from "react";
//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClinicMedical,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <header>
      <div className="navbar-contents">
        <a href="/">
          <FontAwesomeIcon className="logo fa-2x" icon={faClinicMedical} />
        </a>
        <nav className="navbar">
          <ul className="navbar-menu">
            <li className="search-icon">
              <input type="search" placeholder="search patient" />
              <FontAwesomeIcon className="close" icon={faTimes} />
              <FontAwesomeIcon className="search" icon={faSearch} />
            </li>
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
              <button className="logout" type="button">Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
