/**
 * @file JobOffer.tsx
 * @description Window with enterprise user and profile picture as sort of a title.
 *              Expands AppWindow height to 'auto' when "Ver más" is clicked.
 * @author Haziel Magallanes
 * @date May 5, 2025
 */

import React from "react";
import ResponsiveComponent from "../../../global/interface/ResponsiveComponent";
import AppWindow from "../AppWindow";
import ActionButton from "../ActionButton";
import { useJobOffer } from "../../../hooks/offer/useJobOffer";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import TextWithBreaks from "../TextWithBreaks";

/**
 * Props for the `JobOffer` component.
 *
 * @extends ResponsiveComponent
 *
 * @property {number} authorId - The ID of the author (enterprise user) whose details are displayed.
 * @property {string} title - The title of the job offer.
 * @property {string} description - The description of the job offer.
 * @property {number} [width=10] - The width of the job offer window in Figma coordinates.
 * @property {number} [height=10] - The height of the job offer window in Figma coordinates.
 * @property {React.CSSProperties} [style] - Additional inline styles for the window.
 * @property {string} [className] - Additional CSS class names for the window.
 * 
 * @author Haziel Magallanes
 */
interface JobOfferProps extends ResponsiveComponent {
    /** The ID of the author (enterprise user) whose details are displayed. */
    authorId: number;
    /** The title of the job offer. */
    title: string;
    /** The description of the job offer. */
    description: string;
}

/**
 * A React functional component that renders a job offer window with the enterprise user and profile picture as a title.
 * Fetches author details, displays the job offer title and description, and shows a "Ver más" button if the content overflows.
 * When "Ver más" is clicked, the AppWindow height expands to fit all content.
 *
 * @component
 * @param {JobOfferProps} props - The properties for the JobOffer component.
 * @param {number} props.authorId - The ID of the author (enterprise user).
 * @param {string} props.title - The title of the job offer.
 * @param {string} props.description - The description of the job offer.
 * @param {number} [props.width=10] - The width of the job offer window in Figma coordinates.
 * @param {number} [props.height=10] - The height of the job offer window in Figma coordinates.
 * @param {React.CSSProperties} [props.style] - Additional inline styles for the window.
 * @param {string} [props.className] - Additional CSS class names for the window.
 *
 * @returns {JSX.Element} A styled window displaying the job offer with author info and overflow handling.
 *
 * @example
 * ```tsx
 * <JobOffer
 *   authorId={1}
 *   title="Frontend Developer"
 *   description="Join our team to build amazing web apps!"
 *   width={300}
 *   height={200}
 * />
 * ```
 * When the description overflows, a "Ver más" button appears. Clicking it expands the AppWindow to show all content.
 * @author Haziel Magallanes
 */
const JobOffer: React.FC<JobOfferProps> = ({    
    height = 10,
    width = 10,
    authorId,
    title,
    description,
    style,
    className,
}) => {
    const {
        rootRef,
        author,
        overflowing,
        isExpanded,
        setIsExpanded,
        appWindowRef,
        translatedHeight,
        titleHeight,
        translatedWidth,
    } = useJobOffer({ height, width, authorId, description });

    return (
        <div
            className={`job-offer ${className || ""}`}
            style={{
                height: isExpanded ? "auto" : `${translatedHeight}px`,
                width: `${translatedWidth}px`,
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
                marginBottom: `${TranslateFigmaCoords.translateFigmaY(32)}px`,
                ...style,
            }}
            ref={rootRef}
        >
            <div
                className="title"
                style={{
                    width: `${translatedWidth}px`,
                    height: `${titleHeight}px`,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        marginLeft: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                        display: "flex",
                        flexDirection: "row",
                        columnGap: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                        alignItems: "center",
                    }}
                >
                    <div className="profile-pic"></div>
                    {author.name}
                </div>
            </div>
            <AppWindow
                width={width}
                height={height - titleHeight}
                style={{
                    position: "relative",
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    height: isExpanded ? "auto" : `${translatedHeight}px`,
                }}
                ref={appWindowRef as React.RefObject<HTMLDivElement>}
            >
                <div className="text" style={{ marginBottom: "5px" }}>
                    <span className="offer-title">{title}</span>
                    <br />
                    <TextWithBreaks text={description}/>
                </div>
                {overflowing && !isExpanded ? (
                    <>
                        <div className="fade-white" style={{ 
                            top: `${TranslateFigmaCoords.translateFigmaY(height - 80)}px`, 
                            height: `${TranslateFigmaCoords.translateFigmaY(40)}px`, 
                            width: `${TranslateFigmaCoords.translateFigmaX(width - 20)}px`, 
                            marginLeft: `${TranslateFigmaCoords.translateFigmaX(10)}px`, 
                            borderRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px` 
                            }}></div>
                        <ActionButton
                            text="Ver más"
                            height={40}
                            style={{
                                position: "absolute",
                                top: "75%",
                                color: "white",
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                            action={() => setIsExpanded(true)}
                        />
                    </>
                ) : null}
            </AppWindow>
        </div>
    );
};

export default JobOffer;