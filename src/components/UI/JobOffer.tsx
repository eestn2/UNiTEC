/**
 * @file JobOffer.tsx
 * @description Window with enterprise user and profile picture as sort of a title.
 * @author Haziel Magallanes
 * @date May 5, 2025
 */
import React, { useEffect, useState } from "react";
import "../../styles/index.css";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ResponsiveComponent from "./ResponsiveComponent";
import AppWindow from "./AppWindow";
import ActionButton from "./ActionButton";
import axios from "axios";

interface JobOfferProps extends ResponsiveComponent {
    authorId: number;
    title: string;
    description: string;
}

const JobOffer: React.FC<JobOfferProps> = ({ height = 10, width = 10, authorId, title, description, style, className }) => {
    const [author, setAuthor] = useState<{ name: string; profile_picture: string }>({ name: "Unknown", profile_picture: "" });
    const [overflowing, setOverflowing] = useState(false);
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

    // Calculate dimensions
    const translatedHeight = height === width ? TranslateFigmaCoords.translateFigmaX(width) : TranslateFigmaCoords.translateFigmaY(height);
    const titleHeight: number = height / 8;
    const translatedWidth = TranslateFigmaCoords.translateFigmaX(width);

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
                }}
            >
                <div
                    className="text"
                    style={{ overflow: "hidden", position: "relative" }}
                    ref={(el) => {
                        if (el) {
                            const isOverflowing = el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
                            if (isOverflowing) {
                                setOverflowing(true);
                            }
                        }
                    }}
                >
                    <span className="offer-title">{title}</span><br />
                    {description}
                </div>

                {overflowing ? (
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
                    />
                    </>
                ) : null}
            </AppWindow>
        </div>
    );
};

export default JobOffer;