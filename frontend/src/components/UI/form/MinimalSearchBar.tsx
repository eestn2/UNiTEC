// MinimalistSearchBar.tsx
import React, {
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";
import "../../../styles/MinimalSearchBar.css";
import lupa from '../../../assets/icons/lupa.svg';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onSubmit?: (value: string) => void;
  onInputChange: (value: string) => void;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  selectedItems: string[];
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

const MinimalistSearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Añadir etiqueta",
  value,
  onSubmit,
  onInputChange,
  suggestions = [],
  selectedItems = [],
  onSuggestionClick,
  style,
  inputStyle,
  onFocus,
}) => {
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState<number>(-1);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>([]);

  const suggestionsRef = useRef<HTMLUListElement>(null);
  const suggestionItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    onInputChange(val);
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
  };

  const handleSuggestionSelect = (suggestion: string) => {
    onInputChange(suggestion);
    setHighlightIndex(-1);
    if (onSubmit) onSubmit(suggestion);
    if (onSuggestionClick) onSuggestionClick(suggestion);
    // Esperar a que el padre actualice selectedItems antes de ocultar sugerencias
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
      } else if (value.trim() !== "") {
        const match = suggestions.find(
          (s) => s.toLowerCase() === value.trim().toLowerCase()
        );
        if (match && onSubmit) {
          onSubmit(match);
        } else {
          alert("La etiqueta ingresada no está en las opciones.");
        }
      }
    } else if (event.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // 🔴 Alerta y limpieza si lo ingresado no es válido
  useEffect(() => {
    const handleBlur = (event: FocusEvent) => {
      const input = event.target as HTMLInputElement;
      const match = suggestions.find(
        (s) => s.toLowerCase() === input.value.trim().toLowerCase()
      );
      if (input.value.trim() !== "" && !match) {
        alert("La etiqueta ingresada no está en las opciones.");
        onInputChange("");
      }
    };

    const input = containerRef.current?.querySelector("input");
    input?.addEventListener("blur", handleBlur);
    return () => input?.removeEventListener("blur", handleBlur);
  }, [suggestions, onInputChange]);

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
    <div className="searchbar" ref={containerRef} style={style}>
      <div className="searchbar-icon">
        <img src={lupa} className="searchbar-lupa" alt="" />
      </div>

      <input
        type="text"
        className="searchbar-input"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        style={inputStyle}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="searchbar-suggestions" ref={suggestionsRef}>
          {filteredSuggestions.map((s, i) => (
            <li
              key={i}
              ref={(el) => {
                suggestionItemsRef.current[i] = el;
              }}
              className={`suggestion-item ${i === highlightIndex ? "highlighted" : ""}`}
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

export default MinimalistSearchBar;
