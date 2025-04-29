import React from "react";
import "../../styles/index.css";
import ResponsiveComponentProps from "./ResponsiveComponent";
import TranslateFigmaCoords from "../../global/function/translateFigmaCoords";
interface InputFieldProps extends ResponsiveComponentProps{
    type: string,
    name: string,
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({width, height, type, name, placeholder = "Input field" }) => {

    return (
        <input style={{ width: `${TranslateFigmaCoords.translateFigmaX(width)}px`, height: `${TranslateFigmaCoords.translateFigmaY(height)}px` }}
            name={name}
            type={type}
            placeholder={placeholder}
            className="input-field"
        />
    );
};
export default InputField;