import React from "react";
import "../../styles/index.css";

interface ActionButtonProps {
    // Define any props you want to pass to the AppWindow component
    height: number;
    text: String;
}

const ActionButton: React.FC<ActionButtonProps> = ({ height, text }) => {
    return (
        <div className="action-button" style={{height: `${(window.innerHeight / 720) * height}px`}}>
            <p>{text}</p>
        </div>
    );
};

export default ActionButton;
