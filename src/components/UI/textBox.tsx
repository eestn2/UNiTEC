import React from "react";
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
}

const TextBox: React.FC<TextBoxProps> = ({ width = 50, height = 10, name, placeholder = "Text Box", style, className }) => {
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
        />
    );
};

export default TextBox;