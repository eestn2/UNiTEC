import React, { useRef, useEffect } from "react";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import "../../../styles/CodeVerification.css"

interface CodeInputProps {
    length?: number;
    onChange?: (value: string) => void;
}

const CodeVerication: React.FC<CodeInputProps> = ({ length = 6, onChange }) => {
    const inputs = Array.from({ length }, () => useRef<HTMLInputElement>(null));

    const getCodeValue = () =>
        inputs.map((ref) => ref.current?.value || "").join("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
        e.target.value = value;

        if (value && index < length - 1) {
            inputs[index + 1].current?.focus();
        }

        onChange?.(getCodeValue());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (inputs[index].current?.value === "" && index > 0) {
                inputs[index - 1].current?.focus();
            }
        }
        if (e.key === "ArrowLeft" && index > 0) {
            inputs[index - 1].current?.focus();
            e.preventDefault();
        }
        if (e.key === "ArrowRight" && index < length - 1) {
            inputs[index + 1].current?.focus();
            e.preventDefault();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const paste = e.clipboardData.getData("text").replace(/\s/g, "").slice(0, length);
        paste.split("").forEach((char, i) => {
            if (inputs[i].current) {
                inputs[i].current.value = char;
            }
        });
        onChange?.(paste);
        e.preventDefault();
    };

    useEffect(() => {
        onChange?.(getCodeValue());
    }, []);

  return (
    <div onPaste={handlePaste} className="contenedorInputs">
        {inputs.map((ref, i) => (
            <input
                key={i}
                ref={ref}
                maxLength={1}
                onInput={(e) => handleInput(e as React.ChangeEvent<HTMLInputElement>, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                style={i === Math.floor(length / 2) ? { marginLeft:`${TranslateFigmaCoords.translateFigmaX(15)}px`, } : undefined}
            />
        ))}
    </div>
);

};

export default CodeVerication;
