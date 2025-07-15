import React from "react";

interface ModalProps {
  title: string;
  text: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, text, onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      width: "100%",
    }}
    onClick={onClose} // Cierra al hacer clic en el fondo
  >
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "24px",
        minWidth: "30%",
        maxWidth: "80%",
        position: "relative",
        boxShadow: "0 2px 16px rgba(0,0,0,0.2)"
      }}
      onClick={e => e.stopPropagation()} // Evita que el clic en el modal cierre
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "none",
          border: "none",
          cursor: "pointer"
        }}
        aria-label="Cerrar"
      >
        <svg width="24" height="24" fill="#113893" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
      <h2 style={{marginTop: 0, color: "#113893"}}>{title}</h2>
      <p style={{color:"black"}}>{text}</p>
    </div>
  </div>
);

export default Modal;