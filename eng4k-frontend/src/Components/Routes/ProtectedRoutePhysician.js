import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoutePhysician = ({
  authenticate,
  account_type,
  component: Component,
  ...rest
}) => {
  console.log(authenticate);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticate & (account_type === "/physician") ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoutePhysician;
