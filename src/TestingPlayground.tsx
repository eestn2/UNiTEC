import React from "react";
import "./styles/index.css";
import InputField from "./components/UI/InputField";

const TestingPlayground: React.FC = () => {
    return (
        <div className="test-container">
            <InputField placeholder="Campo de texto" width = {150} height={60}></InputField>
        </div>
    );
};

export default TestingPlayground;