/**
 * @file ChangePassword.tsx
 * @description A reusable React component for rendering a responsive password change form with validation.
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
/**
 * A React functional component that renders a password change form inside a responsive window.
 * Handles window resize for responsive design and displays input fields for new password and confirmation.
 *
 * @component
 * @returns {JSX.Element} A styled window containing the password change form.
 *
 * @example
 * ```tsx
 * <ChangePassword />
 * ```
 * @author Haziel Magallanes
 */
const ChangePassword: React.FC = () => {
    return (
        <div>
            <Logo className="watermark"/>
            <AppWindow width={370} height={560} vertical = {true} style={
                {display: "flex", 
                flexDirection: "column", 
                rowGap: TranslateFigmaCoords.translateFigmaYAlt(26),
                alignItems: "center", 
                position: "absolute", 
                top: "50%", left: "50%", translate: "-50% -50%"
                }}>
                <Logo width={180} height={180} logo_size={140} logo_text_size={34} vertical = {true} />
                <span className="title">Cambiar contraseña</span>
                <form name="change-password" style={{display: "flex", flexDirection:"column", alignItems: "center", rowGap: TranslateFigmaCoords.translateFigmaYAlt(18)}} method="post">
                    <InputField name="password" type="password" vertical = {true}  placeholder="Ingrese la nueva contraseña" width={320} height={50}/>
                    <InputField name="confirm_password" type="password" vertical = {true}  placeholder="Confirme la contraseña" width={320} height={50}/>
                </form>
                <ActionButton height={60} text={"Confirmar"} width={100} vertical = {true} />
            </AppWindow>
        </div>
    );
};

export default ChangePassword;