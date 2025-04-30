import React from "react";
import "../../styles/index.css";
import logo from "../../assets/unitec/unitec_Icono_SVG.svg";
import logo_text from "../../assets/unitec/unitec_Texto_Color_SVG.svg";
import AppWindow from "./AppWindow"; 
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ResponsiveComponent from "./ResponsiveComponent";

interface LogoProps extends ResponsiveComponent {
    logo_size?: number,
    logo_text_size?: number
}
const Logo: React.FC<LogoProps> = ({width = 210, height = 210, logo_size = 140, logo_text_size = 38}) => {
    return (
        <AppWindow width={width} height={height} style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, boxShadow: "none"}}>
            <div className="unitec-logo-container" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <img src={logo} alt="Unitec Logo" width={TranslateFigmaCoords.translateFigmaX(logo_size)} height={TranslateFigmaCoords.translateFigmaX(logo_size)}/>
                <img src={logo_text} alt="Unitec Text" width={TranslateFigmaCoords.translateFigmaX(logo_size)} height={TranslateFigmaCoords.translateFigmaX(logo_text_size)}/>
            </div>
        </AppWindow>
    );                    
};

export default Logo;
