import React from "react";
import Table from "./Table";
import PatientTable from "./PatientTable.js";
import NavBar from "./../NavBar/NavBar";
import Header from "./Header";

export default class NursePage extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar />
        <Header />
        <PatientTable />
      </div>
    );
  }
}
