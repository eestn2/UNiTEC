/**
 * @file TextBox.tsx
 * @description A reusable React component for creating responsive text areas in the app.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Daviel Díaz Gonzáles
 * @date May 11, 2025
 */

import React, { ChangeEventHandler } from "react";
import ResponsiveComponent from "../../../global/interface/ResponsiveComponent";
import useResponsiveDimensions from "../../../hooks/responsive/useResponsiveDimensions";

/**
 * Props for the TextBox component.
 * 
 * @extends ResponsiveComponent
 * @property {string} name - The name attribute for the TextArea.
 * @property {string} placeholder - The placeholder text for the TextArea.
 * @property {ChangeEventHandler<HTMLTextAreaElement>} [onChange] - Change event handler for the TextArea.
 * @author Daviel Díaz Gonzáles
 */
interface TextBoxProps extends ResponsiveComponent {
    /*** The name attribute for the TextArea. */
    name: string;
    /*** The placeholder text for the TextArea. */
    placeholder: string;
    /*** Change event handler for the TextArea. */
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    /*** The value of the TextArea for controlled input. */
    value?: string;
    /*** Custom styles for the TextArea. */
    style?: React.CSSProperties;
    /*** Custom CSS classes for the TextArea. */
    className?: string;
}

/**
 * Component used to create a responsive text area in the app.
 * It takes the width and height in pixels as props and converts them to responsive pixels based on the screen size.
 * It also allows passing inline styles, custom CSS classes, and an event handler for changes.
 * 
 * @param {number} width - The width of the text area in pixels (converted to responsive units).
 * @param {number} height - The height of the text area in pixels (converted to responsive units).
 * @param {string} name - The name attribute for the text area.
 * @param {string} placeholder - The placeholder text for the text area.
 * @param {React.CSSProperties} style - The inline styles to be applied to the text area.
 * @param {string} className - The custom CSS classes to be applied to the text area.
 * @param {ChangeEventHandler<HTMLTextAreaElement>} onChange - The event handler for changes in the text area.
 * @param {string} value - The value of the text area for controlled input.
 * @returns {JSX.Element} - The TextBox component.
 * 
 * @example
 * <TextBox
 *   width={100}
 *   height={50}
 *   name="description"
 *   placeholder="Enter your text here"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 * 
 * @author Daviel Díaz Gonzáles
 */
const TextBox: React.FC<TextBoxProps> = ({ width = 50, height = 10, name, placeholder = "Text Box", vertical = false, style, className, onChange, value }) => {
    const { finalWidth, finalHeight, translateX } = useResponsiveDimensions({
        height,
        width,
        vertical
    });
    
    return (
        <textarea
            style={{
                width: finalWidth, // Allow textarea to fill parent and wrap
                maxWidth: finalWidth,
                height: finalHeight,
                paddingLeft: `${translateX(18)}px`,
                paddingTop: `${translateX(14)}px`,
                wordBreak: "break-all",
                overflowWrap: "anywhere",
                ...style,
            }}
            name={name}
            placeholder={placeholder}
            className={`input-field ${className || ""}`} // Reuse the same class as InputField
            onChange={onChange} // Pass the onChange handler to the textarea
            value={value} // Pass the value prop to the textarea for controlled input
            wrap="soft" // Ensures text wraps within the textarea
        />
    );
};

export default TextBox;
