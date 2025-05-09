import React from "react";
import "../../styles/index.css";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";

interface LabelProps {
    text?: string; // Texto que se mostrará dentro del div (opcional si se usa children)
    width?: number; // Ancho en unidades de Figma
    height?: number; // Alto en unidades de Figma
    style?: React.CSSProperties; // Estilos opcionales para el div
    className?: string; // Clases CSS opcionales
    onDelete?: () => void; // Función para manejar la acción de eliminar
    children?: React.ReactNode; // Elementos hijos que se renderizarán dentro del div
}

const Label: React.FC<LabelProps> = ({ text, width = 50, height = 20, style, className, onDelete, children }) => {
    return (
        <div
            className={`label-container ${className || ""}`}
            style={{
                width: `${TranslateFigmaCoords.translateFigmaX(width)}px`, // Calcula el ancho
                height: `${TranslateFigmaCoords.translateFigmaY(height)}px`, // Calcula el alto
                padding: "10px", // Espaciado interno
                borderRadius: "20px", // Bordes redondeados
                backgroundColor: "#000000", // Color de fondo
                color: "#333", // Color del texto
                fontSize: "14px", // Tamaño de fuente
                fontWeight: "bold", // Peso de la fuente
                display: "grid", // Cambia a grid
                gridTemplateColumns: "1fr auto", // Define dos columnas
                alignItems: "center", // Centra verticalmente
                gap: "10px", // Espaciado entre columnas
                overflowX: "hidden", // Oculta y bloquea el scroll horizontal
                ...style, // Permite sobrescribir estilos
            }}
        >
            {text && <span>{text}</span>}
            {children}
            <button
                onClick={onDelete}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                }}
                aria-label="Delete"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#ff0000"
                    width="16px"
                    height="16px"
                >
                    <path d="M3 6h18v2H3V6zm2 3h14v12H5V9zm3 2v8h2v-8H8zm6 0v8h2v-8h-2z" />
                </svg>
            </button>
        </div>
    );
};

export default Label;