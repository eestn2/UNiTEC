import React, { useState } from "react";
import MinimalistSearchBar from "../../UI/form/MinimalSearchBar";
import "../../../styles/Label.css";
import Agregar from "../../../assets/icons/add.svg";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
interface Bloque {
  titulo: string;
  etiquetas: string[];
  placeholder: string;
}

export interface EtiquetaSeleccionada {
  etiqueta: string;
  bloque: string;
  valorCheckbox: string;
}

interface LabelsSelectionProps {
  width?: number;
  height?: number;
  blocks: Bloque[];
  searchData: Record<string, string[]>;
  etiquetasSeleccionadas: EtiquetaSeleccionada[];
  setEtiquetasSeleccionadas: (etiquetas: EtiquetaSeleccionada[]) => void;
}

const LabelsSelection: React.FC<LabelsSelectionProps> = ({
  width = 100,
  height = 50,
  blocks,
  searchData,
  etiquetasSeleccionadas,
  setEtiquetasSeleccionadas,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [checkboxSeleccionado, setCheckboxSeleccionado] = useState<string | null>(null);
  const [valorActual, setValorActual] = useState<string>("");

  const handleAgregarEtiqueta = () => {
    if (!valorActual.trim() || !checkboxSeleccionado) {
      alert("Selecciona un valor del checkbox y escribe o elige una etiqueta.");
      return;
    }

    const bloqueActual = blocks[activeIndex].titulo;

    // Verifica que no esté duplicada
    const yaExiste = etiquetasSeleccionadas.some(
      (etq) =>
        etq.etiqueta.toLowerCase() === valorActual.trim().toLowerCase() &&
        etq.bloque === bloqueActual
    );

    if (yaExiste) {
      alert("Esa etiqueta ya está añadida.");
      return;
    }

    const nuevasEtiquetas = [
      ...etiquetasSeleccionadas,
      {
        etiqueta: valorActual.trim(),
        bloque: bloqueActual,
        valorCheckbox: checkboxSeleccionado,
      },
    ];

    setEtiquetasSeleccionadas(nuevasEtiquetas);
    LimpiarInputs();
  };

  const LimpiarInputs = () => {
    setValorActual("");
    setCheckboxSeleccionado(null);
  };

  return (
    <div
      className="labels-selection"
      style={{
        width: `${TranslateFigmaCoords.translateFigmaX(width)}px`,
        height: `${TranslateFigmaCoords.translateFigmaX(height)}px`,
      }}
    >
      <div className="slider-tabs">
        {blocks.map((block, index) => (
          <button
            type="button"
            key={index}
            className={index === activeIndex ? "active-tab" : "tab"}
            onClick={() => {
              setActiveIndex(index);
              LimpiarInputs();
            }}
          >
            {block.titulo || "Sin Título"}
          </button>
        ))}
      </div>

      <div className="slider-content">
        <MinimalistSearchBar
          placeholder={blocks[activeIndex].placeholder}
          suggestions={searchData[blocks[activeIndex].titulo] || []}
          selectedItems={etiquetasSeleccionadas.map((e) => e.etiqueta)}
          value={valorActual}
          onInputChange={(val) => setValorActual(val)}
          onSuggestionClick={(val) => setValorActual(val)}
        />

        {blocks.length > 0 && (
          <div className="column">
            <div className="checkbox-group">
              {blocks[activeIndex].etiquetas.map((opt, i) => (
                <label key={i} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={checkboxSeleccionado === opt}
                    onChange={() =>
                      setCheckboxSeleccionado(checkboxSeleccionado === opt ? null : opt)
                    }
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <button type="button" className="add-block-button" onClick={handleAgregarEtiqueta}>
        Añadir  <img src={Agregar} className="iconMas" alt="" />
      </button>
    </div>
  );
};

export default LabelsSelection;
