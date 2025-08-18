import React, { useState } from "react";
import MinimalistSearchBar from "../../UI/form/MinimalSearchBar";
import "../../../styles/Label.css";
import Agregar from "../../../assets/icons/add.svg";
import ResponsiveComponent from "../../../global/interface/ResponsiveComponent";

interface Bloque {
  titulo: string;
  etiquetas: string[];
  placeholder: string;
}

export interface SelectedItem {
  id: number;
  name: string;
  block: "Etiquetas" | "Idiomas";
  level: number;
}

interface SearchData {
  [key: string]: Array<{ id: number; name: string }>;
}

interface LabelsSelectionProps extends ResponsiveComponent {
  blocks: Bloque[];
  searchData: SearchData;
  selectedItems: SelectedItem[];
  setSelectedItems: (items: SelectedItem[]) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  editProfile?: boolean;
}

const LabelsSelection: React.FC<LabelsSelectionProps> = ({
  width,
  height,
  blocks,
  searchData,
  selectedItems,
  setSelectedItems,
  activeTab,
  onTabChange,
  editProfile = false,
}) => {
  const getInitialIndex = () => {
    if (typeof activeTab === 'string') {
      const idx = blocks.findIndex(b => b.titulo === activeTab);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  };

  const [activeIndex, setActiveIndex] = useState(getInitialIndex());
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [currentValue, setCurrentValue] = useState<string>("");
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleAddItem = () => {
    if (!currentValue.trim() || selectedLevel === null) {
      alert("Selecciona un nivel y escribe o elige un item de la lista.");
      return;
    }

    const currentBlock = blocks[activeIndex].titulo as "Etiquetas" | "Idiomas";
    const selectedData = searchData[currentBlock].find(item => 
      item.name.toLowerCase() === currentValue.toLowerCase()
    );

    if (!selectedData) {
      alert("El item seleccionado no es válido.");
      return;
    }

    // Check if item already exists in this block
    const alreadyExists = selectedItems.some(
      item => item.id === selectedData.id && item.block === currentBlock
    );

    if (alreadyExists) {
      alert("Este item ya está añadido.");
      return;
    }

    const newItems = [
      ...selectedItems,
      {
        id: selectedData.id,
        name: selectedData.name,
        block: currentBlock,
        level: selectedLevel,
      },
    ];

    setSelectedItems(newItems);
    clearInputs();
  };

  const clearInputs = () => {
    setCurrentValue("");
    setSelectedLevel(null);
    setSelectedItemId(null);
  };

  // Sync active tab with external prop
  React.useEffect(() => {
    if (typeof activeTab === 'string') {
      const idx = blocks.findIndex(b => b.titulo === activeTab);
      if (idx >= 0 && idx !== activeIndex) setActiveIndex(idx);
    }
    // eslint-disable-next-line
  }, [activeTab, blocks]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    clearInputs();
    if (onTabChange) onTabChange(blocks[index].titulo);
  };

  const handleSuggestionClick = (name: string) => {
    const currentBlock = blocks[activeIndex].titulo;
    const item = searchData[currentBlock].find(item => item.name === name);
    if (item) {
      setCurrentValue(name);
      setSelectedItemId(item.id);
    }
  };

  const levelOptions = ["Básico", "Intermedio", "Avanzado"];

  return (
    <div
      className="labels-selection"
      style={{
        ...(editProfile ? { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } : {}),
        width: width,
        height: height,
      }}
    >
      <div className="slider-tabs">
        {blocks.map((block, index) => (
          <button
            type="button"
            key={index}
            className={index === activeIndex ? "active-tab" : "tab"}
            onClick={() => handleTabClick(index)}
          >
            {block.titulo || "Sin Título"}
          </button>
        ))}
      </div>

      <div className="slider-content">
        <MinimalistSearchBar
          placeholder={blocks[activeIndex].placeholder}
          suggestions={searchData[blocks[activeIndex].titulo]?.map(item => item.name) || []}
          selectedItems={selectedItems.map(item => item.name)}
          value={currentValue}
          onInputChange={(val) => setCurrentValue(val)}
          onSuggestionClick={handleSuggestionClick}
        />

        {blocks.length > 0 && (
          <div className="column">
            <div className="checkbox-group" style={editProfile ? { flexDirection: 'row', justifyContent: 'space-between' } : { flexDirection: 'column' }}>
              {levelOptions.map((opt, i) => (
                <label key={i} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedLevel === i + 1}
                    onChange={() =>
                      setSelectedLevel(selectedLevel === i + 1 ? null : i + 1)
                    }
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <button type="button" className="add-block-button" onClick={handleAddItem}>
        Añadir <img src={Agregar} className="iconMas" alt="" />
      </button>
    </div>
  );
};

export default LabelsSelection;