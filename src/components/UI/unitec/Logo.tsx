/**
 * @file Logo.tsx
 * @description A reusable React component that displays the Unitec logo and text in a responsive window.
 * Converts width, height, and logo sizes from pixels to responsive units based on screen size.
 * @author Haziel Magallanes
 * @date May 11, 2025
 */

import React from "react";
import logo from "../../../assets/unitec/unitec-icon.svg";
import logo_text from "../../../assets/unitec/unitec-text.svg";
import AppWindow from "../AppWindow"; 
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import ResponsiveComponent from "../../../global/interface/ResponsiveComponent";

/**
 * Props for the `Logo` component.
 *
 * @extends ResponsiveComponent
 *
 * @property {number} [logo_size=140] - The size of the logo icon in Figma coordinates.
 * @property {number} [logo_text_size=38] - The size of the logo text in Figma coordinates.
 * 
 * @author Haziel Magallanes
 */
interface LogoProps extends ResponsiveComponent {
    /** The size of the logo icon in Figma coordinates. */
    logo_size?: number;
    /** The size of the logo text in Figma coordinates. */
    logo_text_size?: number;
}

/**
 * A React functional component that renders the Unitec logo and text inside a responsive window.
 *
 * @component
 * @param {LogoProps} props - The properties for the Logo component.
 * @param {number} [props.width=210] - The width of the logo window in Figma coordinates.
 * @param {number} [props.height=210] - The height of the logo window in Figma coordinates.
 * @param {number} [props.logo_size=140] - The size of the logo icon in Figma coordinates.
 * @param {number} [props.logo_text_size=38] - The size of the logo text in Figma coordinates.
 * @param {React.CSSProperties} [props.style] - Additional inline styles for the window.
 * @param {string} [props.className] - Additional CSS class names for the window.
 *
 * @returns {JSX.Element} A styled window containing the Unitec logo and text.
 *
 * @example
 * ```tsx
 * <Logo width={210} height={210} logo_size={140} logo_text_size={38} />
 * ```
 * @author Haziel Magallanes
 */
const Logo: React.FC<LogoProps> = ({
    width = 210,
    height = 210,
    logo_size = 140,
    logo_text_size = 38,
    style,
    className
}) => {
    return (
        <AppWindow
            width={width}
            height={height}
            style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                boxShadow: "none",
                ...style
            }}
            className={className || ''}
        >
            <div
                className="unitec-logo-container"
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <img
                    src={logo}
                    alt="Unitec Logo"
                    width={TranslateFigmaCoords.translateFigmaX(logo_size)}
                    height={TranslateFigmaCoords.translateFigmaX(logo_size)}
                />
                <img
                    src={logo_text}
                    alt="Unitec Text"
                    width={TranslateFigmaCoords.translateFigmaX(logo_size)}
                    height={TranslateFigmaCoords.translateFigmaX(logo_text_size)}
                />
            </div>
        </AppWindow>
    );
};

export default Logo;