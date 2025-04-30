import React from "react";
import "../../styles/index.css";
import arrow_icon from "../../assets/icons/arrow.svg";
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
                    <label className="black-text">Metodo de recuperación: Correo <img src={arrow_icon} alt="" /></label>
                    <InputField name="password" type="password" placeholder="Ingrese la nueva contraseña" width={320} height={50}/>
                    <div>
                        <span className="black-text">Enviar codigo de verificación</span>
                        <div style={{display: "flex", flexDirection: "row", columnGap: "4px"}} className="black-text">
                            <span style={{color: "#953333"}}>¿No recibiste el codigo?</span><a className="black-text">Volver a enviar</a>
                        </div>
                    </div>
                    <InputField name="password" type="password" placeholder="Confirme la contraseña" width={320} height={50}/>
                </form>
                <ActionButton height={60} text={"Confirmar"} width={100}/>
            </AppWindow>
        </div>
    );
};

export default ForgotPassword;