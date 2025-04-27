import React from "react";
import "../../styles/index.css";
import ResponsiveComponentProps from "./ResponsiveComponent";
interface InputFieldProps extends ResponsiveComponentProps{
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({width, height, placeholder = "Input field" }) => {

    return (
        <input style={{ width: `${(window.innerWidth / 1280) * width}px`, height: `${(window.innerHeight / 720) * height}px` }}
            type="text"
            placeholder={placeholder}
            className="input-field"
        />
    );
};
export default InputField;