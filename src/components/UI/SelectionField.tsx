import React, { ChangeEventHandler } from "react";
import "../../styles/index.css";
import ResponsiveComponent from "./ResponsiveComponent";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

interface SelectionFieldProps extends ResponsiveComponent {
    name: string;
    options: { value: string; label: string }[];
    onChange?: ChangeEventHandler;
    /*** Inline styles to apply to the Selection Field. */
    style?: React.CSSProperties;
    /*** Custom CSS classes to apply to the Selection Field. */
    className?: string;
}

const SelectionField: React.FC<SelectionFieldProps> = ({
    width = 50,
    height = 10,
    onChange,
    name,
    options,
    style,
    className,
}) => {
    return (
        <select
            style={{
                width: `${TranslateFigmaCoords.translateFigmaX(width - 18)}px`,
                height: `${TranslateFigmaCoords.translateFigmaY(height)}px`,
                paddingLeft: `${TranslateFigmaCoords.translateFigmaX(18)}px`,
                ...style,
            }}
            name={name}
            className={`selection-field ${className || ""}`}
            onChange={onChange}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectionField;
