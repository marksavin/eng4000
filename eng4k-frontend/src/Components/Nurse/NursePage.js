import React from "react";
import Table from "./Table";
import NavBar from "./../NavBar/NavBar";
import Header from "./Header";

export default class NursePage extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <Table />
      </div>
    );
  }
}
