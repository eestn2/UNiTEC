/**
 * @file useJobOffer.tsx
 * @description Custom React hook for managing the state and logic of a job offer window.
 *              Handles author fetching, overflow detection, expansion/collapse, and Figma coordinate translation.
 *              Intended for use in both preview and full-view job offer components.
 * @author Haziel Magallanes
 * @date May 16, 2025
 */

import { useEffect, useRef, useState, Ref } from "react";
import axios from "axios";
import TranslateFigmaCoords from "../global/function/TranslateFigmaCoords";
import { useWindowSize } from "./useWindowSize";

/**
 * Props for the `useJobOffer` hook.
 *
 * @property {number} authorId - The ID of the author (enterprise user) whose details are displayed.
 * @property {string} description - The description of the job offer.
 * @property {number} height - The height of the job offer window in Figma coordinates.
 * @property {number} width - The width of the job offer window in Figma coordinates.
 */
export interface UseJobOfferProps {
    height: number;
    width: number;
    authorId: number;
    description: string;
}

/**
 * Custom React hook that encapsulates the logic and state for a job offer window.
 * Fetches author details, detects content overflow, manages expansion/collapse state,
 * and provides translated Figma dimensions for consistent UI rendering.
 *
 * @param {UseJobOfferProps} props - The properties for the job offer logic.
 * @param {number} props.authorId - The ID of the author (enterprise user).
 * @param {string} props.description - The description of the job offer.
 * @param {number} props.height - The height of the job offer window in Figma coordinates.
 * @param {number} props.width - The width of the job offer window in Figma coordinates.
 *
 * @returns {{
 *   windowSize: { width: number; height: number };
 *   rootRef: React.RefObject<HTMLDivElement>;
 *   author: { name: string; profile_picture: string };
 *   overflowing: boolean;
 *   isExpanded: boolean;
 *   setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
 *   appWindowRef: Ref<HTMLDivElement>;
 *   translatedHeight: number;
 *   titleHeight: number;
 *   translatedWidth: number;
 * }} Hook state and refs for use in job offer components.
 *
 * @example
 * ```tsx
 * const {
 *   windowSize,
 *   rootRef,
 *   author,
 *   overflowing,
 *   isExpanded,
 *   setIsExpanded,
 *   appWindowRef,
 *   translatedHeight,
 *   titleHeight,
 *   translatedWidth,
 * } = useJobOffer({ height, width, authorId, description });
 * ```
 */
export function useJobOffer({ height, width, authorId, description }: UseJobOfferProps) {
    const windowSize = useWindowSize();
    const rootRef = useRef<HTMLDivElement>(null);
    const [author, setAuthor] = useState<{ name: string; profile_picture: string }>({ name: "Unknown", profile_picture: "" });
    const [overflowing, setOverflowing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const appWindowRef: Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);

    // Fetch author details and save them in state
    useEffect(() => {
        const fetchAuthorDetails = async () => {
            try {
                const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
                const response = await axios.get(`${apiUrl}/requests/user/user-info.php`, {
                    params: { id: authorId },
                });
                if (response.status === 200 && response.data.status === "success") {
                    setAuthor(response.data.user);
                }
            } catch (error) {
                // handle error
                console.error(`An error occurred while fetching author details for ID ${authorId}:`, error);
            }
        };
        fetchAuthorDetails();
    }, [authorId]);

    // Check for overflow when the component mounts or updates
    useEffect(() => {
        if (isExpanded) return;
        if (appWindowRef.current) {
            const isOverflowing = (appWindowRef.current as HTMLDivElement).scrollHeight > (appWindowRef.current as HTMLDivElement).clientHeight;
            setOverflowing(isOverflowing);
        }
    }, [height, width, description, isExpanded]);

    // Collapse window when clicking outside
    useEffect(() => {
        if (!isExpanded) return;
        function handleClickOutside(event: MouseEvent) {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) setIsExpanded(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isExpanded]);

    // Calculated dimensions
    const translatedHeight = height === width ? TranslateFigmaCoords.translateFigmaX(width) : TranslateFigmaCoords.translateFigmaY(height);
    const titleHeight: number = translatedHeight / 8;
    const translatedWidth = TranslateFigmaCoords.translateFigmaX(width);

    return {
        windowSize,
        rootRef,
        author,
        overflowing,
        isExpanded,
        setIsExpanded,
        appWindowRef,
        translatedHeight,
        titleHeight,
        translatedWidth,
    };
}