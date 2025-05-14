/**
 * @file LabelsSelection.tsx
 * @description A reusable React component for selecting languages and labels with checkboxes in a responsive layout.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */

import React from "react";
import "../../styles/index.css";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

/**
 * Props for the `LabelsSelection` component.
 *
 * @property {number} [width=100] - The width of the selection container in Figma coordinates.
 * @property {number} [height=50] - The height of the selection container in Figma coordinates.
 * 
 * @author Daviel Díaz Gonzáles
 */
interface LabelsSelectionProps {
    /** The width of the selection container in Figma coordinates. */
    width?: number;
    /** The height of the selection container in Figma coordinates. */
    height?: number;
}


/**
 * Checkbox component renders a labeled checkbox input.
 *
 * @param label - The text label displayed next to the checkbox.
 * @param name - The name attribute for the checkbox input.
 * @param onChange - Optional event handler called when the checkbox value changes.
 * 
 * @returns A JSX element representing a labeled checkbox.
 */
const Checkbox: React.FC<{ label: string; name: string; onChange?: React.ChangeEventHandler<HTMLInputElement> }> = ({ label, name, onChange }) => (
    <label className="checkbox-label">
        <input type="checkbox" name={name} onChange={onChange} />
        {label}
    </label>
);

/**
 * A React functional component that renders two columns for selecting languages and labels,
 * each with a dropdown and a group of checkboxes, inside a responsive container.
 *
 * @component
 * @param {LabelsSelectionProps} props - The properties for the LabelsSelection component.
 * @param {number} [props.width=100] - The width of the selection container in Figma coordinates.
 * @param {number} [props.height=50] - The height of the selection container in Figma coordinates.
 *
 * @returns {JSX.Element} A styled container with dropdowns and checkboxes for language and label selection.
 *
 * @example
 * ```tsx
 * <LabelsSelection width={120} height={60} />
 * ```
 * @author Daviel Díaz Gonzáles
 */
const LabelsSelection: React.FC<LabelsSelectionProps> = ({ width = 100, height = 50 }) => {
    return (
        <div
            className="row-layout input-field"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
                width: `${TranslateFigmaCoords.translateFigmaX(width)}px`,
                height: `${TranslateFigmaCoords.translateFigmaY(height)}px`,
            }}
        >
            {/* Left Section */}
            <div
                className="column"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                    width: "40%",
                }}
            >
                <select
                    className="selection-input input-field"
                    style={{
                        display: "flex",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#00317B",
                        outline: "none",
                        textDecoration: "underline",
                        width: "100%",
                    }}
                >
                    <option className="form-text" value="0" selected={true} disabled hidden>
                        Idiomas
                    </option>
                    <option value="1">Selection 1</option>
                    <option value="2">Selection 2</option>
                    <option value="3">Selection 3</option>
                </select>
                <div
                    className="checkbox-group"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                    }}
                >
                    <Checkbox label="Básico" name="basic-label" />
                    <Checkbox label="Intermedio" name="intermediate-label" />
                    <Checkbox label="Avanzado" name="advanced-label" />
                </div>
            </div>

            {/* Right Section */}
            <div
                className="column"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                    width: "40%",
                }}
            >
                <select
                    className="selection-input input-field"
                    style={{
                        display: "flex",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#00317B",
                        outline: "none",
                        textDecoration: "underline",
                        width: "100%",
                    }}
                >
                    <option className="form-text" value="0" selected={true} disabled hidden>
                        Etiquetas
                    </option>
                    <option value="1">Selection 1</option>
                    <option value="2">Selection 2</option>
                    <option value="3">Selection 3</option>
                </select>
                <div
                    className="checkbox-group"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                    }}
                >
                    <Checkbox label="Básico" name="basic-label" />
                    <Checkbox label="Intermedio" name="intermediate-label" />
                    <Checkbox label="Avanzado" name="advanced-label" />
                </div>
            </div>
        </div>
    );
};

export default LabelsSelection;