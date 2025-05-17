/**
 * @file ActionButton.tsx
 * @description A reusable React component for rendering a responsive action button with customizable text and click handler.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Haziel Magallanes, Daviel Díaz Gonzáles
 * @date May 11, 2025
 */

import React, { MouseEventHandler } from "react";
import ResponsiveComponent from "../../global/interface/ResponsiveComponent";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

/**
 * Props for the `ActionButton` component.
 *
 * @extends ResponsiveComponent
 *
 * @property text - The text to display inside the button.
 * @property action - Optional click event handler for the button.
 * @property width - The width of the button in Figma coordinates.
 * @property height - The height of the button in Figma coordinates.
 * @property style - Optional inline styles to apply to the button.
 * @property className - Optional custom CSS classes to apply to the button.
 * 
 * @author Haziel Magallanes, Daviel Díaz Gonzáles
 */
interface ActionButtonProps extends ResponsiveComponent {
    /** The text to display inside the button. */
    text: string;
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
const ActionButton: React.FC<ActionButtonProps> = ({ height = 10, width, text, action, style, className }) => {
    let calculatedWidth: string = 'auto';
    if(width) calculatedWidth = `${TranslateFigmaCoords.translateFigmaX(width)}px`
    return (
        <div className={`action-button ${className || ''}`} style={{height: `${TranslateFigmaCoords.translateFigmaY(height)}px`, width: `${calculatedWidth}`, ...style}} onClick={action}>
            <p>{text}</p>
        </div>
    );
};

export default ActionButton;