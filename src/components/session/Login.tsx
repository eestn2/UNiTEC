import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../../styles/index.css";
import InputField from "../UI/InputField";
import AppWindow from "../UI/AppWindow";
import Logo from "../UI/Logo";
import ActionButton from "../UI/ActionButton";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import { Link } from "react-router-dom";
import axios from "axios";
import User from "./User";

const Login: React.FC = () => {
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setError] = useState('')
    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:80/UNITEC/src/php/requests/session/login.php', {
                email,
                password
            });
            if (response.status === 200 && response.data.status === "success") {
                const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
                document.cookie = `session=${JSON.stringify(response.data.user)}; path=/; expires=${expires};`;
                User.set(await response.data.user);
                location.reload();
            } else {
                console.error("Login failed:", await response.data.message);
                setError(response.data.message);
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
        }
    };
    
    return (
        <AppWindow width={370} height={650} style={{
            display: "flex", 
            flexDirection: "column", 
            rowGap: TranslateFigmaCoords.translateFigmaY(26),
            alignItems: "center", 
            position: "absolute", 
            height: "auto",
            top: "50%", left: "50%", translate: "-50% -50%"
        }}>
            <Logo width={180} height={180} logo_size={140} logo_text_size={34}/>
            <form 
                name="login"
                id="login"
                onSubmit={(event) => {handleLogin(event)}}
                style={{display: "flex", flexDirection:"column", alignItems: "center", rowGap: TranslateFigmaCoords.translateFigmaY(18)}}
            >
                <InputField name="user" type="text" placeholder="Dirección de correo electronico" width={320} height={50}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)}}/>
                <InputField name="password" type="password" placeholder="Contraseña" width={320} height={50}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value)}}/>
                <span style={{color: "#d40202"}}>{errors}</span>
                <ActionButton height={50} text={"Iniciar Sesión"} action={(event) => {
                    event.preventDefault();
                    const form = document.getElementById("login") as HTMLFormElement;
                    if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true })); 
                }}/>
            </form>
            <div style={{
                backgroundColor: "#D8DDF5",
                borderColor: "#FFD64F",
                borderTop: `${TranslateFigmaCoords.translateFigmaY(4)}px solid #FFD64F`,
                borderBottom: `${TranslateFigmaCoords.translateFigmaY(4)}px solid #FFD64F`,
                width: "100%",
                height: TranslateFigmaCoords.translateFigmaY(71),
                display: "flex",
                alignItems: "center"
            }}>
                <Link to={'/password-reset'} className="link" style={{marginLeft: TranslateFigmaCoords.translateFigmaX(27)}}>Restablecer contraseña</Link>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-start",
                alignItems: "flex-start",
                textAlign: "left",
                marginTop: -TranslateFigmaCoords.translateFigmaY(12),
                textIndent: TranslateFigmaCoords.translateFigmaX(27),
                color: "#00317B"
            }}>
                <span>¿No tienes una cuenta?</span>
                <span style={{paddingBottom: `${TranslateFigmaCoords.translateFigmaY(5)}px`}}>Registrate como <Link className="link" style={{color: "rgb(255, 193, 35)"}} to={'/register-enterprise'}>Empresa</Link> / <Link to={'register-user'} className="link" style={{color: "rgb(255, 193, 35)"}}>Estudiante</Link></span>
            </div>
        </AppWindow>
    );
};

export default Login;
