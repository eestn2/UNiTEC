/**
 * @file ForgotPassword.tsx
 * @description A reusable React component for rendering a responsive password recovery form with validation.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Haziel Magallanes
 * @date May 11, 2025
 */

import React from "react";
import InputField from "../UI/form/InputField";
import AppWindow from "../UI/AppWindow";
import Logo from "../UI/unitec/Logo";
import ActionButton from "../UI/ActionButton";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import { useWindowSize } from "../../hooks/responsive/useWindowSize";

/**
 * A React functional component that renders a password recovery form inside a responsive window.
 * Handles window resize for responsive design and displays input fields for verification code and new password.
 *
 * @component
 * @returns {JSX.Element} A styled window containing the password recovery form.
 *
 * @example
 * ```tsx
 * <ForgotPassword />
 * ```
 * @author Haziel Magallanes
 */
const ForgotPassword: React.FC = () => {
    // Re-Render on window resize
    const windowSize = useWindowSize();
    console.log("Window size:", windowSize);
        
    return (
        <div>
            <Logo className="watermark"/>
            <AppWindow width={370} height={620} style={
                {display: "flex", 
                flexDirection: "column", 
                rowGap: TranslateFigmaCoords.translateFigmaYAlt(26),
                alignItems: "center", 
                position: "absolute", 
                top: "50%", left: "50%", translate: "-50% -50%"
                }}>
                <span className="title" style={{marginTop: TranslateFigmaCoords.translateFigmaYAlt(40)}}>Olvidé mi Contraseña</span>
                <form name="change-password" style={{display: "flex", flexDirection:"column", alignItems: "flex-start", rowGap: TranslateFigmaCoords.translateFigmaYAlt(18)}} method="post">
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