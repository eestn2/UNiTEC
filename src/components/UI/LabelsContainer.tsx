/**
 * @file LabelsContainer.tsx
 * @description A reusable React component for displaying a styled label with optional delete functionality.
 * Converts width and height from Figma units to responsive pixels based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */

import React from "react";
import "../../styles/index.css";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

/**
 * Props for the `Label` component.
 *
 * @property {string} [text] - The text to display inside the label. Optional if using children.
 * @property {number} [width=50] - The width of the label in Figma coordinates.
 * @property {number} [height=20] - The height of the label in Figma coordinates.
 * @property {React.CSSProperties} [style] - Additional inline styles for the label container.
 * @property {string} [className] - Additional CSS class names for the label container.
 * @property {() => void} [onDelete] - Optional callback function triggered when the delete button is clicked.
 * @property {React.ReactNode} [children] - Optional children to render inside the label.
 * 
 * @author Daviel Díaz Gonzáles
 */
interface LabelProps {
    /** The text to display inside the label. Optional if using children. */
    text?: string;
    /** The width of the label in Figma coordinates. */
    width?: number;
    /** The height of the label in Figma coordinates. */
    height?: number;
    /** Additional inline styles for the label container. */
    style?: React.CSSProperties;
    /** Additional CSS class names for the label container. */
    className?: string;
    /** Callback function triggered when the delete button is clicked. */
    onDelete?: () => void;
    /** Optional children to render inside the label. */
    children?: React.ReactNode;
}

/**
 * A React functional component that renders a styled label container with optional text, children, and a delete button.
 *
 * @component
 * @param {LabelProps} props - The properties for the Label component.
 * @param {string} [props.text] - The text to display inside the label.
 * @param {number} [props.width=50] - The width of the label in Figma coordinates.
 * @param {number} [props.height=20] - The height of the label in Figma coordinates.
 * @param {React.CSSProperties} [props.style] - Additional inline styles for the label container.
 * @param {string} [props.className] - Additional CSS class names for the label container.
 * @param {() => void} [props.onDelete] - Callback function triggered when the delete button is clicked.
 * @param {React.ReactNode} [props.children] - Optional children to render inside the label.
 *
 * @returns {JSX.Element} A styled label container with optional text, children, and a delete button.
 *
 * @example
 * ```tsx
 * <Label text="Etiqueta" width={80} height={30} onDelete={() => alert("Deleted!")} />
 * ```
 * @author Daviel Díaz Gonzáles
 */
const Label: React.FC<LabelProps> = ({ text, width = 50, height = 20, style, className, onDelete, children }) => {
    return (
        <div
            className={`label-container ${className || ""}`}
            style={{
                width: `${TranslateFigmaCoords.translateFigmaX(width)}px`,
                height: `${TranslateFigmaCoords.translateFigmaY(height)}px`,
                padding: "10px",
                borderRadius: "20px",
                backgroundColor: "#000000",
                color: "#333",
                fontSize: "14px",
                fontWeight: "bold",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "center",
                gap: "10px",
                overflowX: "hidden",
                ...style,
            }}
        >
            {text && <span>{text}</span>}
            {children}
            <button
                onClick={onDelete}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                }}
                aria-label="Delete"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#ff0000"
                    width="16px"
                    height="16px"
                >
                    <path d="M3 6h18v2H3V6zm2 3h14v12H5V9zm3 2v8h2v-8H8zm6 0v8h2v-8h-2z" />
                </svg>
            </button>
        </div>
    );
};

export default Label;