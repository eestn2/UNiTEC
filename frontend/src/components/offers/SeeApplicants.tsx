// SeeApplicants.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../UI/NavBar";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import AppWindow from "../UI/AppWindow";
import ModalOverlay from "./ModalOverlay";
import "../offers/SeeApplicants.css";

type Postulante = {
  id: number;
  name: string;
  profile_picture?: string;
  status: number;
};

type OfferWithApplicants = {
  id: number;
  creator_id: number;
  title: string;
  description: string;
  status: number;
  applicants?: Postulante[];
};

const SeeApplicants: React.FC = () => {
  const [offers, setOffers] = useState<OfferWithApplicants[]>([]);
  const [popupActivo, setPopupActivo] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const togglePopup = (offerId: number) => {
    setPopupActivo(popupActivo === offerId ? null : offerId);
  };

  const cerrarPopup = () => {
    setPopupActivo(null);
  };

  const changeInternalStatus = (
    offerId: number,
    postulanteId: number,
    newStatus: number
  ) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              applicants: offer.applicants?.map((postulante) =>
                postulante.id === postulanteId
                  ? { ...postulante, status: newStatus }
                  : postulante
              ),
            }
          : offer
      )
    );
  };

  useEffect(() => {
    document.body.style.overflow = popupActivo !== null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [popupActivo]);

  const loadOffersWithApplicants = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.PROD
        ? import.meta.env.VITE_API_URL_PROD
        : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(
        `${apiUrl}/enterprise/get-offers-and-applicants.php`
      );
      if (response.status !== 200 || response.data.status !== "success") {
        setError("Error al cargar ofertas.");
      } else {
        setOffers(response.data.data.offers);
      }
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffersWithApplicants();
  }, []);

  const ofertaActiva = offers.find((o) => o.id === popupActivo);

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
          flexDirection: "column",
          alignItems: "center",
          gap: `${TranslateFigmaCoords.translateFigmaY(10)}px`,
          overflow: "hidden",
          maxHeight: "1px",
        }}
      >
        <div className="Contenedor scroll">
          {loading && <p>Cargando ofertas...</p>}
          {error && <p>{error}</p>}
          {!loading &&
            !error &&
            offers.map((offer) => (
              <div key={offer.id} className="offer-block">
                <button
                  className="offer-header"
                  onClick={() => togglePopup(offer.id)}
                >
                  <span className="texto-truncado">{offer.title}</span>
                </button>
              </div>
            ))}
        </div>
      </AppWindow>

      {ofertaActiva && (
        <ModalOverlay
          title={ofertaActiva.title}
          postulantes={ofertaActiva.applicants}
          offerID={ofertaActiva.id}
          onClose={cerrarPopup}
          externalStatusChanger={changeInternalStatus}
        />
      )}
    </>
  );
};

export default SeeApplicants;
