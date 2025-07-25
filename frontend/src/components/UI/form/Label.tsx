/**
 * @file Label.tsx
 * @description A reusable React component for displaying a styled label with optional delete functionality.
 * Converts width and height from Figma units to responsive pixels based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */

import React from "react";
import useResponsiveDimensions from "../../../hooks/responsive/useResponsiveDimensions";

/**
 * Props for the `Label` component.
 *
 * @property {string} text - The text to display inside the label.
 * @property {number} [width=50] - The width of the label in Figma coordinates.
 * @property {number} [height=20] - The height of the label in Figma coordinates.
 * @property {React.CSSProperties} [style] - Additional inline styles for the label container.
 * @property {string} [className] - Additional CSS class names for the label container.
 * @property {() => void} [onDelete] - Optional callback function triggered when the delete button is clicked.
 * 
 * @author Daviel Díaz Gonzáles
 */
interface LabelProps {
    /** The text to display inside the label. */
    text: string;
    /** The width of the label in Figma coordinates. */
    width?: number;
    /** The height of the label in Figma coordinates. */
    height?: number;
    /** Decides which TranslateFigmaCoords function to use (Default: false). */
    vertical?: boolean;
    /** Additional inline styles for the label container. */
    style?: React.CSSProperties;
    /** Additional CSS class names for the label container. */
    className?: string;
    /** Callback function triggered when the delete button is clicked. */
    onDelete?: () => void;
}

/**
 * A React functional component that renders a styled label container with text and an optional delete button.
 *
 * @component
 * @param {LabelProps} props - The properties for the Label component.
 * @param {string} props.text - The text to display inside the label.
 * @param {number} [props.width=50] - The width of the label in Figma coordinates.
 * @param {number} [props.height=20] - The height of the label in Figma coordinates.
 * @param {React.CSSProperties} [props.style] - Additional inline styles for the label container.
 * @param {string} [props.className] - Additional CSS class names for the label container.
 * @param {() => void} [props.onDelete] - Callback function triggered when the delete button is clicked.
 *
 * @returns {JSX.Element} A styled label container with text and an optional delete button.
 *
 * @example
 * ```tsx
 * <Label text="Etiqueta" width={80} height={30} onDelete={() => alert("Deleted!")} />
 * ```
 * @author Daviel Díaz Gonzáles
 */
const Label: React.FC<LabelProps> = ({ text, width = 50, height = 20, vertical = false, style, className, onDelete }) => {
    const { finalHeight, finalWidth } = useResponsiveDimensions({
        height,
        width,
        vertical
    });
    
    return (
        <div
            className={`label-container ${className || ""}`}
            style={{
                width: finalWidth,
                height: finalHeight,
                padding: "10px",
                borderRadius: "20px",
                backgroundColor: "#ffffff",
                color: "#333",
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflowX: "hidden",
                ...style,
            }}
        >
            <span>{text}</span>
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