import React from "react";
import "../../styles/index.css";

interface AppWindowProps{
    // Define any props you want to pass to the AppWindow component
    children?: React.ReactNode
    width: number;
    height: number;
}

const AppWindow: React.FC<AppWindowProps> = ({ height , width, children}) => {
    return (
        <div className="app-window" style={{height: `${(window.innerHeight / 720) * height}px`, width: `${(window.innerWidth / 1280) * width}px`}}>
            {children};
        </div>
    );
};

export default AppWindow;
