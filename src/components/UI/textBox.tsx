import React, { ChangeEventHandler } from "react";
import "../../styles/index.css";
import ResponsiveComponent from "./ResponsiveComponent";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

interface TextBoxProps extends ResponsiveComponent {
    name: string;
    placeholder: string;
    /*** Inline styles to apply to the TextArea. */
    style?: React.CSSProperties;
    /*** Custom CSS classes to apply to the TextArea. */
    className?: string;
    /*** Change event handler for the TextArea. */
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

const TextBox: React.FC<TextBoxProps> = ({ width = 50, height = 10, name, placeholder = "Text Box", style, className, onChange }) => {
    return (
        <textarea
            style={{
                width: `${TranslateFigmaCoords.translateFigmaX(width - 18)}px`,
                height: `${TranslateFigmaCoords.translateFigmaY(height)}px`,
                paddingLeft: `${TranslateFigmaCoords.translateFigmaX(18)}px`,
                paddingTop: `${TranslateFigmaCoords.translateFigmaX(14)}px`,
                ...style,
            }}
            name={name}
            placeholder={placeholder}
            className={`input-field ${className || ""}`} // Reuse the same class as InputField
            onChange={onChange} // Pass the onChange handler to the textarea
        />
    );
};

export default TextBox;