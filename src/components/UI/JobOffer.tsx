/**
 * @file JobOffer.tsx
 * @description Window with enterprise user and profile picture as sort of a title.
 *              Expands AppWindow height to 'auto' when "Ver más" is clicked.
 * @author Haziel Magallanes
 * @date May 5, 2025
 */

import React, { Ref, useEffect, useRef, useState } from "react";
import "../../styles/index.css";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ResponsiveComponent from "./ResponsiveComponent";
import AppWindow from "./AppWindow";
import ActionButton from "./ActionButton";
import axios from "axios";

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
const JobOffer: React.FC<JobOfferProps> = ({ height = 10, width = 10, authorId, title, description, style, className }) => {
    const [author, setAuthor] = useState<{ name: string; profile_picture: string }>({ name: "Unknown", profile_picture: "" });
    const [overflowing, setOverflowing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const appWindowRef: Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);
    // Fetch author details and save them in state
    useEffect(() => {
        const fetchAuthorDetails = async () => {
            try {
                const response = await axios.get('http://localhost:80/UNITEC/src/php/requests/user/user-info.php', {
                    params: { id: authorId },
                });
                if (response.status === 200 && response.data.status === "success") {
                    setAuthor(response.data.user);
                } else {
                    console.error(`Failed to fetch author details for ID ${authorId}:`, response.data.message);
                }
            } catch (error) {
                console.error(`An error occurred while fetching author details for ID ${authorId}:`, error);
            }
        };

        fetchAuthorDetails();
    }, [authorId]);
    // Check for overflow when the component mounts or updates
    useEffect(() => {
        if (appWindowRef.current) {
            const isOverflowing = appWindowRef.current.scrollHeight > appWindowRef.current.clientHeight;
            setOverflowing(isOverflowing);
        }
    }, [height, width, description]);

    // Calculate dimensions
    const translatedHeight = height === width ? TranslateFigmaCoords.translateFigmaX(width) : TranslateFigmaCoords.translateFigmaY(height);
    const titleHeight: number = height / 8;
    const translatedWidth = TranslateFigmaCoords.translateFigmaX(width);

    return (
        <div
            className={`job-offer ${className || ""}`}
            style={{
                height: isExpanded ? 'auto' : `${translatedHeight}px`,
                width: `${translatedWidth}px`,
                display: 'flex',
                flexDirection: 'column',
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
                marginBottom: `${TranslateFigmaCoords.translateFigmaY(32)}px`,
                ...style,
            }}
        >
            <div
                className="title"
                style={{
                    width: `${translatedWidth}px`,
                    height: `${titleHeight}px`,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        marginLeft: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
                        alignItems: 'center',
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
                    height: isExpanded ? 'auto' : `${TranslateFigmaCoords.translateFigmaY(height)}px`,
                }}
                ref={appWindowRef as React.RefObject<HTMLDivElement>}
            >
                <div
                    className="text"
                    style={{marginBottom: `${TranslateFigmaCoords.translateFigmaY(5)}px`}}
                >
                    <span className="offer-title">{title}</span><br />
                    {description}
                </div>

                {overflowing && !isExpanded ? (
                    <>
                    <div
                        className="fade-white"
                        style={{
                            bottom: 0,
                            height: TranslateFigmaCoords.translateFigmaY((height - titleHeight) / 4),
                            width: TranslateFigmaCoords.translateFigmaX(width - 20),
                            marginLeft: TranslateFigmaCoords.translateFigmaX(10),
                            borderRadius: 10,
                        }}
                    ></div>
                    <ActionButton
                        text="Ver más"
                        height={40}
                        style={{
                            position: "absolute",
                            top: "80%",
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