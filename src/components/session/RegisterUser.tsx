import React from "react";
import "../../styles/index.css";
import TestingPlayground from "../../TestingPlayground";
import NavBar from '../UI/NavBar'

import AppWindow from '../UI/AppWindow'
import ActionButton from '../UI/ActionButton'
import Login from "./Login";
import Logo from "../UI/Logo";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import InputField from "../UI/InputField";
import TextBox from "../UI/textBox";

function RegisterUser() {
 return (
  <>
    <Logo className="watermark"></Logo>
    <AppWindow width={635} height={580} style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      rowGap: TranslateFigmaCoords.translateFigmaY(20),
      padding: TranslateFigmaCoords.translateFigmaY(20),
      flexDirection: "column",
      position: "absolute", 
      top: "50%", left: "50%", translate: "-50% -50%"
    }}>
        <span className="top-section title" 
        style={{
          height: TranslateFigmaCoords.translateFigmaY(80),
          width: "100%",
        }}> Registro de la Empresa</span>

        <div className="horizontal-display">
            <div className="left-section" style={{
            display: "flex",
            flexDirection: "column",
            paddingRight: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
            height: "100%",
            width: "50%",
            gap: "15px", // Added gap between InputFields
            }}>
            <InputField name="name-enterprise" type="text" placeholder="Nombre de la Empresa" width={305} height={55}/>
            <InputField name="mail-enterprise" type="text" placeholder="Correo Electrónico" width={305} height={55}/>
            <InputField name="password-enterprise" type="text" placeholder="Contraseña" width={305} height={55}/>
            <InputField name="password-confirm-enterprise" type="text" placeholder="Confirmar Contraseña" width={305} height={55}/>
            <InputField name="website-enterprise" type="text" placeholder="Enlace a su Página Web (Opcional)" width={305} height={55}/>
            <TextBox name="website-enterprise" placeholder="Descripción" width={305} height={110}/>
            </div>

          <div className="right-section" 
          style={{
            height: "100%",
            width: "50%",}}>
            <div className="half-component-top" 
            style={{
              height: "40%",
              width: "100%",
            }}></div>
            <div className="half-component-bottom" 
            style={{
              height: "60%",
              width: "100%",
            }}></div>
          </div>
        </div>
        
    </AppWindow>
  </>
    
 )
}

export default RegisterUser;