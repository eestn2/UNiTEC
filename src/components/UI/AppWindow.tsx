import React from "react";
import "../../styles/index.css";

interface AppWindowProps {
    width: number; // Later converted to responsive pixels
    height: number; // Later converted to responsive pixels
    children?: React.ReactNode; // Insert childrens into the window
    style?: React.CSSProperties; // Allow inline styles
    className?: string; // Allow custom CSS classes
}
/* 
    Component used to create a window in the app Style with responsive size.
    It takes the width and height in pixels as props and converts them to responsive pixels based on the screen size.
    It also allows to pass children, inline styles and custom CSS classes.

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
    height = height == width ? (window.innerWidth / 1280) * width : (window.innerHeight / 720) * height;
    width = (window.innerWidth / 1280) * width;  // Convert Figma sizes to the same ratio as the screen size
    return (
        <div
            className={`app-window ${className || ""}`}
            style={{
                height: `${height}px`,
                width: `${width}px`,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default AppWindow;
