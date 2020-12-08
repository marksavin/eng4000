import React from "react";

const Header = (props) => (
  <div className="nurse__title">
    <h1>{props.title}</h1>
  </div>
);

Header.defaultProps = {
  title: "Wing Hospital Name",
};

export default Header;
