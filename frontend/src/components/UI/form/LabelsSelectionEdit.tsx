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

export interface EtiquetaSeleccionada {
  etiqueta: string;
  bloque: string;
  valorCheckbox: string;
}

interface LabelsSelectionProps extends ResponsiveComponent {
  blocks: Bloque[];
  searchData: Record<string, string[]>;
  etiquetasSeleccionadas: EtiquetaSeleccionada[];
  setEtiquetasSeleccionadas: (etiquetas: EtiquetaSeleccionada[]) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  editProfile?: boolean;
}

const LabelsSelection: React.FC<LabelsSelectionProps> = ({
  width,
  height,
  blocks,
  searchData,
  etiquetasSeleccionadas,
  setEtiquetasSeleccionadas,
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

  // Sincroniza el tab activo con el prop externo
  React.useEffect(() => {
    if (typeof activeTab === 'string') {
      const idx = blocks.findIndex(b => b.titulo === activeTab);
      if (idx >= 0 && idx !== activeIndex) setActiveIndex(idx);
    }
    // eslint-disable-next-line
  }, [activeTab, blocks]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    LimpiarInputs();
    if (onTabChange) onTabChange(blocks[index].titulo);
  };

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

      <div className="slider-content" >
        <MinimalistSearchBar
          placeholder={blocks[activeIndex].placeholder}
          suggestions={searchData[blocks[activeIndex].titulo] || []}
          selectedItems={etiquetasSeleccionadas.map((e) => e.etiqueta)}
          value={valorActual}
          onInputChange={(val) => setValorActual(val)}
          onSuggestionClick={(val) => setValorActual(val)}
        />

        {blocks.length > 0 && (
          <div className="column" >
            <div className="checkbox-group" style={editProfile ? { flexDirection: 'row', justifyContent: 'space-between' } : { flexDirection: 'column' }}>
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
