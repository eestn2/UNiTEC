import React from "react";
import "../../styles/index.css";

interface AppWindowProps{
    // Define any props you want to pass to the AppWindow component
    width: number;
    height: number;
}

const AppWindow: React.FC<AppWindowProps> = ({ height }) => {
    return (
        <div className="app-window" style={{height: `${(window.innerHeight / 720) * height}px`}}>
        </div>
    );
};

export default AppWindow;
