/**
 * @file Notification.tsx
 * @description Notification component.
 * @author Haziel Magallanes
 * @date May 6, 2025
 */
import React, { useState } from "react";
import "../../styles/index.css";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ResponsiveComponent from "./ResponsiveComponent";

/**
 * Notification box component.

    @param {number} width - The width of the window in pixels.
    @param {number} height - The height of the window in pixels.
    @param {React.ReactNode} children - The children to be rendered inside the window.
    @param {React.CSSProperties} style - The inline styles to be applied to the window.
    @param {string} className - The custom CSS classes to be applied to the window.
    @returns {JSX.Element} - The AppWindow component.

    @Author: Haziel Magallanes
*/
const Notification: React.FC<ResponsiveComponent> = ({ width = 10, children, style, className }) => {
    const [read, changeState] = useState(false);
    // Check if is a square shaped window, if so, make calculated height the same as calculated width
    width = TranslateFigmaCoords.translateFigmaX(width);  // Convert Figma sizes to the same ratio as the screen size
    return (
        <div
            className={`notification ${className || ""}`}
            style={{
                height: 'auto',
                width: `${width}px`,
                position: 'relative',
                ...style,
            }}
            onMouseEnter={() => {changeState(true)}}>
            <div className="state" style={{
                width: `${TranslateFigmaCoords.translateFigmaX(16)}px`,
                height: `${TranslateFigmaCoords.translateFigmaX(16)}px`,
            }}><div style={{
                width: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                height: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                backgroundColor: read ? '#748595' : '#FF3C3C'
            }}></div></div>
            <p style={{
                margin: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                marginTop: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                marginBottom: `${TranslateFigmaCoords.translateFigmaX(5)}px`
            }}>{children}</p>
        </div>
    );
};

export default Notification;
