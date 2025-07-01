/**
 * @file JobOffer.tsx
 * @description Window with enterprise user and profile picture as sort of a title.
 *              Expands AppWindow height to 'auto' when "Ver más" is clicked.
 * @author Haziel Magallanes
 * @date May 5, 2025
 */

import React, { useState } from "react";
import ResponsiveComponent from "../../../global/interface/ResponsiveComponent";
import AppWindow from "../AppWindow";
import ActionButton from "../ActionButton";
import { useJobOffer } from "../../../hooks/offer/useJobOffer";
import TextWithBreaks from "../TextWithBreaks";
import User from "../../session/User";
import apply_icon from "../../../assets/icons/apply.svg";
import deapply_icon from "../../../assets/icons/deapply.svg";
import StateButton from "../StateButton";

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
    vertical = false,
}) => {
    const {
        rootRef,
        author,
        overflowing,
        isExpanded,
        setIsExpanded,
        appWindowRef,
        finalHeight,
        titleHeight,
        finalWidth,
        translateX,
        translateY,
    } = useJobOffer({ height, width, authorId, description, vertical });
    const [placeholderApplyState, setPlaceholderApplyState] = useState(false);
    let extraButton: React.ReactNode = undefined;
    if (![1, 4].includes(User.data.type as number)) {
        extraButton = <StateButton 
        trueIcon={apply_icon}
        falseIcon={deapply_icon}
        trueText="Postularse"
        falseText="Despostularse"
        state = {placeholderApplyState}
        setState = {setPlaceholderApplyState}
        action={() => {
            if (placeholderApplyState) {
                // Logic to deapply
                console.log("Despostularse clicked");
                return;
            }
            // Logic to apply
            console.log("Postularse clicked");
        }}
        />                    
    } else if (User.data.type === 1 && User.data.id === authorId) {
        extraButton = <ActionButton text="Borrar" />;
    }

    return (
        <div
            className={`job-offer ${className || ""}`}
            style={{
                height: isExpanded ? "auto" : finalHeight,
                width: finalWidth,
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
                marginBottom: `${translateY(32)}px`,
                ...style,
            }}
            ref={rootRef}
        >
            <div
                className="title"
                style={{
                    width: finalWidth,
                    height: `${titleHeight}px`,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        marginLeft: `${translateX(10)}px`,
                        display: "flex",
                        flexDirection: "row",
                        columnGap: `${translateX(10)}px`,
                        alignItems: "center",
                    }}
                >
                    <div className="profile-pic"></div>
                    {author.name}
                    <div className="job-offer-buttons" style={{position: "absolute", right: translateX(2)}}>
                        {extraButton ? extraButton : null}
                    </div>
                </div>
            </div>
            <AppWindow
                width={width}
                height={typeof height === "number" && typeof titleHeight === "number" ? height - titleHeight : height}
                style={{
                    position: "relative",
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    height: isExpanded ? "auto" : finalHeight,
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
                            top: `${translateY(typeof height === "number" ? height - 100 : 0)}px`, 
                            height: `${translateY(60)}px`, 
                            width: `${translateX(typeof width === "number" ? width - 20 : 0)}px`, 
                            marginLeft: `${translateX(10)}px`, 
                            borderRadius: `${translateX(10)}px` 
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