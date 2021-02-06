import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedLogin = ({
  authenticate,
  component: Component,
  accountType,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticate ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: `${accountType}`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedLogin;
