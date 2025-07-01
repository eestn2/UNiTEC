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
import useResponsiveDimensions from "../responsive/useResponsiveDimensions";
import { ResponsiveUnit } from "../../global/interface/ResponsiveComponent";
import { useWindowSize } from "../responsive/useWindowSize"; 

/**
 * Props for the `useJobOffer` hook.
 *
 * @property {number} authorId - The ID of the author (enterprise user) whose details are displayed.
 * @property {string} description - The description of the job offer.
 * @property {number | ResponsiveUnit} height - The height of the job offer window in Figma coordinates or responsive units.
 * @property {number | ResponsiveUnit} width - The width of the job offer window in Figma coordinates or responsive units.
 * @property {boolean} [vertical] - Whether to use vertical translation (optional).
 */
export interface UseJobOfferProps {
    height: number | ResponsiveUnit;
    width: number | ResponsiveUnit;
    authorId: number;
    description: string;
    vertical?: boolean;
}

/**
 * Custom React hook that encapsulates the logic and state for a job offer window.
 * Fetches author details, detects content overflow, manages expansion/collapse state,
 * and provides translated Figma dimensions for consistent UI rendering.
 *
 * @param {UseJobOfferProps} props - The properties for the job offer logic.
 * @param {number} props.authorId - The ID of the author (enterprise user).
 * @param {string} props.description - The description of the job offer.
 * @param {number | ResponsiveUnit} props.height - The height of the job offer window in Figma coordinates or responsive units.
 * @param {number | ResponsiveUnit} props.width - The width of the job offer window in Figma coordinates or responsive units.
 * @param {boolean} [props.vertical] - Whether to use vertical translation (optional).
 *
 * @returns {{
 *   windowSize: { width: number; height: number };
 *   rootRef: React.RefObject<HTMLDivElement>;
 *   author: { name: string; profile_picture: string };
 *   overflowing: boolean;
 *   isExpanded: boolean;
 *   setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
 *   appWindowRef: Ref<HTMLDivElement>;
 *   finalHeight: string | number;
 *   titleHeight: number;
 *   finalWidth: string | number;
 *   translateX: (value: number) => number;
 *   translateY: (value: number) => number;
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
 *   finalHeight,
 *   titleHeight,
 *   finalWidth,
 *   translateX,
 *   translateY,
 * } = useJobOffer({ height, width, authorId, description });
 * ```
 */
export function useJobOffer({ height, width, authorId, description, vertical = false }: UseJobOfferProps) {
    const windowSize = useWindowSize();
    const rootRef = useRef<HTMLDivElement>(null);
    const [author, setAuthor] = useState<{ name: string; profile_picture: string }>({ name: "Unknown", profile_picture: "" });
    const [overflowing, setOverflowing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const appWindowRef: Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);

    // Responsive dimensions
    const { finalHeight, finalWidth, translateX, translateY } = useResponsiveDimensions({ height, width, vertical });

    // Calculate titleHeight based on numeric height/width, fallback to 40 if not numeric
    const numericHeight = typeof height === "number" ? height : undefined;
    const numericWidth = typeof width === "number" ? width : undefined;
    const base = numericHeight === numericWidth && numericWidth !== undefined ? numericWidth : numericHeight;
    const titleHeight = base !== undefined ? (numericHeight === numericWidth ? translateX(base) : numericHeight !== undefined ? translateY(numericHeight) : 40) / 8 : 40;

    // Fetch author details and save them in state
    useEffect(() => {
        const fetchAuthorDetails = async () => {
            try {
                const response = await axios.get(`/user/user-info.php`, {
                    params: { id: authorId },
                });
                if (response.status === 200 && response.data.status === "success") {
                    setAuthor({name: response.data.data.user.name, profile_picture: response.data.data.user.profile_picture});
                    // console.log(`Author details fetched successfully for ID ${authorId}:`, response.data.data.user);
                }
            } catch {
                // handle error
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

    return {
        windowSize,
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
    };
}