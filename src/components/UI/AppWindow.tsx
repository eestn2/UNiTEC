/**
 * @file AppWindow.tsx
 * @description A reusable React component for creating responsive windows in the app.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Haziel Magallanes
 * @date April 29, 2025
 */
import React from "react";
import ResponsiveComponent from "../../global/interface/ResponsiveComponent";
import useResponsiveDimensions from "../../hooks/responsive/useResponsiveDimensions";

/**
 * Renders a responsive application window component that adapts its size based on Figma design coordinates.
 * If the window is square-shaped (height equals width), both dimensions are calculated using the X-axis translation.
 * Otherwise, height and width are calculated independently using their respective translation functions.
 *
 *  @param {number | ResponsiveUnit} width - The width of the window in pixels or responsive units.
 *  @param {number | ResponsiveUnit} height - The height of the window in pixels or responsive units.
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
    const { finalHeight, finalWidth } = useResponsiveDimensions({
        height,
        width,
        vertical
    });

    return (
        <div
            className={`app-window ${className || ""}`}
            style={{
                minHeight: `${finalHeight}`,
                height: 'fit-content',
                width: `${finalWidth}`,
                ...style,
            }}
            ref={ref}
        >
            
            {children}
        </div>
    );
};

export default AppWindow;
