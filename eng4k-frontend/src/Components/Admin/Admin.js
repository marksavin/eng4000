import React from "react";
import Navigation from "../NavBar/NavBar.js";
import { Switch, Route, Link } from "react-router-dom";

const Admin = (props) => {
  return (
    <div>
      <Navigation
        search={props.search}
        setSearch={props.setSearch}
        setAuthenticate={props.setAuthenticate}
      />
      <Switch>
        <Route exact path="/admin">
          <h1>Hello World</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default Admin;
