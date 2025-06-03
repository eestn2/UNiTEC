/**
 * @file RegisterEnterprise.tsx
 * @description A reusable React component for rendering a responsive enterprise registration form.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */

import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import ActionButton from "../UI/ActionButton";
import AppWindow from "../UI/AppWindow";
import Logo from "../UI/unitec/Logo";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import InputField from "../UI/form/InputField";
import TextBox from "../UI/form/TextBox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useWindowSize } from "../../hooks/responsive/useWindowSize";

/**
 * A React functional component that renders a registration form for enterprises inside a responsive window.
 * Handles form state, input validation, and submission to the backend. Includes fields for enterprise name, email, password, website, and description.
 *
 * @component
 * @returns {JSX.Element} A styled window containing the enterprise registration form.
 *
 * @example
 * ```tsx
 * <RegisterEnterprise />
 * ```
 * @author Daviel Díaz Gonzáles
 */
const RegisterEnterprise: React.FC = () => {
    // Re-Render on window resize
    const windowSize = useWindowSize();
    console.log("Window size:", windowSize);
    // State variables for form inputs
    const [enterpriseName, setEnterpriseName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');

    const [ error, setError ] = useState<ReactElement | undefined>();
    const navigate = useNavigate()

    function getWrongPassText(): ReactElement{
        return confirmPassword !== password ? <span className="error">Las contraseñas no coinciden.</span> : <></>;
    }

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault(); 
        if (confirmPassword !== password) return;
        try {
            const response = await axios.post(`/session/user-register.php`, {
                name: enterpriseName,
                email,
                password,
                portfolio: website,
                user_type: 1, // 1 for enterprise
                description: description
            });
            if (response.status === 200 && response.data.status === "success") {
                //navigate('/')
                console.log(response.data);
            } else {
                console.error("Register failed:", await response.data.message);
                setError(<span className="error">{response.data.message}</span>);
            }
        } catch (error) {
            console.error("An error occurred during register:", error);
            setError(<span className="error">No se ha podido establecer la conexión. Intentelo de nuevo más tarde.</span>);
        }
    };

    return (
      <>
      <Logo className="watermark"></Logo>
      <AppWindow width={655} height={580} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            rowGap: TranslateFigmaCoords.translateFigmaY(20),
            padding: `${TranslateFigmaCoords.translateFigmaY(20)}px`,
            flexDirection: "column",
            position: "absolute",
            top: "50%", left: "50%", translate: "-50% -50%"
        }}>

            <span className="top-section title" 
                style={{
                    display: "flex",
                    height: TranslateFigmaCoords.translateFigmaY(80),
                    width: "100%",
                    paddingBottom: TranslateFigmaCoords.translateFigmaY(10),
                }}>
                Registro de la Empresa
            </span>
            <form 
                name="register-enterprise"
                id="register-enterprise"
                onSubmit={handleRegister}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%"
                }}
            >
                <div className="vertical-sections" style={{ paddingRight: TranslateFigmaCoords.translateFigmaY(20) }}>
                    <InputField 
                        name="name-enterprise" 
                        type="text" 
                        placeholder="Nombre de la Empresa" 
                        width={305} 
                        height={55}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setEnterpriseName(event.target.value)}
                    />
                    <InputField 
                        name="mail-enterprise" 
                        type="text" 
                        placeholder="Correo Electrónico" 
                        width={305} 
                        height={55}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                    />
                    <InputField 
                        name="password-enterprise" 
                        type="password" 
                        placeholder="Contraseña" 
                        width={305} 
                        height={55}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                    />
                    <InputField 
                        name="password-confirm-enterprise" 
                        type="password" 
                        placeholder="Confirmar Contraseña" 
                        width={305} 
                        height={55}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setConfirmPassword(event.target.value);
                        }}
                    />
                    {getWrongPassText()}
                    <InputField 
                        name="website-enterprise" 
                        type="text" 
                        placeholder="Enlace a su Página Web (Opcional)" 
                        width={305} 
                        height={55}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setWebsite(event.target.value)}
                    />
                    <TextBox 
                        name="description-enterprise" 
                        placeholder="Descripción" 
                        width={305} 
                        height={110}
                        style={{ resize: "none" }}
                        className="input-field"
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)}
                    />
                </div>
                <div className="vertical-sections" style={{
                    borderLeft: "3px solid rgba(255, 193, 35, 1)",
                    paddingLeft: TranslateFigmaCoords.translateFigmaY(20),
                }}>
                    <span className="form-text">Si has rellenado todos los campos necesarios solo queda:</span>
                    <ActionButton height={60} text={"Registrarse"} action={(event) => {
                        event.preventDefault();
                        const form = document.getElementById("register-enterprise") as HTMLFormElement;
                        if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                    }}/>
                    {error}
                    <div className="delimiter"></div>
                    <span className="form-text">
                        Registrarse como <Link to={'/register-user'} className="golden-link">Estudiante</Link><br />
                        ¿Ya tienes cuenta? <Link to={'/'} className="golden-link">Iniciar Sesión</Link>
                    </span>
                </div>
            </form>
        </AppWindow>
      </>
        
    );
};

export default RegisterEnterprise;