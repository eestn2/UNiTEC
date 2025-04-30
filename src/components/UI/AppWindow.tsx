/**
 * @file AppWindow.tsx
 * @description A reusable React component for creating responsive windows in the app.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Haziel Magallanes
 * @date April 29, 2025
 */
import React from "react";
import "../../styles/index.css";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

/**
 * Props for the AppWindow component.
 */
interface AppWindowProps {
    /*** The width of the window in pixels (converted to responsive units).*/
    width: number;
    /*** The height of the window in pixels (converted to responsive units).*/
    height: number;
    /*** The children elements to render inside the window.*/
    children?: React.ReactNode;
    /*** Inline styles to apply to the window.*/
    style?: React.CSSProperties;
    /*** Custom CSS classes to apply to the window.*/
    className?: string;
}

/**
 *  Component used to create a window in the app Style with responsive size.
 *  It takes the width and height in pixels as props and converts them to responsive pixels based on the screen size.
 *  It also allows to pass children, inline styles and custom CSS classes.

    @param {number} width - The width of the window in pixels.
    @param {number} height - The height of the window in pixels.
    @param {React.ReactNode} children - The children to be rendered inside the window.
    @param {React.CSSProperties} style - The inline styles to be applied to the window.
    @param {string} className - The custom CSS classes to be applied to the window.
    @returns {JSX.Element} - The AppWindow component.

    @Author: Haziel Magallanes
*/
const AppWindow: React.FC<AppWindowProps> = ({ height, width, children, style, className }) => {
    // Check if is a square shaped window, if so, make calculated height the same as calculated width
    height = height == width ? TranslateFigmaCoords.translateFigmaX(width) : TranslateFigmaCoords.translateFigmaY(height);
    width = TranslateFigmaCoords.translateFigmaX(width);  // Convert Figma sizes to the same ratio as the screen size
    return (
        <div
            className={`app-window ${className || ""}`}
            style={{
                height: `${height}px`,
                width: `${width}px`,
                ...style,
            }}>
            {children}
        </div>
    );
};

export default AppWindow;
