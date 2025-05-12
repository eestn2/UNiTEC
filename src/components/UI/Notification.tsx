/**
 * @file Notification.tsx
 * @description A reusable React component for displaying notification messages in a responsive box.
 * Converts width from pixels to responsive units based on screen size.
 * @author Haziel Magallanes
 * @date May 6, 2025
 */

import React, { useState } from "react";
import "../../styles/index.css";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ResponsiveComponent from "./ResponsiveComponent";

/**
 * A React functional component that renders a notification box with a read/unread indicator.
 *
 * @component
 * @param {ResponsiveComponent} props - The properties for the Notification component.
 * @param {number} [props.width=10] - The width of the notification box in Figma coordinates.
 * @param {React.ReactNode} [props.children] - The content to display inside the notification.
 * @param {React.CSSProperties} [props.style] - Additional inline styles for the notification container.
 * @param {string} [props.className] - Additional CSS class names for the notification container.
 *
 * @returns {JSX.Element} A styled notification box with a read/unread state indicator.
 *
 * @example
 * ```tsx
 * <Notification width={120}>
 *   You have a new message!
 * </Notification>
 * ```
 * @author Haziel Magallanes
 */
const Notification: React.FC<ResponsiveComponent> = ({ width = 10, children, style, className }) => {
    const [read, changeState] = useState(false);
    width = TranslateFigmaCoords.translateFigmaX(width);
    return (
        <div
            className={`notification ${className || ""}`}
            style={{
                height: 'auto',
                width: `${width}px`,
                position: 'relative',
                ...style,
            }}
            onMouseEnter={() => { changeState(true); }}>
            <div className="state" style={{
                width: `${TranslateFigmaCoords.translateFigmaX(16)}px`,
                height: `${TranslateFigmaCoords.translateFigmaX(16)}px`,
            }}>
                <div style={{
                    width: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                    height: `${TranslateFigmaCoords.translateFigmaX(12)}px`,
                    backgroundColor: read ? '#748595' : '#FF3C3C'
                }}></div>
            </div>
            <p style={{
                margin: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                marginTop: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
                marginBottom: `${TranslateFigmaCoords.translateFigmaX(5)}px`
            }}>{children}</p>
        </div>
    );
};

export default Notification;