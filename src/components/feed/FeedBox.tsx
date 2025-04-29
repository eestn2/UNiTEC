import React from "react";
import "../../styles/index.css";
import TestingPlayground from "../../TestingPlayground";
import NavBar from '../UI/NavBar'

import AppWindow from '../UI/AppWindow'
import ActionButton from '../UI/ActionButton'
import Login from "../session/Login";

function FeedBox() {
 return (
    <div className="App">
      <div>
        <NavBar />
        <div className="feedbox-section">
          <AppWindow height={600} width={880}></AppWindow>
          <AppWindow height={600} width={340}></AppWindow>
        </div>
        
      </div>
    </div>

 )
}

export default FeedBox;