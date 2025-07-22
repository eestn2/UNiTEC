import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AplicantsCard from './Aplicants/Applicants';
import "../offers/SeeApplicants.css";
import { useWindowSize } from "../../hooks/responsive/useWindowSize";
import NavBar from "../UI/NavBar";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import AppWindow from "../UI/AppWindow";
import cross_icon from "../../assets/icons/close.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalOverlay: React.FC<{
  title: string;
  postulantes?: { id: number; name: string; profileImage?: string }[];
  onClose: () => void;
}> = ({ title, postulantes, onClose }) => {
    const navigate = useNavigate();
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="popup-card" onClick={e => e.stopPropagation()}>
        <div className="Top">
          <div className="popup-title">{title}</div>
          <button className="cerrar" onClick={onClose}>

            <img src={cross_icon} alt="wazaa" className="cross" />
          </button>
        </div>

        <div className="postulantes-container scroll padding">
          {postulantes?.map((postulante) => (
            <AplicantsCard
              key={postulante.id}
              name={postulante.name}
              profileImage={postulante.profileImage}
              onViewProfile={() => navigate(`/profile/${postulante.id}`)}
              onAccept={() => alert(`Aceptaste a ${postulante.name}`)}
              onContact={() => alert(`Contactaste a ${postulante.name}`)}
              onReject={() => alert(`Rechazaste a ${postulante.name}`)}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

const SeeApplicants: React.FC = () => {
  type Postulante = {
    id: number;
    name: string;
    profile_picture?: string;
  };

  type OfferWithApplicants = {
    id: number;
    creator_id: number;
    title: string;
    description: string;
    status: number;
    applicants?: Postulante[];
  };

  const [offers, setOffers] = useState<OfferWithApplicants[]>([]);
  const [popupActivo, setPopupActivo] = useState<number | null>(null);

  const windowSize = useWindowSize();

  const togglePopup = (offerId: number) => {
    setPopupActivo(popupActivo === offerId ? null : offerId);
  };

  const cerrarPopup = () => {
    setPopupActivo(null);
  };
  useEffect(() => {
    if (popupActivo !== null) {
      // Desactiva el scroll del body
      document.body.style.overflow = 'hidden';
    } else {
      // Restaura el scroll
      document.body.style.overflow = 'auto';
    }

    // Cleanup por si el componente se desmonta
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [popupActivo]);
    const loadOffersWithApplicants = async () => {
    try {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/enterprise/get-offers-and-applicants.php`);
      if (response.status !== 200 && response.data.status !== "success") {
        console.error("Failed to load tags:", response.data.message);
      } else {
        setOffers(response.data.data.offers);
        console.log(response.data.data.offers);
      }
    } catch (error) {
      console.error("An error occurred while loading tags:", error);
    }
  };
  useEffect(() => {
    loadOffersWithApplicants();
  }, []);

  return (
    <>
      <NavBar />
      <AppWindow
        width={1200}
        height={630}
        style={{
          position: "relative",
          top: `${TranslateFigmaCoords.translateFigmaY(80)}px`,
          left: "50%",
          transform: "translate(-50%, 0%)",
          display: "flex",
          flexDirection: 'column',
          alignItems: "center",
          gap: `${TranslateFigmaCoords.translateFigmaY(10)}px`,
          overflow: 'hidden',
          maxHeight: '1px'
        }}
      >
        <div className="Contenedor scroll">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-block">
              <button className="offer-header" onClick={() => togglePopup(offer.id)}>
                <span className="texto-truncado">{offer.title}</span>
              </button>
            </div>
          ))}
        </div>
      </AppWindow>

      {/* Renderizamos el overlay fuera del AppWindow con Portal */}
      {popupActivo !== null && (() => {
        const ofertaActiva = offers.find(o => o.id === popupActivo);
        if (!ofertaActiva) return null;
        return (
          <ModalOverlay
            title={ofertaActiva.title}
            postulantes={ofertaActiva.applicants}
            onClose={cerrarPopup}
          />
        );
      })()}
    </>
  );
};

export default SeeApplicants;
