/**
 * @file Login.tsx
 * @description Login page component for the application. It includes a form for user login, input fields for email and password, and a button to submit the form.
 * It also includes links for password reset and user registration. The component is styled to be responsive and centered on the screen.
 * @author Haziel Magallanes
 * @date May 11, 2025
 */

import React, { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../UI/form/InputField";
import AppWindow from "../UI/AppWindow";
import Logo from "../UI/unitec/Logo";
import ActionButton from "../UI/ActionButton";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import { Link } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import throbber from "../../assets/animated/Insider-loading.json";
/**
 * A React functional component that renders the login form inside a responsive window.
 * Handles window resize for responsive design, manages form state, and provides links for password reset and registration.
 *
 * @component
 * @returns {JSX.Element} A styled window containing the login form and navigation links.
 *
 * @example
 * ```tsx
 * <Login />
 * ```
 * @author Haziel Magallanes
 */
const Login: React.FC = () => {
    // State variables for form inputs and error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        try {
            setCargando(true);
            const response = await axios.post(`/session/login.php`, {
                email,
                password,
                withCredentials: true // Ensure cookies are sent with the request
            });
            if (response.status === 200 && response.data.status === "success") {
                // Session is now set server-side; reload to update app state
                window.location.reload();
            } else {
                console.log(response);
                console.error("Login failed:", await response.data.message);
                setError(response.data.message);
                setCargando(false);
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            setError("No se ha podido establecer la conexión. Intentelo de nuevo más tarde.");
        }
    };

    return (
        <AppWindow width={370} height={650} vertical={true} style={{
            display: "flex",
            flexDirection: "column",
            rowGap: TranslateFigmaCoords.translateFigmaYAlt(26),
            alignItems: "center",
            position: "absolute",
            height: "auto",
            top: "50%", left: "50%", translate: "-50% -50%"
        }}>
            <Logo width={180} height={180} logo_size={140} logo_text_size={34} vertical={true} />
            <form
                name="login"
                id="login"
                onSubmit={(event) => { handleLogin(event) }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: TranslateFigmaCoords.translateFigmaYAlt(18) }}
            >
                <InputField name="user" type="text" vertical={true} placeholder="Dirección de correo electrónico" width={320} height={50}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value) }} />
                <InputField name="password" type="password" vertical={true} placeholder="Contraseña" width={320} height={50}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value) }} />
                <span style={{ color: "#d40202", width: TranslateFigmaCoords.translateFigmaXAlt(320), textAlign: "center" }}>{errors}</span>
                {cargando ?
                    <ActionButton vertical={true} height={50} width={200} text=""  style={{ backgroundColor: 'white', color: '#888', border: '2px solid #ccc', cursor: 'not-allowed'}} action={(event) => {
                        event.preventDefault();
                    }}> 
                    
                         <Lottie
                                animationData={throbber}  
                                loop={true}
                                autoplay={true}
                                style={{height:'100%',scale:1.5}}
                            /> 
               
                           

                    </ActionButton>
                    :
                    <ActionButton vertical={true} width={200} height={50} text="Iniciar Sesión" action={(event) => {
                        event.preventDefault();
                        const form = document.getElementById("login") as HTMLFormElement;
                        if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                    }} />
                }

            </form>
            <div style={{
                backgroundColor: "#D8DDF5",
                borderColor: "#FFD64F",
                borderTop: `${TranslateFigmaCoords.translateFigmaYAlt(4)}px solid #FFD64F`,
                borderBottom: `${TranslateFigmaCoords.translateFigmaYAlt(4)}px solid #FFD64F`,
                width: "100%",
                height: TranslateFigmaCoords.translateFigmaYAlt(71),
                display: "flex",
                alignItems: "center"
            }}>
                <Link to={'/password-reset'} className="link" style={{ marginLeft: TranslateFigmaCoords.translateFigmaXAlt(27) }}>Restablecer contraseña</Link>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-start",
                alignItems: "flex-start",
                textAlign: "left",
                marginTop: -TranslateFigmaCoords.translateFigmaYAlt(12),
                textIndent: TranslateFigmaCoords.translateFigmaXAlt(27),
                color: "#00317B"
            }}>
                <span>¿No tienes una cuenta?</span>
                <span style={{ paddingBottom: `${TranslateFigmaCoords.translateFigmaYAlt(10)}px` }}>Registrate como <Link className="link" style={{ color: "rgb(255, 193, 35)" }} to={'/register-enterprise'}>Empresa</Link> / <Link to={'register-user'} className="link" style={{ color: "rgb(255, 193, 35)" }}>Estudiante</Link></span>
            </div>
        </AppWindow>
    );
};

export default Login;