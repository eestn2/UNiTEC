import React from "react";
import "../styles/index.css";
import TestingPlayground from "../TestingPlayground";
import NavBar from './UI/NavBar'

import AppWindow from './UI/AppWindow'
import ActionButton from './UI/ActionButton'

function App() {
 return (
    <div className="App">
      <NavBar/>
      <div className="feedbox-section">
        <AppWindow width={880} height={600}/>
        <AppWindow width={340} height={600}/>
      </div>
      
      <ActionButton height={60} text="Iniciar Sesión"/>
      <TestingPlayground/>
    </div>

 )
}

export default App;