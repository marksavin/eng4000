import React from "react";
import { NavBarItems } from "./NavbarItems.js";
import styles from "../../Styles/NavBar/NavBar.scss";

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">LOGO</h1>
      <div className="navbar-icon"></div>
      <ul>
        {NavBarItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.class} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
