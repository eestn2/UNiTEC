import React from "react";
import "../../styles/index.css";
import ResponsiveComponent from "./ResponsiveComponent";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

interface ActionButtonProps extends ResponsiveComponent{
    text: String;
}

const ActionButton: React.FC<ActionButtonProps> = ({ height = 10, width, text, style, className }) => {
    var calculatedWidth: string = 'auto';
    if(width) calculatedWidth = `${TranslateFigmaCoords.translateFigmaX(width)}px`
    return (
        <div className={`action-button ${className || ''}`} style={{height: `${TranslateFigmaCoords.translateFigmaY(height)}px`, width: `${calculatedWidth}`, ...style}}>
            <p>{text}</p>
        </div>
    );
};

export default ActionButton;
