import React from "react";
import "../../styles/index.css";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

interface CheckboxProps {
    label: string;
    name: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, onChange }) => (
    <label className="checkbox-label">
        <input type="checkbox" name={name} onChange={onChange} />
        {label}
    </label>
);

interface LabelsSelectionProps {
    width?: number; // Width in Figma units
    height?: number; // Height in Figma units
}

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