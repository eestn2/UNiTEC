import React from "react";
import "../../styles/index.css";
import logo from "../../assets/unitec/unitec_Icono_SVG.svg";
import logo_text from "../../assets/unitec/unitec_Texto_Color_SVG.svg";
import AppWindow from "./AppWindow"; 

const Logo: React.FC = () => {
    return (
        <AppWindow width={210} height={210}>
            <div className="flex flex-column logo">
                <img src={logo} alt="Unitec Logo" className="unitec-logo" />
                <img src={logo_text} alt="Unitec Text" className="unitec-text" />
            </div>
        </AppWindow>
    );
};

export default Logo;
