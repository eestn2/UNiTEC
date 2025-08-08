/**
 * @file TextBox.tsx
 * @description A reusable React component for creating responsive text areas in the app.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */

import React, { ChangeEventHandler } from "react";
import ResponsiveComponent from "../../../global/interface/ResponsiveComponent";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import useResponsiveDimensions from "../../../hooks/responsive/useResponsiveDimensions";


/**
 * Props for the `SelectionField` component.
 *
 * @extends ResponsiveComponent
 *
 * @property name - The name attribute for the selection field, used for form submission.
 * @property options - An array of selectable options, each with a `value` and a `label`.
 * @property onChange - Optional event handler called when the selected value changes.
 * @property defaultValue - Optional default value for the selection field.
 * @property placeholder - Optional placeholder text shown as a non-selectable, hidden option.
 * 
 * @author Daviel Díaz Gonzáles
 */
interface SelectionFieldProps extends ResponsiveComponent {
    /** The name attribute for the selection field, used for form submission. */
    name: string;
    /** An array of selectable options, each with a `value` and a `label`. */
    options: { value: unknown; label: string }[];
    /** Optional event handler called when the selected value changes. */
    onChange?: ChangeEventHandler<HTMLSelectElement>;
    /** Default value for the selection field. */
    defaultValue?: string;
    /** Placeholder text shown as a non-selectable, hidden option. */
    placeholder?: string;
}

/**
 * A React functional component that renders a customizable selection field (dropdown).
 *
 * @component
 * @param {SelectionFieldProps} props - The properties for the SelectionField component.
 * @param {number} [props.width=50] - The width of the selection field in Figma coordinates.
 * @param {number} [props.height=10] - The height of the selection field in Figma coordinates.
 * @param {(event: React.ChangeEvent<HTMLSelectElement>) => void} props.onChange - Callback function triggered when the selection changes.
 * @param {string} props.name - The name attribute for the `<select>` element.
 * @param {Array<{ value: string; label: string }>} props.options - The list of options to display in the dropdown.
 * @param {React.CSSProperties} [props.style] - Additional inline styles for the container.
 * @param {string} [props.className] - Additional CSS class names for the container.
 * @param {string} [props.defaultValue] - The default selected value for the dropdown.
 * @param {string} [props.placeholder] - Placeholder text displayed as the first option (disabled and hidden).
 *
 * @returns {JSX.Element} A styled dropdown selection field.
 *
 * @example
 * ```tsx
 * <SelectionField
 *   width={100}
 *   height={20}
 *   name="example"
 *   options={[
 *     { value: "option1", label: "Option 1" },
 *     { value: "option2", label: "Option 2" },
 *   ]}
 *   onChange={(e) => console.log(e.target.value)}
 *   placeholder="Select an option"
 * />
 * ```
 * @author Daviel Díaz Gonzáles
 */
const SelectionField: React.FC<SelectionFieldProps> = ({
    width = 50,
    height = 10,
    onChange,
    name,
    vertical = false,
    options,
    style,
    className,
    defaultValue,
    placeholder,
}) => {
    const { finalHeight, finalWidth } = useResponsiveDimensions({
        height,
        width,
        vertical
    });
    
    return (
        <div
            style={{
                width: finalWidth,
                height: finalHeight,
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