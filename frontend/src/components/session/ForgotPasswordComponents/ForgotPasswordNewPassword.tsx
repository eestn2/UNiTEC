/**
 * @file ForgotPassword.tsx
 * @description A reusable React component for rendering a responsive password recovery form with validation.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Haziel Magallanes
 * @date May 11, 2025
 */
import InputField from "../../UI/form/InputField";
import React from "react";
import AppWindow from "../../UI/AppWindow";
import Logo from "../../UI/unitec/Logo";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import { useWindowSize } from "../../../hooks/responsive/useWindowSize";
import '../../../styles/ForgotPassword/ForgotPasswordNewPassword.css'
import ActionButton from "../../UI/ActionButton";
import { useNavigate } from "react-router-dom";
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
const ForgotPasswordNewPassword: React.FC = () => {
    // Re-Render on window resize 
    const navigate = useNavigate();
    const windowSize = useWindowSize();
    console.log("Window size:", windowSize);
    return (
        <div className="ForgotPassword ForgotPasswordNewPass ">
            <Logo className="watermark" />
            <AppWindow width={380} height={350} style={
                {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    rowGap: TranslateFigmaCoords.translateFigmaYAlt(10),
                    alignItems: "center",
                    position: "absolute",
                    top: "50%", left: "50%", translate: "-50% -50%",
                    padding: "TranslateFigmaCoords.translateFigmaYAlt(20) 0px",
                }}>
                <h1 className="title">Olvidé mi Contraseña</h1>
                <div className="contenedor">
                    <InputField name="userMail" type="mail" placeholder="Nueva contraseña" width={300} height={50} />
                    <InputField name="userMail" type="mail" placeholder="Reingrese la nueva contraseña" width={300} height={50} />
                    <ActionButton className="ActionButton" action={() => navigate('/')} vertical={true} height={60} text={"Confirmar"} width={120} />
                </div>
            </AppWindow>
        </div>
    );
};
export default ForgotPasswordNewPassword;