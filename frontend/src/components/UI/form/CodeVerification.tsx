import React, { useState, useEffect } from "react";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import "../../../styles/CodeVerification.css"

interface CodeInputProps {
    length?: number;
    onChange?: (value: string) => void;
}

const CodeVerification: React.FC<CodeInputProps> = ({ length = 6, onChange }) => {
    const [values, setValues] = useState<string[]>(Array(length).fill(""));
    const inputsRefs = Array.from({ length }, () => React.createRef<HTMLInputElement>());

    const getCodeValue = () => values.join("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        if (value && index < length - 1) {
            inputsRefs[index + 1].current?.focus();
        }

        onChange?.(newValues.join(""));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (values[index] === "" && index > 0) {
                inputsRefs[index - 1].current?.focus();
            }
        }
        if (e.key === "ArrowLeft" && index > 0) {
            inputsRefs[index - 1].current?.focus();
            e.preventDefault();
        }
        if (e.key === "ArrowRight" && index < length - 1) {
            inputsRefs[index + 1].current?.focus();
            e.preventDefault();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const paste = e.clipboardData.getData("text").replace(/\s/g, "").slice(0, length);
        const newValues = paste.split("").concat(Array(length).fill("")).slice(0, length);
        setValues(newValues);
        onChange?.(newValues.join(""));
        e.preventDefault();
        // Focus the next empty input after paste
        const nextIndex = newValues.findIndex((v) => v === "");
        if (nextIndex !== -1) {
            inputsRefs[nextIndex].current?.focus();
        }
    };

    useEffect(() => {
        onChange?.(getCodeValue());
        // eslint-disable-next-line
    }, []);

    return (
        <div onPaste={handlePaste} className="contenedorInputs">
            {values.map((val, i) => (
                <input
                    key={i}
                    ref={inputsRefs[i]}
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleInput(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    style={i === Math.floor(length / 2) ? { marginLeft: `${TranslateFigmaCoords.translateFigmaX(15)}px` } : undefined}
                />
            ))}
        </div>
    );
};

export default CodeVerification;
