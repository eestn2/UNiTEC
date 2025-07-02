/**
 * @file StateButton.tsx
 * @description A reusable React component for rendering a toggleable button that visually represents and switches between two states.
 * The button adapts its size responsively based on Figma design coordinates and can display different icons, text, and colors for each state.
 * Integrates with the ActionButton component and supports all responsive props defined in {@link ResponsiveComponent}.
 *
 * @author Haziel Magallanes
 * @date June 26, 2025
 */
import { ReactNode } from "react";
import { getTranslates } from "../../global/function/getTranslates";
import ResponsiveComponent from "../../global/interface/ResponsiveComponent";
import ActionButton from "./ActionButton";

/**
 * Props for the `StateButton` component.
 *
 * @extends ResponsiveComponent
 * @property {boolean} state - The current state of the button (true/false).
 * @property {(state: boolean) => void} setState - Function to update the state.
 * @property {string} trueIcon - Icon to display when the state is false (button will switch to true).
 * @property {string} falseIcon - Icon to display when the state is true (button will switch to false).
 * @property {string} trueText - Text to display when the state is false (button will switch to true).
 * @property {string} falseText - Text to display when the state is true (button will switch to false).
 * @property {string} [trueColor="#3C1729"] - Border and text color when state is true.
 * @property {string} [falseColor="#17373C"] - Border and text color when state is false.
 * @property {(state: boolean) => void} [action] - Optional callback triggered when the button is clicked and state changes.
 * @property {ReactNode} [children] - Optional children to render inside the button.
 *
 * @author Haziel Magallanes
 */
interface StateButtonProps extends ResponsiveComponent {
    width?: number;
    height?: number;
    state: boolean;
    setState: (state: boolean) => void;
    trueIcon: string;
    falseIcon: string;
    trueText: string;
    falseText: string;
    trueColor?: string;
    falseColor?: string;
    action?: (state: boolean) => void;
    children?: ReactNode;
}

/**
 * Renders a toggleable, responsive button that switches between two states, each with its own icon, text, and color.
 * The button uses Figma-based coordinates for responsive sizing and integrates with the ActionButton component.
 *
 * @param {number} [width=140] - The width of the button in Figma coordinates or responsive units.
 * @param {number} [height=45] - The height of the button in Figma coordinates or responsive units.
 * @param {boolean} state - The current state of the button.
 * @param {(state: boolean) => void} setState - Function to update the state.
 * @param {string} trueIcon - Icon to display when the state is false (button will switch to true).
 * @param {string} falseIcon - Icon to display when the state is true (button will switch to false).
 * @param {string} trueText - Text to display when the state is false (button will switch to true).
 * @param {string} falseText - Text to display when the state is true (button will switch to false).
 * @param {string} [trueColor="#3C1729"] - Border and text color when state is true.
 * @param {string} [falseColor="#17373C"] - Border and text color when state is false.
 * @param {(state: boolean) => void} [action] - Optional callback triggered when the button is clicked and state changes.
 * @param {ReactNode} [children] - Optional children to render inside the button.
 * @param {boolean} [vertical=false] - Decides which translation function to use for responsive sizing.
 * @param {React.CSSProperties} [style] - Inline styles to apply to the button.
 * @param {string} [className] - Custom CSS classes to apply to the button.
 *
 * @returns {JSX.Element} - The StateButton component.
 *
 * @example
 * ```tsx
 * <StateButton
 *   state={isActive}
 *   setState={setIsActive}
 *   trueIcon="/icons/on.svg"
 *   falseIcon="/icons/off.svg"
 *   trueText="On"
 *   falseText="Off"
 * />
 * ```
 *
 * @author Haziel Magallanes
 */
const StateButton: React.FC<StateButtonProps> = ({
    height = 45,
    vertical = false,
    width = 140,
    style,
    className,
    state,
    setState,
    trueIcon,
    falseIcon,
    trueText,
    falseText,
    trueColor = "#3C1729",
    falseColor = "#17373C",
    action,
    children,
    ...rest
}) => {
    const [translateX, translateY] = getTranslates(vertical);

    const buttonStyle: React.CSSProperties = !state
        ? { border: `${translateY(4)}px solid ${falseColor}`, color: falseColor }
        : { border: `${translateY(4)}px solid ${trueColor}`, color: trueColor };

    return (
        <ActionButton
            height={height}
            vertical={vertical}
            width={width}
            className={className}
            style={{
                display: "flex",
                backgroundColor: "white",
                padding: 0,
                columnGap: 0,
                position: "relative",
                fontWeight: 600,
                ...buttonStyle,
                ...style,
            }}
            action={() => {
                setState(!state);
                action?.(!state);
            }}
            {...rest}
        >
            <img
                src={!state ? trueIcon : falseIcon}
                className="centered-y"
                alt="State Icon"
                style={{
                    width: translateY(height - 10),
                    height: translateY(height - 10),
                    position: "absolute",
                    left: translateX(2),
                }}
            />
            <span
                style={{
                    fontSize: translateY(20),
                    position: "absolute",
                    left: translateX(36),
                }}
            >
                {!state ? trueText : falseText}
            </span>
            {children}
        </ActionButton>
    );
};

export default StateButton;