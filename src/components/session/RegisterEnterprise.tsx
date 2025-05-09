import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ActionButton from "../UI/ActionButton";
import "../../styles/index.css";
import AppWindow from "../UI/AppWindow";
import Logo from "../UI/Logo";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import InputField from "../UI/InputField";
import TextBox from "../UI/TextBox";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterEnterprise: React.FC = () => {
    // Re-Render on window resize for responsive design
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    console.log("Current window size: ", windowSize);
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    
    const [enterpriseName, setEnterpriseName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:80/UNITEC/src/php/requests/session/registerEnterprise.php', {
            enterpriseName,
            email,
            password,
            confirmPassword,
            website,
            description
        });
        console.log(response);
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
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
                    />
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