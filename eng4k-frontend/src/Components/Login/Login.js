import React, { useState } from "react";
import ResetPasswordModal from "../Modal/ResetPasswordModal";
import SubmitDone from "../Modal/SubmitDone";
//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMd, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

const Login = (props) => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false); //for modal
  const [statusMessage, setStatusMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const returnKey = (event) => {
    if (event.which === 13) {
      handleLogin();
    }
  };

  const handleLogin = () => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad");
        }
      })
      .then((result) => {
        console.log(result);
        if (result.user_type === undefined) {
          setStatusMessage(result);
        } else {
          props.setAccountType(`/${result.user_type}`);
          props.setAuthenticate(true);
          props.setUserToken(token);
        }
      });
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
                className="token login-input"
                type="text"
                placeholder="token"
                onChange={(e) => setToken({ token: e.target.value })}
                onKeyPress={returnKey}
              />
              <FontAwesomeIcon className="user-icon" icon={faUserMd} />
            </div>

            <div className="login-form-group">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className="password login-input"
                type="password"
                placeholder="password"
                onChange={(e) => setPassword({ password: e.target.value })}
                onKeyPress={returnKey}
              />
              <FontAwesomeIcon className="user-icon" icon={faUnlockAlt} />
            </div>
          </div>
          <div className="login-error" style={{ textAlign: "center" }}>
            <label style={{ color: "red" }}>{statusMessage}</label>
          </div>
          <div />
          <div className="login-button">
            <button className="button" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div>
            <label
              style={{ cursor: "pointer", color: "#33bbb3" }}
              type="button"
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Reset Password
            </label>
            <ResetPasswordModal open={open} onClose={handleClose} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
