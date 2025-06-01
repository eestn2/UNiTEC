import { useState, useEffect } from "react";
import Tag from "../components/UI/Tag";

export function useAutocomplete(opciones: string[]) {
  const [input, setInput] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const filteredOptions = opciones.filter(
    (option) =>
      option.toLowerCase().includes(input.toLowerCase()) &&
      !selectedOptions.includes(option)
  );

  // Reinicia el índice resaltado al escribir
  useEffect(() => {
    setHighlightedIndex(0);
  }, [input]);

  const handleSelect = (option: string) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setInput("");
    setHighlightedIndex(0);
  };

 const handleEnter = () => {
  const trimmedInput = input.trim();

  if (trimmedInput === "") return; // ✅ No hacer nada si está vacío

  const exactMatch = opciones.find(
    (option) => option.toLowerCase() === trimmedInput.toLowerCase()
  );

  if (exactMatch && !selectedOptions.includes(exactMatch)) {
    setSelectedOptions([...selectedOptions, exactMatch]);
    setInput("");
    setHighlightedIndex(0);
  } else if (filteredOptions.length > 0) {
    const highlightedOption = filteredOptions[highlightedIndex];
    if (highlightedOption && !selectedOptions.includes(highlightedOption)) {
      setSelectedOptions([...selectedOptions, highlightedOption]);
      setInput("");
      setHighlightedIndex(0);
    }
  }
};


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEnter();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 < filteredOptions.length ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev - 1 >= 0 ? prev - 1 : filteredOptions.length - 1
      );
    }
  };

  const etiquetas = selectedOptions.map((option, i) => (
    <Tag
      key={i}
      texto={option}
      onDelete={() =>
        setSelectedOptions(selectedOptions.filter((item) => item !== option))
      }
    />
  ));

  return {
    input,
    setInput,
    handleEnter,
    handleKeyDown,
    handleSelect,
    filteredOptions,
    highlightedIndex,
    etiquetas,
    isFocused,
    setIsFocused,
  };
}
