/**
 * @file ForgotPassword.tsx
 * @description A reusable React component for rendering a responsive password recovery form with validation.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Haziel Magallanes
 * @date May 11, 2025
 */
import { useState, useEffect } from "react";
import React from "react";
import AppWindow from "../../UI/AppWindow";
import Logo from "../../UI/unitec/Logo";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import { useWindowSize } from "../../../hooks/responsive/useWindowSize";
import CodeVerication from "../../UI/form/CodeVerification";
import '../../../styles/ForgotPassword/ForgotPasswordCodeVerification.css'
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
const ForgotPasswordCodeVerification: React.FC = () => {
    // Re-Render on window resize
    const windowSize = useWindowSize();
    console.log("Window size:", windowSize);
 
        const initialText = "Volver a enviar";
        const countdownSeconds = 15; // Cambiá el tiempo que quieras

        const [timeLeft, setTimeLeft] = useState(0);

        useEffect(() => {
            if (timeLeft <= 0) return;

            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }, [timeLeft]);

        const handleClick = (e: React.MouseEvent) => {
            e.preventDefault();
            if (timeLeft === 0) {
                setTimeLeft(countdownSeconds);
                // Acá podés ejecutar la función que envía el código
            }
        };

        return (
            <div className="ForgotPassword ForgotPasswordCode">
                <Logo className="watermark" />
                <AppWindow width={348} height={370} style={
                    {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        rowGap: TranslateFigmaCoords.translateFigmaYAlt(10),
                        alignItems: "center",
                        position: "absolute",
                        top: "50%", left: "50%", translate: "-50% -50%",
                        padding:"TranslateFigmaCoords.translateFigmaYAlt(20) 0px",
                    }}>
                    <h1 className="title">Olvidé mi Contraseña</h1>
                    <div className="contenedor">
                        <div className="first-text">
                            <p>Se envio un codigo de verificacion al mail de <span>placeholder@gmail.com</span></p>

                        </div>
                        <div className="Bordes second-text">
                            <p>¿No recibiste el codigo? <a href="#"
                                onClick={handleClick}
                                style={{ pointerEvents: timeLeft > 0 ? "none" : "auto", opacity: timeLeft > 0 ? 0.6 : 1 }}
                            > {timeLeft > 0 ? `${timeLeft}s` : initialText}</a></p>
                        </div>
                        <div>
                            <form name="change-password" method="post">
                                <CodeVerication length={6} onChange={(code) => console.log("Código actual:", code)} />
                            </form>
                        </div>

                    </div>
                </AppWindow>
            </div>
        );
    };

    export default ForgotPasswordCodeVerification;