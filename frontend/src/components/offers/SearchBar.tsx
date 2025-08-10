import React, {
  ChangeEvent,
  useState,
  useRef,
  useEffect,
/*   KeyboardEvent, */
} from "react";
import InputField from "../UI/form/InputField";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import edit_icon from "../../assets/icons/add.svg";

interface SearchBarProps {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onInputChange?: (value: string) => void;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  icon?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  selectedItems: string[]; 
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Añadir lenguaje",
  onSubmit,
  onInputChange,
  suggestions = [],
  selectedItems = [],
  onSuggestionClick,
  icon = edit_icon,
  style,
  inputStyle,
  buttonStyle,
/*   onFocus, */
}) => {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const suggestionsRef = useRef<HTMLUListElement>(null);
  const suggestionItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setValue(val);
    setHighlightIndex(-1);

    const trimmedVal = val.trim().toLowerCase();

    const filtered = trimmedVal
      ? suggestions.filter(
          (s) =>
            s.toLowerCase().includes(trimmedVal) &&
            !selectedItems.some((item) => item.toLowerCase() === s.toLowerCase())
        )
      : suggestions.filter(
          (s) =>
            !selectedItems.some((item) => item.toLowerCase() === s.toLowerCase())
        );

    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);

    if (onInputChange) onInputChange(val);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setValue("");
    setShowSuggestions(false);
    setHighlightIndex(-1);
    if (onSubmit) onSubmit(suggestion);
    if (onSuggestionClick) onSuggestionClick(suggestion);
  };

  const handleSubmit = () => {
    const found = suggestions.find(
      (s) => s.toLowerCase() === value.trim().toLowerCase()
    );
    if (value.trim() !== "" && found) {
      handleSuggestionSelect(found);
    } else if (value.trim() !== "") {
      alert(`"${value.trim()}" no es una opción válida.`);
    }
  };

  /* const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightIndex((prev) =>
        filteredSuggestions.length === 0 ? -1 : (prev + 1) % filteredSuggestions.length
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightIndex((prev) =>
        filteredSuggestions.length === 0
          ? -1
          : prev <= 0
          ? filteredSuggestions.length - 1
          : prev - 1
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (highlightIndex >= 0) {
        handleSuggestionSelect(filteredSuggestions[highlightIndex]);
      } else {
        handleSubmit();
      }
    } else if (event.key === "Escape") {
      setShowSuggestions(false);
    }
  };
 */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      highlightIndex >= 0 &&
      suggestionItemsRef.current[highlightIndex] &&
      suggestionsRef.current
    ) {
      const item = suggestionItemsRef.current[highlightIndex];
      item?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [highlightIndex]);

  return (
    <div
      ref={containerRef} 
      style={{
        position: "relative", 
        width: "100%", 
        ...style,
      }}
    >
      <InputField
        type="text"
        name="search"
        placeholder={placeholder}  
        style={{
          height:'100%',
          borderRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
          width: "100%", 
          paddingRight: `${TranslateFigmaCoords.translateFigmaX(45)}px`,
          boxSizing: "border-box",
          ...inputStyle,
        }}
        value={value}
        onChange={handleInputChange}
        //onKeyDown={handleKeyDown}
        //onFocus={onFocus}
      />

      <div
        style={{
          position: "absolute",
          right: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <div
          onClick={handleSubmit}
          style={{
            color: "white",
            border: "none",
            borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
            cursor: "pointer",
          }}
        >
          {icon && (
            <img
              style={{ alignSelf: "flex-end", ...buttonStyle }}
              src={icon}
              alt="icon"
            />
          )}
        </div>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${TranslateFigmaCoords.translateFigmaX(-115)}px`,
            background: "#fff",
            border: "calc((1/1280) * var(--x-multiplier)) solid #ccc",
            margin: 0,
            padding: `${TranslateFigmaCoords.translateFigmaX(8)}px 0`,
            listStyle: "none",
            zIndex: 3,
            maxHeight: `${TranslateFigmaCoords.translateFigmaX(115)}px`,
            overflowY: "auto",
            color: "black",
          }}
        >
          {filteredSuggestions.map((s, i) => (
            <li
              key={i}
              ref={(el) => {
                suggestionItemsRef.current[i] = el;
              }}
              style={{
                padding: `${TranslateFigmaCoords.translateFigmaX(10)}px ${TranslateFigmaCoords.translateFigmaX(20)}px`,
                cursor: "pointer",
                backgroundColor: i === highlightIndex ? "#eee" : "transparent",
                borderBottom:
                  i !== filteredSuggestions.length - 1
                    ? `${TranslateFigmaCoords.translateFigmaX(1)}px solid #eee`
                    : "none",
              }}
              onMouseEnter={() => setHighlightIndex(i)}
              onClick={() => handleSuggestionSelect(s)}
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
