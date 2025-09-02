// ModalOverlay.tsx
import React from "react";
import { createPortal } from "react-dom";
import ApplicantsCard from './Aplicants/ApplicantsCard';
import cross_icon from "../../assets/icons/close.svg";
import { useNavigate } from "react-router-dom";
import "./SeeApplicants.module.css"; // general styles
import styles from "./SeeApplicants.module.css";

type Postulante = {
  id: number;
  name: string;
  profile_picture?: string;
  status: number;
};

interface ModalOverlayProps {
  title: string;
  postulantes?: Postulante[];
  offerID: number;
  onClose: () => void;
  externalStatusChanger: (    offerId: number, postulanteId: number, newStatus: number) => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  title,
  postulantes,
  offerID,
  onClose,
  externalStatusChanger
}) => {
  const navigate = useNavigate();

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles["popup-card"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles.Top}>
          <div className={styles["popup-title"]}>{title}</div>
          <button className={styles.cerrar} onClick={onClose}>
            <img src={cross_icon} alt="close" className={styles.cross} />
          </button>
        </div>
        <div className={`${styles["postulantes-container"]} scroll padding`}>
          {postulantes?.length === 0 && <p>No hay postulantes para esta oferta.</p>}
            {postulantes?.map((postulante) => (
            <ApplicantsCard
                key={postulante.id}
                name={postulante.name}
                profileImage={postulante.profile_picture}
                status={postulante.status}
                offerId={offerID}
                userId={postulante.id}
                onViewProfile={() => navigate(`/profile/${postulante.id}`)}
                externalStatusChanger={(newStatus) =>
                externalStatusChanger(offerID, postulante.id, newStatus)
                }
            />))}
        </div>
      </div>
    </div>,
    document.body
)};

export default ModalOverlay;
