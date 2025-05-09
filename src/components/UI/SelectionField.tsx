import React, { ChangeEventHandler } from "react";
import "../../styles/index.css";
import ResponsiveComponent from "./ResponsiveComponent";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

interface SelectionFieldProps extends ResponsiveComponent {
    name: string;
    options: { value: string; label: string }[];
    onChange?: ChangeEventHandler<HTMLSelectElement>;
    /*** Inline styles to apply to the Selection Field. */
    style?: React.CSSProperties;
    /*** Custom CSS classes to apply to the Selection Field. */
    className?: string;
    /*** Default value for the selection field. */
    defaultValue?: string;
    /*** Placeholder value that is non-selectable and hidden from the options. */
    placeholder?: string;
}

const SelectionField: React.FC<SelectionFieldProps> = ({
    width = 50,
    height = 10,
    onChange,
    name,
    options,
    style,
    className,
    defaultValue,
    placeholder,
}) => {
    return (
        <div
            style={{
                width: `${TranslateFigmaCoords.translateFigmaX(width)}px`,
                height: `${TranslateFigmaCoords.translateFigmaY(height)}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...style,
            }}
            className={`selection-field-container ${className || ""}`}
        >
            <select
                name={name}
                className="selection-input input-field"
                onChange={onChange}
                defaultValue={defaultValue || ""}
                style={{
                    width: "100%",
                    height: "100%",
                    paddingLeft: `${TranslateFigmaCoords.translateFigmaX(18)}px`,
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#00317B",
                    outline: "none",
                }}
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectionField;