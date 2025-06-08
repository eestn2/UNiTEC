import { useState, useEffect } from "react";
import type { offer } from "../../types/JobOfferTypes";
import UserCard from './Applicants';
import './SeeApplicants.css'
const SeeApplicants: React.FC = () => {
  const [offers, setOffers] = useState<offer[]>([]);

  useEffect(() => {
    // Carga manual de datos
    const datosFalsos: offer[] = [
      {
        id: 1,
        creator_id: 101,
        title: "Desarrollador Frontend",
        date: "2025-05-30T10:00:00Z",
        description: "Buscamos un frontend con experiencia en React.",
        status: 1,
      },
      {
        id: 2,
        creator_id: 101,
        title: "Desarrollador Frontend",
        date: "2025-05-30T10:00:00Z",
        description: "Buscamos un frontend con experiencia en React.",
        status: 1,
      },
      {
        id: 3,
        creator_id: 101,
        title: "Desarrollador Frontend",
        date: "2025-05-30T10:00:00Z",
        description: "Buscamos un frontend con experiencia en React.",
        status: 1,
      },
      {
        id: 4,
        creator_id: 101,
        title: "Desarrollador Frontend",
        date: "2025-05-30T10:00:00Z",
        description: "Buscamos un frontend con experiencia en React.",
        status: 1,
      },
      {
        id: 5,
        creator_id: 101,
        title: "Desarrollador Frontend",
        date: "2025-05-30T10:00:00Z",
        description: "Buscamos un frontend con experiencia en React.",
        status: 1,
      },
      {
        id: 20,
        creator_id: 102,
        title: "Diseñador UX/UI",
        date: "2025-05-25T14:00:00Z",
        description: "Se necesita diseñador para app móvil.",
        status: 0,
      },
    ];

    setOffers(datosFalsos); // 👈 Carga manual
  }, []);

  return (
    <>
    
    <div className="Contenedor">
      {offers
        .filter((offer) => offer.status === 1)
        .map((offer) => (
          <div key={offer.id} className="offers">
            <button className="offer-button">
              <h3>{offer.title}</h3>
              <i className="arrow fa-solid fa-chevron-down"></i>
            </button>
            <div className="Applicants">
              <UserCard name="Miguel Angelo Rapaz Bormirio Multicuenta 2"
                profileImage="ruta/a/la/imagen.jpg"
                onViewProfile={() => alert('Ver Perfil')}
                onAccept={() => alert('Aceptar')}
                onContact={() => alert('Contactar')}
                onReject={() => alert('Rechazar')}
              />
              <UserCard name="Miguel Angelo Rapaz Bormirio Multicuenta 2"
                profileImage="ruta/a/la/imagen.jpg"
                onViewProfile={() => alert('Ver Perfil')}
                onAccept={() => alert('Aceptar')}
                onContact={() => alert('Contactar')}
                onReject={() => alert('Rechazar')}
              />
              <UserCard name="Miguel Angelo Rapaz Bormirio Multicuenta 2"
                profileImage="ruta/a/la/imagen.jpg"
                onViewProfile={() => alert('Ver Perfil')}
                onAccept={() => alert('Aceptar')}
                onContact={() => alert('Contactar')}
                onReject={() => alert('Rechazar')}
              />
  
            </div>
          </div>

        ))}
    </div>
    </> 
  );
};

export default SeeApplicants;
