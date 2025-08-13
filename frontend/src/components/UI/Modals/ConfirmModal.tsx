import React from "react";
import { createPortal } from "react-dom";
import cross_icon from "../../../assets/icons/close.svg";

interface ConfirmModalProps {
  title: string;
  message?: string;
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  onAccept,
  onReject,
  onClose
}) => {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}>
            <img src={cross_icon} alt="close" className="modal-close-icon" />
          </button>
        </div>

        <div className="modal-body">
          {message && <p className="modal-message">{message}</p>}
        </div>

        <div className="modal-footer">
          <button className="modal-btn modal-btn-reject" onClick={onReject}>
            Cancelar
          </button>
          <button className="modal-btn modal-btn-accept" onClick={onAccept}>
            Aceptar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
