import React, { useState } from "react";
import Cookies from "js-cookie";
//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMd, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

const Login = (props) => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (token.token === "token" && password.password === "password") {
      Cookies.set("token", "/nurse");
      props.setAuthenticate(true);
      props.setAccountType("/nurse");
    }
  };

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
              <input
                className="token"
                type="text"
                placeholder="token"
                onChange={(e) => setToken({ token: e.target.value })}
              />
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
                onChange={(e) => setPassword({ password: e.target.value })}
              />
              <FontAwesomeIcon className="user-icon" icon={faUnlockAlt} />
            </div>
          </div>
          <div className="login-button">
            <button className="button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
