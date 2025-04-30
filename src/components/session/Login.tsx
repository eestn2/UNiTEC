import React from "react";
import "../../styles/index.css";
import InputField from "../UI/InputField";
import AppWindow from "../UI/AppWindow";
import Logo from "../UI/Logo";
import ActionButton from "../UI/ActionButton";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

const Login: React.FC = () => {
    return (
        <AppWindow width={370} height={650} style={
            {display: "flex", 
            flexDirection: "column", 
            rowGap: TranslateFigmaCoords.translateFigmaY(26),
            alignItems: "center", 
            position: "absolute", 
            top: "50%", left: "50%", translate: "-50% -50%"
            }}>
            <Logo width={180} height={180} logo_size={140} logo_text_size={34}/>
            <form name="login" style={{display: "flex", flexDirection:"column", alignItems: "center", rowGap: TranslateFigmaCoords.translateFigmaY(18)}} method="post">
                <InputField name="user" type="text" placeholder="Ingrese su usuario" width={320} height={50}/>
                <InputField name="password" type="password" placeholder="Ingrese su contraseña" width={320} height={50}/>
            </form>
            <ActionButton height={50} text={"Iniciar Sesión"}/>
            <div style={{
                backgroundColor: "#D8DDF5",
                borderColor: "#FFD64F",
                borderTop: `${TranslateFigmaCoords.translateFigmaY(4)}px solid #FFD64F`,
                borderBottom: `${TranslateFigmaCoords.translateFigmaY(4)}px solid #FFD64F`,
                width: "100%",
                height: TranslateFigmaCoords.translateFigmaY(71),
                display: "flex",
                alignItems: "center"}}>
                <a style={{marginLeft: TranslateFigmaCoords.translateFigmaX(27)}}>Restablecer contraseña</a>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-start",
                alignItems: "flex-start",
                textAlign: "left",
                marginTop: -TranslateFigmaCoords.translateFigmaY(12),
                textIndent: TranslateFigmaCoords.translateFigmaX(27),
                color: "#00317B"}}>
                <span>¿No tienes una cuenta?</span>
                <span>Registrate como <a style={{color: "rgb(255, 193, 35)"}}>Empresa</a> / <a style={{color: "rgb(255, 193, 35)"}}>Estudiante</a></span>
            </div>
        </AppWindow>
    );
};

export default Login;
