/**
 * @file TranslateFigmaCoords.ts
 * @description Utility functions that convert Figma coordinates and sizes to current window size.
 * @author Haziel Magallanes
 */

/**
 * Utility function that converts Figma coordinates and sizes to current window size.
 * @param x X value from Figma design
 * @returns Translated value in pixels.
 */
function translateFigmaX(x: number): number{
    return window.innerWidth > window.innerHeight ? (x / 1280) * window.innerWidth : (x / 1280) * window.innerHeight;
}
/**
 * Utility function that converts Figma coordinates and sizes to current window size.
 * @param y Y value from Figma design
 * @returns Translated value in pixels.
 */
function translateFigmaY(y: number): number{
    return window.innerWidth > window.innerHeight ? (y / 720) * window.innerHeight : (y / 720) * window.innerWidth;
}

/**
 * Utility function that converts Figma coordinates and sizes to current window size.
 * @param x X value from Figma design
 * @param y Y value from Figma design
 * @returns Translated values array in pixels.
 */
function translateFigma(x: number, y: number): number[]{
    return [(x / 1280) * window.innerWidth, (y / 720) * window.innerHeight];
}

/**
 * Utility functions that convert Figma coordinates and sizes to current window size.
 * @author Haziel Magallanes
 */
const TranslateFigmaCoords = {translateFigma, translateFigmaX, translateFigmaY}
export default TranslateFigmaCoords;