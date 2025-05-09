/**
 * @file JobOffer.tsx
 * @description Window with enterprise user and profile picture as sort of a title.
 * @author Haziel Magallanes
 * @date May 5, 2025
 */
import React from "react";
import "../../styles/index.css";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ResponsiveComponent from "./ResponsiveComponent";
import AppWindow from "./AppWindow";
import ActionButton from "./ActionButton";

interface JobOfferProps extends ResponsiveComponent{
    author: string;
    title: string;
    description: string;
}

/**
 *  Component used to create a window in the app Style with responsive size.
 *  It takes the width and height in pixels as props and converts them to responsive pixels based on the screen size.
 *  It also allows to pass children, inline styles and custom CSS classes.

    @param {number} width - The width of the window in pixels.
    @param {number} height - The height of the window in pixels.
    @param {React.CSSProperties} style - The inline styles to be applied to the window.
    @param {string} className - The custom CSS classes to be applied to the window.
    @returns {JSX.Element} - The AppWindow component.

    @Author: Haziel Magallanes
*/
const JobOffer: React.FC<JobOfferProps> = ({ height = 10, width = 10, author, title, description, style, className, children }) => {
    // Check if is a square shaped window, if so, make calculated height the same as calculated width
    const translatedHeight = height == width ? TranslateFigmaCoords.translateFigmaX(width) : TranslateFigmaCoords.translateFigmaY(height);
    const titleHeight: number = height / 8;
    const translatedWidth = TranslateFigmaCoords.translateFigmaX(width);  // Convert Figma sizes to the same ratio as the screen size
    return (
        <div
            className={`job-offer ${className || ""}`}
            style={{
                height: `${translatedHeight}px`,
                width: `${translatedWidth}px`,
                display: 'flex',
                flexDirection: 'column',
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
                marginBottom: `${TranslateFigmaCoords.translateFigmaY(32)}px`,
                ...style,
            }}>
            <div className= "title" style={{
                width: `${translatedWidth}px`,
                height: `${titleHeight}px`,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}><div style={{marginLeft: `${TranslateFigmaCoords.translateFigmaX(10)}px`, display: 'flex', flexDirection: 'row', columnGap: `${TranslateFigmaCoords.translateFigmaX(10)}px`, alignItems: 'center'}}>
                    <div className="profile-pic"></div>{username}</div>
                </div>
            <AppWindow width={width} height={height - titleHeight} style={{
                position: "relative",
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0
                }}>
                <div className="text">{children}</div>
                <div className="fade-white" style={{
                    bottom: 0,
                    height: TranslateFigmaCoords.translateFigmaY((height - titleHeight) / 4),
                    width: TranslateFigmaCoords.translateFigmaX( width - 20),
                    marginLeft: TranslateFigmaCoords.translateFigmaX(10),
                    borderRadius: 10
                    }}>
                </div>
                <ActionButton text="Ver más" height={40} style={{
                    position: "absolute", 
                    top: "80%",
                    color: "white",
                    left: "50%",
                    transform: "translateX(-50%)"
                    }}></ActionButton>
            </AppWindow>
            
        </div>
    );
};
export default JobOffer;