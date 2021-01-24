import React from "react";
import { Link } from "react-router-dom";
//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMd, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <section className="login">
      <div className="login-contents">
        <div className="login-title-sentence">
          <div className="login-title">Welcome Back</div>
          <div className="login-sentence">
            <p className="sentence">
              Please use the token provided by the admin to login
            </p>
          </div>
        </div>
        <div className="login-component">
          <div className="login-form">
            <div className="login-form-group">
              <label className="label" htmlFor="token">
                Token
              </label>
              <input className="token" type="text" placeholder="token" />
              <FontAwesomeIcon className="user-icon" icon={faUserMd} />
            </div>

            <div className="login-form-group">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className="password"
                type="password"
                placeholder="password"
              />
              <FontAwesomeIcon className="user-icon" icon={faUnlockAlt} />
            </div>
          </div>
          <div className="login-button">
            <Link to="/nurse">
              <button className="button">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
