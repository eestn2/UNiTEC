import React from "react";
import "../../styles/index.css";
import ResponsiveComponentProps from "./ResponsiveComponent";
interface InputFieldProps extends ResponsiveComponentProps{
    type: string,
    name: string,
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({width, height, type, name, placeholder = "Input field" }) => {

    return (
        <input style={{ width: `${(window.innerWidth / 1280) * width}px`, height: `${(window.innerHeight / 720) * height}px` }}
            name={name}
            type={type}
            placeholder={placeholder}
            className="input-field"
        />
    );
};
export default InputField;