import React from "react";
import "../../styles/index.css";
import logo from "../../assets/unitec/unitec_Icono_SVG.svg";
import logo_text from "../../assets/unitec/unitec_Texto_Color_SVG.svg";
import AppWindow from "./AppWindow"; 
import TranslateFigmaCoords from "../../global/function/translateFigmaCoords";

const Logo: React.FC = () => {
    return (
        <AppWindow width={210} height={210} style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
            <div className="unitec-logo-container" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <img src={logo} alt="Unitec Logo" className="unitec-logo" width={TranslateFigmaCoords.translateFigmaX(140)} height={TranslateFigmaCoords.translateFigmaX(140)}/>
                <img src={logo_text} alt="Unitec Text" className="unitec-text" width={TranslateFigmaCoords.translateFigmaX(140)} height={TranslateFigmaCoords.translateFigmaX(140)}/>
            </div>
        </AppWindow>
    );                    
};

export default Logo;
