//testing
import React, { useState } from "react";
//import styles
import "./Styles/app.scss";
//import components
import Navigation from "./Components/NavBar/NavBar.js";
import Login from "./Components/Login/Login.js";
import NursePage from "./Components/Nurse/NursePage.js";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  const [loginActive, setLoginActive] = useState(true);

  return (
    <div className="App">
      {/*loginActive ? <Login setLoginActive={setLoginActive} /> : <Navigation />*/}
      <NavBar />
      <NursePage />
    </div>
  );
}

export default App;
