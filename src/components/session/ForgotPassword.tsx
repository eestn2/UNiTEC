import React from "react";
import "../../styles/index.css";
import InputField from "../UI/InputField";
import AppWindow from "../UI/AppWindow";
import Logo from "../UI/Logo";
import ActionButton from "../UI/ActionButton";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

const ForgotPassword: React.FC = () => {
    return (
        <div>
            <Logo className="watermark"/>
            <AppWindow width={370} height={620} style={
                {display: "flex", 
                flexDirection: "column", 
                rowGap: TranslateFigmaCoords.translateFigmaY(26),
                alignItems: "center", 
                position: "absolute", 
                top: "50%", left: "50%", translate: "-50% -50%"
                }}>
                <span className="title" style={{marginTop: TranslateFigmaCoords.translateFigmaY(40)}}>Olvidé mi Contraseña</span>
                <form name="change-password" style={{display: "flex", flexDirection:"column", alignItems: "flex-start", rowGap: TranslateFigmaCoords.translateFigmaY(18)}} method="post">
                    <div className="black-text" style={{display: "flex", flexDirection:"column", rowGap: "1px"}}>
                        <span style={{color: "#335A95"}}>Hemos enviado un codigo de verificación a: </span>
                        <span style={{textDecoration: "underline"}}>placeholder@gmail.com</span>
                    </div>
                    <InputField name="code" type="text" placeholder="Ingrese el codigo de verificación" width={320} height={50}/>
                    <div style={{display: "flex", flexDirection: "row", columnGap: "4px"}} className="black-text">
                        <span style={{color: "#335A95"}}>¿No recibiste el codigo?</span><a className="black-text">Volver a enviar</a>
                    </div>
                    <InputField name="password" type="password" placeholder="Ingrese la nueva contraseña" width={320} height={50}/>
                    <InputField name="confirm_password" type="password" placeholder="Confirme la contraseña" width={320} height={50}/>
                </form>
                <ActionButton height={60} text={"Confirmar"} width={100}/>
            </AppWindow>
        </div>
    );
};

export default ForgotPassword;