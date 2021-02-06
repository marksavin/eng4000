import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ authenticate, component: Component, ...rest }) => {
  console.log(authenticate);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticate ? (
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

export default ProtectedRoute;
