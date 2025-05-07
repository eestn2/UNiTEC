import React, { MouseEventHandler } from "react";
import "../../styles/index.css";
import ResponsiveComponent from "./ResponsiveComponent";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

interface ActionButtonProps extends ResponsiveComponent{
    text: String;
    action?: MouseEventHandler;
}

const ActionButton: React.FC<ActionButtonProps> = ({ height = 10, width, text, action, style, className }) => {
    var calculatedWidth: string = 'auto';
    if(width) calculatedWidth = `${TranslateFigmaCoords.translateFigmaX(width)}px`
    return (
        <div className={`action-button ${className || ''}`} style={{height: `${TranslateFigmaCoords.translateFigmaY(height)}px`, width: `${calculatedWidth}`, ...style}} onClick={action}>
            <p>{text}</p>
        </div>
    );
};

export default ActionButton;
