import React from "react";
import "../../styles/index.css";
import ResponsiveComponent from "./ResponsiveComponent";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
interface InputFieldProps extends ResponsiveComponent{
    type: string,
    name: string,
    placeholder: string,
    /*** Inline styles to apply to the Input Field.*/
    style?: React.CSSProperties;
    /*** Custom CSS classes to apply to the Input Field.*/
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({width = 50, height = 10, type, name, placeholder = "Input field", style, className }) => {

    return (
        <input style={{ 
            width: `${TranslateFigmaCoords.translateFigmaX(width - 18)}px`, 
            height: `${TranslateFigmaCoords.translateFigmaY(height)}px`, 
            paddingLeft: `${TranslateFigmaCoords.translateFigmaX(18)}px`,
            ...style
            }}
            name={name}
            type={type}
            placeholder={placeholder}
            className={`input-field ${className || ""}`}
        />
    );
};
export default InputField;