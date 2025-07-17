import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AplicantsCard from './Aplicants/Applicants';
import "../offers/SeeApplicants.css";
import { useWindowSize } from "../../hooks/responsive/useWindowSize";
import NavBar from "../UI/NavBar";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import AppWindow from "../UI/AppWindow";
import cross_icon from "../../assets/icons/close.svg";

const ModalOverlay: React.FC<{
  title: string;
  postulantes?: { id: number; name: string; profileImage?: string }[];
  onClose: () => void;
}> = ({ title, postulantes, onClose }) => {
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
              onViewProfile={() => alert(`Ver perfil de ${postulante.name}`)}
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
    profileImage?: string;
  };

  type OfferWithApplicants = {
    id: number;
    creator_id: number;
    title: string;
    date: string;
    description: string;
    status: number;
    postulantes?: Postulante[];
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
  useEffect(() => {
    const datosFalsos: OfferWithApplicants[] = [
      {
        id: 1,
        creator_id: 101,
        title: "Desarrollador Frontend Desarrollador Frontend Desarrollador Frontend Desarrollador Frontend Desarrollador Frontend",
        date: "2025-05-30T10:00:00Z",
        description: "Buscamos un frontend con experiencia en React.",
        status: 1,
        postulantes: [
          { id: 201, name: "Juan Pérez", profileImage: "https://i.pravatar.cc/100?img=1" },
          { id: 202, name: "Lucía Gómez", profileImage: "https://i.pravatar.cc/100?img=2" },
        ]
      },
      {
        id: 2,
        creator_id: 101,
        title: "Backend Node.js",
        date: "2025-05-29T11:00:00Z",
        description: "Se busca desarrollador backend con experiencia en Node.js.",
        status: 1,
        postulantes: [
          { id: 203, name: "Carlos Díaz", profileImage: "https://i.pravatar.cc/100?img=3" },
        ]
      },

      {
        id: 3,
        creator_id: 102,
        title: "Diseñador UX/UI",
        date: "2025-05-25T14:00:00Z",
        description: "Se necesita diseñador para app móvil.",
        status: 0,
        postulantes: [
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" },
          { id: 204, name: "Ana López", profileImage: "https://i.pravatar.cc/100?img=4" }

        ]
      },
      {
        id: 4,
        creator_id: 103,
        title: "Fullstack Developer",
        date: "2025-05-28T09:30:00Z",
        description: "Buscamos desarrollador con experiencia en frontend y backend.",
        status: 1,
        postulantes: [
          { id: 205, name: "Mariana Suárez", profileImage: "https://i.pravatar.cc/100?img=5" },
          { id: 206, name: "Pedro Álvarez", profileImage: "https://i.pravatar.cc/100?img=6" }
        ]
      },
      {
        id: 5,
        creator_id: 104,
        title: "QA Tester",
        date: "2025-05-27T13:15:00Z",
        description: "Se busca tester manual y automatizado.",
        status: 0,
        postulantes: [
          { id: 207, name: "Laura Ramírez", profileImage: "https://i.pravatar.cc/100?img=7" }
        ]
      },
      {
        id: 6,
        creator_id: 105,
        title: "Mobile Developer",
        date: "2025-05-26T12:45:00Z",
        description: "Desarrollador con experiencia en React Native o Flutter.",
        status: 1,
        postulantes: []
      },
      {
        id: 7,
        creator_id: 106,
        title: "DevOps Engineer",
        date: "2025-05-25T08:20:00Z",
        description: "Ingeniero DevOps con conocimientos en AWS y CI/CD.",
        status: 1,
        postulantes: [
          { id: 208, name: "Gustavo Herrera", profileImage: "https://i.pravatar.cc/100?img=8" }
        ]
      },
      {
        id: 8,
        creator_id: 107,
        title: "Diseñador Gráfico",
        date: "2025-05-24T14:50:00Z",
        description: "Se busca diseñador para campañas de marketing.",
        status: 0,
        postulantes: [
          { id: 209, name: "Camila Torres", profileImage: "https://i.pravatar.cc/100?img=9" }
        ]
      },
      {
        id: 9,
        creator_id: 108,
        title: "Product Manager",
        date: "2025-05-23T11:00:00Z",
        description: "PM con experiencia en metodologías ágiles.",
        status: 1,
        postulantes: [
          { id: 210, name: "Emilio Ferreyra", profileImage: "https://i.pravatar.cc/100?img=10" },
          { id: 211, name: "Nadia Sosa", profileImage: "https://i.pravatar.cc/100?img=11" }
        ]
      },
      {
        id: 10,
        creator_id: 109,
        title: "Data Analyst",
        date: "2025-05-22T15:10:00Z",
        description: "Analista con manejo de SQL y herramientas BI.",
        status: 1,
        postulantes: [
          { id: 212, name: "Lucas Medina", profileImage: "https://i.pravatar.cc/100?img=12" }
        ]
      },
      {
        id: 11,
        creator_id: 110,
        title: "Cybersecurity Specialist",
        date: "2025-05-21T10:30:00Z",
        description: "Especialista en seguridad informática y auditorías.",
        status: 1,
        postulantes: []
      },
      {
        id: 12,
        creator_id: 111,
        title: "Scrum Master",
        date: "2025-05-20T16:00:00Z",
        description: "Facilitador ágil para equipos de desarrollo.",
        status: 1,
        postulantes: [
          { id: 213, name: "Verónica Ruiz", profileImage: "https://i.pravatar.cc/100?img=13" }
        ]
      },
      {
        id: 13,
        creator_id: 112,
        title: "Game Developer",
        date: "2025-05-19T17:45:00Z",
        description: "Se busca desarrollador con experiencia en Unity o Unreal.",
        status: 0,
        postulantes: [
          { id: 214, name: "Matías Navarro", profileImage: "https://i.pravatar.cc/100?img=14" }
        ]
      },
      {
        id: 14,
        creator_id: 113,
        title: "UX Researcher",
        date: "2025-05-18T10:10:00Z",
        description: "Investigador UX con experiencia en pruebas de usabilidad.",
        status: 1,
        postulantes: [
          { id: 215, name: "Rocío Méndez", profileImage: "https://i.pravatar.cc/100?img=15" }
        ]
      },
      {
        id: 15,
        creator_id: 114,
        title: "Cloud Architect",
        date: "2025-05-17T14:30:00Z",
        description: "Arquitecto Cloud con dominio de Azure o AWS.",
        status: 1,
        postulantes: [
          { id: 216, name: "Federico Márquez", profileImage: "https://i.pravatar.cc/100?img=16" },
          { id: 217, name: "Daniela Ortega", profileImage: "https://i.pravatar.cc/100?img=17" }
        ]
      },
      {
        id: 16,
        creator_id: 115,
        title: "Machine Learning Engineer",
        date: "2025-05-16T09:20:00Z",
        description: "Ingeniero ML con conocimientos en Python y TensorFlow.",
        status: 1,
        postulantes: [
          { id: 218, name: "Esteban Cabrera", profileImage: "https://i.pravatar.cc/100?img=18" }
        ]
      },
      {
        id: 17,
        creator_id: 116,
        title: "Soporte Técnico",
        date: "2025-05-15T12:00:00Z",
        description: "Soporte nivel 1 y 2 para empresa tecnológica.",
        status: 0,
        postulantes: [
          { id: 219, name: "Paula Aguirre", profileImage: "https://i.pravatar.cc/100?img=19" }
        ]
      },
      {
        id: 18,
        creator_id: 117,
        title: "Content Manager",
        date: "2025-05-14T13:15:00Z",
        description: "Gestor de contenido con experiencia en SEO.",
        status: 1,
        postulantes: [
          { id: 220, name: "Diego Salinas", profileImage: "https://i.pravatar.cc/100?img=20" }
        ]
      }
    ];
    setOffers(datosFalsos);
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
            postulantes={ofertaActiva.postulantes}
            onClose={cerrarPopup}
          />
        );
      })()}
    </>
  );
};

export default SeeApplicants;
