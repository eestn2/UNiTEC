/**
 * @file InputField.tsx
 * @description A reusable React component for creating responsive input fields in the app.
 * Converts width and height from pixels to responsive units based on screen size.
 * @author Haziel Magallanes, Daviel Díaz Gonzáles, Matias Emiliano Grecco
 * @date May 11, 2025
 */

import { ChangeEventHandler } from "react";
import ResponsiveComponent from "../../../global/interface/ResponsiveComponent";
import useResponsiveDimensions from "../../../hooks/responsive/useResponsiveDimensions";

/**
 * Props for the `InputField` component.
 *
 * @extends ResponsiveComponent
 *
 * @property type - The type of the input field (e.g., "text", "date", "email", etc.).
 * @property name - The name attribute for the input field, used for form submission.
 * @property placeholder - The placeholder text for the input field.
 * @property onChange - Optional event handler called when the input value changes.
 * @property vertical - Decides wich TranslateFigmaCoords function to use (Default: false).
 * @property max - Optional maximum date for date inputs.
 * @property min - Optional minimum date for date inputs.
 * @property style - Optional inline styles to apply to the input field.
 * @property className - Optional custom CSS classes to apply to the input field.
 * 
 * @author Haziel Magallanes, Daviel Díaz Gonzáles
 */
interface InputFieldProps extends ResponsiveComponent {
    /** The type of the input field (e.g., "text", "date", "email", etc.). */
    type: string;
    /** The name attribute for the input field, used for form submission. */
    name: string;
    /** The placeholder text for the input field. */
    placeholder: string;
    /** Optional event handler called when the input value changes. */
    onChange?: ChangeEventHandler;

    value?: string;
    /** Decides wich TranslateFigmaCoords function to use (Default: false).*/
    vertical?: boolean;
    /** Optional maximum date for date inputs. */
    max?: string;
    /** Optional minimum date for date inputs. */
    min?: string;
    /** Optional inline styles to apply to the input field. */
    style?: React.CSSProperties;
    /** Optional custom CSS classes to apply to the input field. */
    className?: string;
    /** Optional key down event handler. */
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    /** Optional focus event handler. */
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * A React functional component that renders a customizable input field.
 *
 * @component
 * @param {InputFieldProps} props - The properties for the InputField component.
 * @param {number} [props.width=50] - The width of the input field in Figma coordinates.
 * @param {number} [props.height=10] - The height of the input field in Figma coordinates.
 * @param {string} props.type - The type of the input field (e.g., "text", "date").
 * @param {string} props.name - The name attribute for the input field.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {boolean} props.vertical - Decides wich TranslateFigma Function to use (Default: false).
 * @param {React.CSSProperties} [props.style] - Additional inline styles for the input field.
 * @param {string} [props.className] - Additional CSS class names for the input field.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange] - Callback function triggered when the input value changes.
 * @param {string} [props.max] - Maximum date for date inputs.
 * @param {string} [props.min] - Minimum date for date inputs.
 *
 * @returns {JSX.Element} A styled input field.
 *
 * @example
 * ```tsx
 * <InputField
 *   width={100}
 *   height={20}
 *   type="text"
 *   name="username"
 *   placeholder="Enter your username"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 * ```
 * @author Haziel Magallanes, Daviel Díaz Gonzáles
 */
const InputField: React.FC<InputFieldProps> = ({
    width = 50,
    height = 10,
    onChange,
    type,
    name,
    vertical = false,
    placeholder = "Input field",
    style,
    className,
    value,
    children,
    max,
    min,
    onKeyDown,
    onFocus,
}) => {
    const { finalHeight, finalWidth, translateX } = useResponsiveDimensions({
        height,
        width,
        vertical
    });
    
    return (
        <input
            style={{
                width: finalWidth,
                height: finalHeight,
                paddingLeft: `${translateX(18)}px`,
                ...style,
            }}
            name={name}
            type={type}
            placeholder={placeholder}
            className={`input-field ${className || ""}`}
            onChange={onChange}
            value={value}
            max={type === "date" ? max : undefined}
            min={type === "date" ? min : undefined}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
        >{children}</input>
    );
};

export default InputField;