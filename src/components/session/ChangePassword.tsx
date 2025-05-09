import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import InputField from "../UI/InputField";
import AppWindow from "../UI/AppWindow";
import Logo from "../UI/Logo";
import ActionButton from "../UI/ActionButton";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

const ChangePassword: React.FC = () => {
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

    return (
        <div>
            <Logo className="watermark"/>
            <AppWindow width={370} height={560} style={
                {display: "flex", 
                flexDirection: "column", 
                rowGap: TranslateFigmaCoords.translateFigmaY(26),
                alignItems: "center", 
                position: "absolute", 
                top: "50%", left: "50%", translate: "-50% -50%"
                }}>
                <Logo width={180} height={180} logo_size={140} logo_text_size={34}/>
                <span className="title">Cambiar contraseña</span>
                <form name="change-password" style={{display: "flex", flexDirection:"column", alignItems: "center", rowGap: TranslateFigmaCoords.translateFigmaY(18)}} method="post">
                    <InputField name="password" type="password" placeholder="Ingrese la nueva contraseña" width={320} height={50}/>
                    <InputField name="confirm_password" type="password" placeholder="Confirme la contraseña" width={320} height={50}/>
                </form>
                <ActionButton height={60} text={"Confirmar"} width={100}/>
            </AppWindow>
        </div>
    );
};

export default ChangePassword;
