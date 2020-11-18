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
          <FontAwesomeIcon className="logo" icon={faClinicMedical} />
        </a>
        <nav className="navbar">
          <ul className="navbar-menu">
            <li className="search-icon">
              <input type="search" placeholder="search" />
              <FontAwesomeIcon className="close" icon={faTimes} />
              <FontAwesomeIcon className="search" icon={faSearch} />
            </li>
            <li c>
              <a href="#">Select Wing</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
