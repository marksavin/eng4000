import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRouteNurse = ({
  authenticate,
  accountType,
  path,
  component: Component,
  ...rest
}) => {
  // console.log(authenticate);
  // console.log(accountType);
  // console.log(path);
  let auth = false;

  // useEffect(() => {
  //   fetch("/isAuthenticated")
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         console.log("network response was bad");
  //       }
  //     })
  //     .then((result) => {
  //       if (result) {
  //         console.log("im in the protected route thing");
  //         auth = true;
  //         // setAuthenticate(true);
  //       } else {
  //         console.log("im in the protected route thing");
  //         auth = false;
  //         // setAuthenticate(false);
  //       }
  //     });
  // }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticate & (accountType === path) ? (
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

export default ProtectedRouteNurse;
