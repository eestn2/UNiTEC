import React from "react";
import "../../styles/index.css";
import TestingPlayground from "../../TestingPlayground";
import NavBar from '../UI/NavBar'

import AppWindow from '../UI/AppWindow'
import ActionButton from '../UI/ActionButton'
import Login from "./Login";

function RegisterUser() {
 return (
    <div className="register-user">
      <div className="side-sections">

      </div>
      <AppWindow height={635} width={620}>
        <div className="name-section">
          <h1>Registro de Usuario</h1>
        </div>
        <div className="line" style={{
          height: "4px",
          right: (342 / 1280) * innerWidth}}></div>
        <div className="horizontal-section">
          <div className="data-section">

          </div>
          <div className="line" style={{width: "4px", height: "90%"}}></div>
          <div className="data-section">

          </div>
        </div>
      </AppWindow>
      <div className="side-sections"></div>
    </div>

 )
}

export default RegisterUser;