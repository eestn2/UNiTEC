import React, { ChangeEvent, useState } from "react";
import InputField from "../form/InputField";
import ActionButton from "../ActionButton";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";

interface SearchBarProps {
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (value: string) => void;
  onInputChange?: (value: string) => void; // notify parent for backend fetch
  suggestions?: string[]; // suggestions from parent
  onSuggestionClick?: (suggestion: string) => void;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar...",
  buttonText = "Agregar",
  onSubmit,
  onInputChange,
  suggestions = [],
  onSuggestionClick,
  style,
  inputStyle,
  buttonStyle,
}) => {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
    
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setValue(val);
    if (onInputChange) onInputChange(val);
    setShowSuggestions(val.length >= 3);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setShowSuggestions(false);
    if (onSuggestionClick) onSuggestionClick(suggestion);
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(value);
    setValue("");
    setShowSuggestions(false);
  };

  return (
    <div
        style={{
        position: "relative",
        width: "100%",
        maxWidth: `${TranslateFigmaCoords.translateFigmaX(500)}px`,
        margin: "0 auto",
        ...style,
        }}
    >
        <InputField
        type="text"
        name="search"
        placeholder={placeholder}
        height={60}
        style={{
            borderRadius: `${TranslateFigmaCoords.translateFigmaX(15)}px`,
            border: `${TranslateFigmaCoords.translateFigmaX(1)}px solid #ccc`,
            width: "100%",
            paddingRight:  `${TranslateFigmaCoords.translateFigmaX(120)}px`, // space for button
            boxSizing: "border-box",
            ...inputStyle,
        }}
        value={value}
        onChange={handleInputChange}
        />
        <div
        style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
        }}
        >
        <ActionButton
            style={{
            padding:  `${TranslateFigmaCoords.translateFigmaX(20)}px  ${TranslateFigmaCoords.translateFigmaX(20)}px`,
            backgroundColor: "#5386FF",
            color: "white",
            border: "none",
            borderRadius:  `${TranslateFigmaCoords.translateFigmaX(20)}px`,
            cursor: "pointer",
            ...buttonStyle,
            }}
            text={buttonText}
            action={handleSubmit}
        />
        </div>
        {showSuggestions && suggestions.length > 0 && (
            <ul
            style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 65,
                background: "#fff",
                border: `${TranslateFigmaCoords.translateFigmaX(1)}px solid #ccc`,
                borderRadius: `0 0  ${TranslateFigmaCoords.translateFigmaX(15)}px  ${TranslateFigmaCoords.translateFigmaX(15)}px`,
                margin: 0,
                padding:  `${TranslateFigmaCoords.translateFigmaX(8)}px 0`,
                listStyle: "none",
                zIndex: 3,
                maxHeight:  `${TranslateFigmaCoords.translateFigmaX(200)}px`,
                overflowY: "auto",
                color:"black"
            }}
            >
            {suggestions.map((s, i) => (
                <li
                key={i}
                style={{
                    padding:  `${TranslateFigmaCoords.translateFigmaX(10)}px ${TranslateFigmaCoords.translateFigmaX(20)}px`,
                    cursor: "pointer",
                    borderBottom: i !== suggestions.length - 1 ?  `${TranslateFigmaCoords.translateFigmaX(1)}px solid #eee` : "none",
                }}
                onClick={() => handleSuggestionClick(s)}
                >
                {s}
                </li>
            ))}
            </ul>
      )}
    </div>
  );
};

export default SearchBar;