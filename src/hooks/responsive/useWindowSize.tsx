import { useEffect, useState } from "react";

/**
 * Custom React hook that tracks the current window size and triggers a re-render
 * of the component whenever the window is resized. Useful for implementing
 * responsive layouts that depend on the viewport dimensions.
 *
 * @returns An object containing the current `width` and `height` of the window.
 *
 * @example
 * const windowSize = useWindowSize();
 * // Use width and height for responsive rendering if you need it.
 * @Author Haziel Magallanes
 */

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        }
    }, []);

    return windowSize;
}