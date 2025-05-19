/**
 * @file TranslateFigmaCoords.ts
 * @description Utility functions that convert Figma coordinates and sizes to current window size.
 * @author Haziel Magallanes
 */


/**
 * Translates a horizontal (X-axis) coordinate from Figma's design space to the current window's width.
 * 
 * This function is intended for use with horizontal containers, converting a coordinate based on a Figma design width of 1280 pixels
 * to the corresponding pixel value in the user's current browser window.
 *
 * @param x - The X coordinate from Figma's design (based on a 1280px wide artboard).
 * @returns The translated X coordinate, scaled to the current window's width.
 */
function translateFigmaX(x: number): number{
    return (x / 1280) * window.innerWidth;
}

/**
 * Translates a Y coordinate from Figma's 720px artboard to the current viewport,
 * specifically for horizontal containers (where width >= height).
 *
 * If the viewport is in a horizontal orientation (width >= height), the Y coordinate
 * is scaled relative to the viewport's height. Otherwise, it is scaled relative to the viewport's width.
 *
 * @param y - The Y coordinate from Figma's 720px artboard.
 * @returns The translated Y coordinate for the current viewport.
 */
function translateFigmaY(y: number): number{
    if(window.innerWidth >= window.innerHeight) return (y / 720) * window.innerHeight;
    return (y / 720) * window.innerWidth;
}
/**
 * Translates a horizontal X coordinate from Figma's design space to the current viewport,
 * adjusting for vertical container layouts. If the viewport is wider than it is tall,
 * the coordinate is scaled based on the window's width. Otherwise, it is scaled based
 * on the window's height with an additional scaling factor for vertical containers.
 *
 * @param x - The X coordinate from Figma's 1280px-wide design space.
 * @returns The translated X coordinate suitable for the current viewport and layout.
 */
function translateFigmaXAlt(x: number): number{
    return window.innerWidth > window.innerHeight ? (x / 1280) * window.innerWidth : (x / 1280) * window.innerHeight * 1.3;
}
/**
 * Translates a horizontal Y coordinate from Figma's design space to the current viewport,
 * adjusting for vertical container layouts. If the viewport is wider than it is tall,
 * the coordinate is scaled based on the window's width. Otherwise, it is scaled based
 * on the window's height with an additional scaling factor for vertical containers.
 *
 * @param y - The Y coordinate from Figma's 720px-tall design space.
 * @returns The translated Y coordinate suitable for the current viewport and layout.
 */
function translateFigmaYAlt(y: number): number{
    return window.innerWidth > window.innerHeight ? (y / 720) * window.innerHeight : (y / 720) * window.innerWidth * 1.15;
}


/**
 * Utility function that converts Figma coordinates and sizes to current window size for horizontal containers.
 * @param x X value from Figma design
 * @param y Y value from Figma design
 * @returns Translated values array in pixels.
 */
function translateFigma(x: number, y: number): number[]{
    return [translateFigmaX(x), translateFigmaY(y)];
}
/**
 * Utility function that converts Figma coordinates and sizes to current window size for vertical containers.
 * @param x X value from Figma design
 * @param y Y value from Figma design
 * @returns Translated values array in pixels.
 */
function translateFigmaAlt(x: number, y: number): number[]{
    return [translateFigmaXAlt(x), translateFigmaYAlt(y)];
}

/**
 * Utility functions that convert Figma coordinates and sizes to current window size.
 * @author Haziel Magallanes
 */
const TranslateFigmaCoords = {translateFigma, translateFigmaX, translateFigmaY, translateFigmaAlt, translateFigmaXAlt, translateFigmaYAlt}
export default TranslateFigmaCoords;