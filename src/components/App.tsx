import React from "react";
import "../styles/index.css";
import TestingPlayground from "../TestingPlayground";
import NavBar from './UI/NavBar'

import AppWindow from './UI/AppWindow'
import ActionButton from './UI/ActionButton'
import Login from "./session/Login";

function App() {
 return (
    <div className="App">
      <Login></Login>
    </div>
    
 )
}

export default App;