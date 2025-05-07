import React, { ChangeEventHandler } from "react";
import "../../styles/index.css";
import ResponsiveComponent from "./ResponsiveComponent";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

interface InputFieldProps extends ResponsiveComponent {
    type: string;
    name: string;
    placeholder: string;
    onChange?: ChangeEventHandler;
    /*** Inline styles to apply to the Input Field. */
    style?: React.CSSProperties;
    /*** Custom CSS classes to apply to the Input Field. */
    className?: string;
    /*** Maximum date for date inputs. */
    max?: string;
    /*** Minimum date for date inputs. */
    min?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    width = 50,
    height = 10,
    onChange,
    type,
    name,
    placeholder = "Input field",
    style,
    className,
    max,
    min,
}) => {
    return (
        <input
            style={{
                width: `${TranslateFigmaCoords.translateFigmaX(width - 18)}px`,
                height: `${TranslateFigmaCoords.translateFigmaY(height)}px`,
                paddingLeft: `${TranslateFigmaCoords.translateFigmaX(18)}px`,
                ...style,
            }}
            name={name}
            type={type}
            placeholder={placeholder}
            className={`input-field ${className || ""}`}
            onChange={onChange}
            max={type === "date" ? max : undefined} // Apply max only for date inputs
            min={type === "date" ? min : undefined} // Apply min only for date inputs
        />
    );
};

export default InputField;