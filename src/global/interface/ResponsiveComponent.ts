/**
 * @file ResponsiveComponent.ts
 * @description Interface for creating responsive UI components with consistent props.
 * @date May 11, 2025
 * 
 * @Author: Haziel Magallanes
 */

/** 
 *  Type representing vw, vh, dvh and % units. */
type ResponsiveUnit = `${number}${'vw' | 'vh' | 'dvh' | '%' | 'px'}` | 'auto' | 'fit-content' | 'max-content' | 'min-content';

/**
 * Interface for creating responsive UI components with consistent props.
 *
 * @interface ResponsiveComponent
 *
 * @property {number | ResponsiveUnit} [width] - The width of the component in pixels (Later converted with {@link global/function/TranslateFigmaCoords}) or responsive units..
 * @property {number | ResponsiveUnit} [height] - The height of the component in pixels (Later converted with {@link global/function/TranslateFigmaCoords}) or responsive units..
 * @property {boolean} [vertical] - Decides wich TranslateFigma Function to use.
 * @property {React.ReactNode} [children] - The children elements to render inside the component.
 * @property {React.CSSProperties} [style] - Inline styles to apply to the component.
 * @property {string} [className] - Custom CSS classes to apply to the component.
 * @property {React.RefObject<HTMLDivElement>} [ref] - A ref to the component for direct DOM manipulation.
 *
 * @author Haziel Magallanes
 */

export default interface ResponsiveComponent {
    /** The width of the component in pixels (Later converted with {@link global/function/TranslateFigmaCoords}) or responsive units. */
    width?: number | ResponsiveUnit;
    /** The height of the component in pixels (Later converted with {@link global/function/TranslateFigmaCoords}) or responsive units.*/
    height?: number | ResponsiveUnit;
    /** Decides wich TranslateFigma Function to use. */
    vertical?: boolean;
    /** The children elements to render inside the component. */
    children?: React.ReactNode;
    /** Inline styles to apply to the component. */
    style?: React.CSSProperties;
    /** Custom CSS classes to apply to the component. */
    className?: string;
    /** A ref to the component for direct DOM manipulation. */
    ref?: React.RefObject<HTMLDivElement>;
};