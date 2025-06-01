import TranslateFigmaCoords from "./TranslateFigmaCoords";


/**
 * Returns an array of translation functions for X and Y coordinates,
 * depending on whether the container is vertical or horizontal.
 *
 * @param vertical - If true, selects translation functions for vertical containers; otherwise, for horizontal containers.
 * @returns An array containing the appropriate X and Y translation functions.
 * @author Haziel Magallanes.
 */
export function getTranslates(vertical: boolean): CallableFunction[]{
    // Wich translate function should it use? For vertical or horizontal containers.
    const translateX = vertical
        ? TranslateFigmaCoords.translateFigmaXAlt
        : TranslateFigmaCoords.translateFigmaX;
    const translateY = vertical
        ? TranslateFigmaCoords.translateFigmaYAlt
        : TranslateFigmaCoords.translateFigmaY;
    return [translateX, translateY]
}