/**Interface for creating our components.
 */
export default interface ResponsiveComponent {
    /*** The width of the component in pixels (converted to responsive units).*/
    width?: number;
    /*** The height of the component in pixels (converted to responsive units).*/
    height?: number;
    /*** The children elements to render inside the component.*/
    children?: React.ReactNode;
    /*** Inline styles to apply to the component.*/
    style?: React.CSSProperties;
    /*** Custom CSS classes to apply to the component.*/
    className?: string;
    /*** A ref to the component for direct DOM manipulation.*/
    ref? : React.RefObject<HTMLDivElement>;
};