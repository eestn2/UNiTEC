import React from "react";
import "../../styles/index.css";

interface AppWindowProps {
    children?: React.ReactNode;
    width: number;
    height: number;
    style?: React.CSSProperties; // Allow inline styles
    className?: string; // Allow custom CSS classes
}

const AppWindow: React.FC<AppWindowProps> = ({ height, width, children, style, className }) => {
    // Check if is a square shaped window, if so, make calculated height the same as calculated width
    height = height == width ? (window.innerWidth / 1280) * width : (window.innerHeight / 720) * height;
    width = (window.innerWidth / 1280) * width;
    // Rectangle shaped window
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
