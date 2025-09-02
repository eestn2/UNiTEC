// SeeApplicants.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../UI/NavBar"; 
import ModalOverlay from "./ModalOverlay";
import styles from "../offers/SeeApplicants.module.css";
import ActionButton from "../UI/ActionButton";
import ConfirmModal from "../UI/Modals/ConfirmModal";

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
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const togglePopup = (offerId: number) => {
    setPopupActivo(popupActivo === offerId ? null : offerId);
  };

  const cerrarPopup = () => {
    setPopupActivo(null);
  };

  const handleDisable = async (offerId: number) => {
    try {
      const response = await axios.put('/enterprise/end-job-offer.php', {
        offer_id: offerId
      });
      if (response.data.status === "success") {
        console.log("Estado de la oferta actualizado con exito.");
        setOffers((prevOffers) =>
          prevOffers.map((offer) =>
            offer.id === offerId ? { ...offer, status: 0 } : offer
          ));
        setShowConfirmationModal(false);
      } else {
        console.error("Ocurrio un error.")
      }
    } catch (e) {
      console.error("Error al actualizar el estado de la oferta:", e);
    }

  }

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
      const response = await axios.get(
        '/enterprise/get-offers-and-applicants.php'
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
      <div className={`${styles['app-window']} app-window`}>
         <span className={`${styles['top-title']} top-section title`} >
                   Tus ofertas
                </span>
        <div className={`${styles.Contenedor} ${styles.scroll}`}>
          {loading && <p>Cargando ofertas...</p>}
          {error && <p>{error}</p>}
          {!loading &&
            !error &&
            offers.map((offer) => (
              <div key={offer.id} className={styles["offer-block"]}>
                <button
                  className={styles['offer-header']}
                  onClick={() => togglePopup(offer.id)}
                  style={offer.status === 0 ? { backgroundColor: "#c9c9c9" } : {}}
                >
                  <span className={`${styles['texto-truncado']} ${styles['texto-truncado2']}`}>{offer.title}</span>
                  {offer.status !== 0 && (
                    <ActionButton text="Cerrar" height={"80%"} style={{ backgroundColor: "var(--danger)" }} action={() => {
                      setShowConfirmationModal(true);
                    }} />
                  )}
                </button>
              </div>
            ))}
        </div>
      </div>

      {ofertaActiva && !showConfirmationModal && (
        <ModalOverlay
          title={ofertaActiva.title}
          postulantes={ofertaActiva.applicants}
          offerID={ofertaActiva.id}
          onClose={cerrarPopup}
          externalStatusChanger={changeInternalStatus}
        />
      )}
      {ofertaActiva && showConfirmationModal && (
        <ConfirmModal
          title="Confirmar eliminación"
          message="¿Estás seguro de que deseas eliminar esta oferta?"
          onAccept={() => handleDisable(ofertaActiva.id)}
          onReject={() => setShowConfirmationModal(false)}
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
    </>
  );
};

export default SeeApplicants;
