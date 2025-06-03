/**
 * @file AppWindow.tsx
 * @description A reusable React component for creating responsive windows in the app.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Haziel Magallanes
 * @date April 29, 2025
 */
import React from "react";
import ResponsiveComponent from "../../global/interface/ResponsiveComponent";
import { getTranslates } from "../../global/function/getTranslates";

/**
 * Renders a responsive application window component that adapts its size based on Figma design coordinates.
 * If the window is square-shaped (height equals width), both dimensions are calculated using the X-axis translation.
 * Otherwise, height and width are calculated independently using their respective translation functions.
 *
 *  @param {number} width - The width of the window in pixels.
 *  @param {number} height - The height of the window in pixels.
 *  @param {React.ReactNode} children - The children to be rendered inside the window.
 *  @param {React.CSSProperties} style - The inline styles to be applied to the window.
 *  @param {boolean} vertical - Decides wich TranslateFigma function to use (Default: false).
 *  @param {React.RefObject<HTMLDivElement>} ref - A ref to the window for direct DOM manipulation.
 *  @param {string} className - The custom CSS classes to be applied to the window.
 *  @returns {JSX.Element} - The AppWindow component.
 *
 * @example
 * ```tsx
 * <AppWindow height={100} width={200} className="custom-window">
 *   <p>Hello, world!</p>
 * </AppWindow>
 * ```
 * @Author: Haziel Magallanes
 */
const AppWindow: React.FC<ResponsiveComponent> = ({ height = 10, width = 10, vertical = false, ref, children, style, className }) => {
    // Wich translate function should it use? For vertical or horizontal containers.
    const [ translateX, translateY ] = getTranslates(vertical);
    // Check if is a square shaped window, if so, make calculated height the same as calculated width
    height = height == width ? translateX(width) : translateY(height);
    width = translateX(width);  // Convert Figma sizes to the same ratio as the screen size
    return (
        <div
            className={`app-window ${className || ""}`}
            style={{
                minHeight: `${height}px`,
                height: 'fit-content',
                width: `${width}px`,
                ...style,
            }}
            ref={ref}
        >
            
            {children}
        </div>
    );
};

export default AppWindow;
