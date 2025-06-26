import { ReactNode } from "react";
import { getTranslates } from "../../global/function/getTranslates";
import ResponsiveComponent from "../../global/interface/ResponsiveComponent";
import ActionButton from "./ActionButton";

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