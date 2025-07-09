/**
 * @file useResponsiveDimensions.tsx
 * @description A reusable React hook for converting Figma-based width and height values into responsive CSS units based on screen size.
 * Calculates pixel values for width and height, supporting both numeric and responsive string units (e.g., '100vh', '50%').
 * If the window is square-shaped (height equals width), both dimensions are calculated using the X-axis translation.
 * Otherwise, height and width are calculated independently using their respective translation functions.
 * @author Haziel Magallanes
 * @date June 26, 2025
 */
import { useMemo } from "react";
import { getTranslates } from "../../global/function/getTranslates";
import { ResponsiveUnit } from "../../global/interface/ResponsiveComponent";

interface UseResponsiveDimensionsProps {
  height: number | ResponsiveUnit;
  width: number | ResponsiveUnit;
  vertical: boolean;
}
/**
 * @description A reusable React hook for converting Figma-based width and height values into responsive CSS units based on screen size.
 * Calculates pixel values for width and height, supporting both numeric and responsive string units (e.g., '100vh', '50%').
 * If the window is square-shaped (height equals width), both dimensions are calculated using the X-axis translation.
 * Otherwise, height and width are calculated independently using their respective translation functions.
 *
 * @param {number | string} width - The width in pixels or responsive units.
 * @param {number | string} height - The height in pixels or responsive units.
 * @param {boolean} vertical - Decides which translation function to use (default: false).
 * @returns {{ finalHeight: string | number, finalWidth: string | number, translateX: (value: number) => number, translateY: (value: number) => number}} - The calculated responsive height and width, and the translation functions.
 *
 * @example
 * const { finalHeight, finalWidth, translateX, translateY } = useResponsiveDimensions({ height: 100, width: 200, vertical: false });
 * // finalHeight and finalWidth are ready to be used in style props
 *
 * @author Haziel Magallanes
 */
export default function useResponsiveDimensions({
  height,
  width,
  vertical,
}: UseResponsiveDimensionsProps): { finalHeight: string | number; finalWidth: string | number; translateX: (value: number) => number; translateY: (value: number) => number;} {
  // Memoize only the translate functions
  const [translateX, translateY] = useMemo(() => getTranslates(vertical), [vertical]);

  let finalHeight: number | string = height;
  let finalWidth: number | string = width;

  if (typeof height !== "string") {
    finalHeight = height === width && typeof width === "number" ? translateX(width) : translateY(height);
    finalHeight = `${finalHeight}px`;
  }
  if (typeof width !== "string") {
    finalWidth = `${translateX(width as number)}px`;
  }

  return { finalHeight, finalWidth, translateX, translateY };
}