import React from "react";
import "../styles/index.css";
import TestingPlayground from "../TestingPlayground";

import AppWindow from './UI/AppWindow'
import ActionButton from './UI/ActionButton'

function App() {
 return (
    <div className="App">
      <AppWindow width={350} height={620}/>
      <ActionButton height={60} text="Iniciar Sesión"/>
      <TestingPlayground/>
    </div>

 )
}

export default App;