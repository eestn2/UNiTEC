/**
 * @file ActionButton.tsx
 * @description A reusable React component for rendering a responsive action button with customizable text and click handler.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Haziel Magallanes, Daviel Díaz Gonzáles
 * @date May 11, 2025
 */

import React, { MouseEventHandler } from "react";
import ResponsiveComponent from "../../global/interface/ResponsiveComponent";
import { getTranslates } from "../../global/function/getTranslates";
import useResponsiveDimensions from "../../hooks/responsive/useResponsiveDimensions";

/**
 * Props for the `ActionButton` component.
 *
 * @extends ResponsiveComponent
 *
 * @property text - The text to display inside the button.
 * @property action - Optional click event handler for the button.
 * @property width - The width of the button in Figma coordinates.
 * @property height - The height of the button in Figma coordinates.
 * @property vertical - Decides wich TranslateFigma Function to use (Default: false).
 * @property style - Optional inline styles to apply to the button.
 * @property className - Optional custom CSS classes to apply to the button.
 * 
 * @author Haziel Magallanes, Daviel Díaz Gonzáles
 */
export interface ActionButtonProps extends ResponsiveComponent {
    /** The text to display inside the button. */
    text?: string;
    /** Optional click event handler for the button. */
    action?: MouseEventHandler;
}

/**
 * A React functional component that renders a customizable action button.
 *
 * @component
 * @param {string} text - The text to display inside the button.
 * @param {number} [width] - The width of the button in Figma coordinates.
 * @param {number} [height=10] - The height of the button in Figma coordinates.
 * @param {boolean} [vertical] - Decides wich TranslateFigmaFunction to use (Default: false).
 * @param {React.CSSProperties} [style] - Additional inline styles for the button.
 * @param {string} [className] - Additional CSS class names for the button.
 * @param {React.MouseEventHandler} [action] - Callback function triggered when the button is clicked.
 *
 * @returns {JSX.Element} A styled action button.
 *
 * @example
 * ```tsx
 * <ActionButton
 *   width={120}
 *   height={40}
 *   text="Click Me"
 *   action={() => alert("Button clicked!")}
 * />
 * ```
 * @author Haziel Magallanes, Daviel Díaz Gonzáles
 */
const ActionButton: React.FC<ActionButtonProps> = ({ height = 10, vertical = false, width = 'auto', action, text, style, className, children }) => {
    const { finalHeight, finalWidth } = useResponsiveDimensions({
        height,
        width,
        vertical
    });
    const [translateX] = getTranslates(vertical);
    return (
        <button className={`action-button ${className || ''}`} style={{height: finalHeight, width: finalWidth, display: "flex", flexDirection: "row", columnGap: translateX(4), ...style}} onClick={action}>
            {children || text}
        </button>
    );
};

export default ActionButton;